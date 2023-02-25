import {GetServerSideProps} from "next";
import {readFileSync} from "fs";
import jwt from "jsonwebtoken";
import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";
import Image from "next/image";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const {id} = context.query;
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const config = await fetch("http://backend:3001/api/workout/", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const configData = await config.json();
  const workout = await fetch(`http://backend:3001/api/workout/workouts/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const workoutData = await workout.json();
  if (workoutData.code === 404) return {notFound: true};
  return {props: {config: configData, data: workoutData}};
};

export default function Page(props: {config: Record<string, string>, data: Record<string, string>;}) {
  return (
    <>
      <Head
        title={`${props.data.name}`}
        description={`${props.data.name} - ${props.data.description}`}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <GoBack />
          </div>
          <div className="w-2/4">
            <h1 className="w-full font-medium text-xl uppercase font-serif text-center">
              {props.data.name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-8">
          <Image
            src={`${props.config.bucket_url}${props.data.id}.jpg`}
            alt={props.data.name}
            width={1000}
            height={750}
            className="rounded-sm h-[300px] w-full"
            style={{objectFit: "cover", objectPosition: "50% 35%"}}
            quality={100}
            priority
          />
          <div className="relative w-full -top-[300px] h-[300px] bg-black bg-opacity-40 text-white rounded-sm p-4">
            <div className="flex flex-col items-start justify-start">
              <p className="font-light">{props.data.type}</p>
              <p className="font-medium">{props.data.name}</p>
              <p className="font-light pt-2">{props.data.description}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>);
}
