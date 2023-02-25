import {GetServerSideProps} from "next";
import {readFileSync} from "fs";
import jwt from "jsonwebtoken";
import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";
import Image from "next/image";
import Link from "next/link";

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
  const workout = await fetch(`http://backend:3001/api/workout/workouts/`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const workoutData = await workout.json();
  if (workoutData.code === 404) return {notFound: true};
  return {props: {config: configData, data: workoutData}};
};

export default function Page(props: {config: Record<string, string>, data: Record<string, string>[];}) {
  return (
    <>
      <Head
        title="Workouts"
        description={props.config.workouts_summary}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <GoBack />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Workouts
            </h1>
          </div>
        </div>
        <p className="w-full pt-8">
          {props.config.workouts_summary}
        </p>
        <div className="flex flex-wrap flex-row items-start justify-start pt-8">
          {props.data.map((workout: Record<string, string>, index: number) => (
            <div key={`${index}-${workout.id}`} className="mb-4 pr-4 w-full h-[300px] md:w-1/2">
              <Link href={`/workouts/${workout.id}`}>
                <Image
                  src={`${props.config.bucket_url}${workout.id}.jpg`}
                  alt={workout.name}
                  width={400}
                  height={300}
                  className="rounded-sm h-[300px] w-full"
                  style={{objectFit: "cover", objectPosition: "50% 35%"}}
                  priority
                />
                <div className="relative w-full -top-[300px] h-[300px] bg-black bg-opacity-40 text-white rounded-sm p-4">
                  <div className="flex flex-col items-start justify-start">
                    <p className="font-light">{workout.type}</p>
                    <p className="uppercase font-serif">{workout.name}</p>
                  </div>
                </div>
              </Link>
            </div >
          ))
          }
        </div >
      </div>
      <Footer />
    </>);
}
