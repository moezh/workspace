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
  const level = "beginner";
  const workTime = 30;
  const restTime = 15;
  const exercises = JSON.parse(props.data.exercises);
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
            <h1 className="w-full text-xl uppercase font-serif text-center">
              {props.data.name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-8">
          <div className="w-full h-[300px]">
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
                <p className="font-light pt-2">{props.data.type}</p>
                <p className="uppercase font-serif pt-1">{props.data.name}</p>
                <p className="font-light pt-2">{props.data.description}</p>
              </div>
            </div>
            <div className="relative w-full -top-[400px] h-[100px] text-white p-4">
              <div className="w-full flex flex-row">
                <div className="w-1/3 flex flex-col items-start justify-center">
                  <p className="capitalize font-serif">{exercises.length}</p>
                  <p className="font-light">Exercises</p>
                </div>
                <div className="w-1/3 flex flex-col items-start justify-center">
                  <p className="capitalize font-serif">{Math.floor(exercises.length * (workTime + restTime) / 60)}</p>
                  <p className="font-light">Minutes</p>
                </div>
                <div className="w-1/3 flex flex-col items-start justify-center">
                  <p className="capitalize font-serif">{level}</p>
                  <p className="font-light">Level</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8">
          {exercises.map((exercise: Record<string, string>) => (
            <div className="flex flex-row items-center justify-start mb-4">
              <div className="w-full max-w-[175px] mr-2">
                <Link href={`/exercises/${exercise.id}`}>
                  <Image
                    src={`${props.config.bucket_url}${exercise.id}.jpg`}
                    alt={exercise.name}
                    width={300}
                    height={300}
                    className="rounded-sm"
                    quality={100}
                    priority
                  />
                </Link>
              </div>
              <div className="w-full ml-8 text-left">
                <Link href={`/exercises/${exercise.id}`}>
                  <p className="uppercase">{exercise.name}</p>
                </Link>
                <p className="font-light">{workTime} seconds</p>
              </div>
              <div className="w-full max-w-[25px] ml-2 text-right">
                <Link href={`/exercises/${exercise.id}`}>
                  →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 flex flex-col items-center justify-center py-2 bg-white dark:bg-black">
          <div className="w-full bg-black dark:bg-white rounded-sm">
            <Link
              href={`/workouts/start`}
            >
              <p className="capitalize text-white dark:text-black px-8 py-2 text-center">Start workout →</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>);
}
