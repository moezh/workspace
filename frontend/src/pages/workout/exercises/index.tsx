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
  const exercise = await fetch(`http://backend:3001/api/workout/exercises/`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const exerciseData = await exercise.json();
  if (exerciseData.code === 404) return {notFound: true};
  return {props: {config: configData, data: exerciseData}};
};

export default function Page(props: {config: Record<string, string>, data: Record<string, string>[];}) {
  return (
    <>
      <Head
        title={"Exercices"}
        description={props.config.exercises_summary}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <GoBack />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Exercices
            </h1>
          </div>
        </div>
        <p className="w-full pt-8">
          {props.config.exercises_summary}
        </p>
        <div className="w-full flex flex-wrap flex-row items-start justify-start pt-8">
          {props.data.filter((exercice) => exercice.id.slice(-5) !== "Right").map((exercice: Record<string, string>, index: number) => (
            <div key={`${index}-${exercice.id}`} className="mb-4 pr-4 w-1/2 sm:w-1/3 md:w-1/4">
              <Link href={`/exercises/${exercice.id}`}>
                <Image
                  src={`${props.config.bucket_url}${exercice.id}.jpg`}
                  alt={exercice.name}
                  width={300}
                  height={300}
                  className="rounded-sm w-full h-auto"
                  priority
                />
                <p className="w-full text-center pt-2">
                  {exercice.name}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div >
      <Footer />
    </>);
}
