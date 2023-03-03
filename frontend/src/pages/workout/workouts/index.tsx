import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import { useUserContext } from "../../../context/UserContext";
import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";
import Image from "next/image";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async () => {
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
  if (workoutData.code === 404) return { notFound: true };
  return { props: { config: configData, data: workoutData } };
};

export default function Page(props: {
  config: Record<string, string>;
  data: Record<string, string>[];
}) {
  const { data, setData } = useUserContext();

  return (
    <>
      <Head title="Workouts" description={props.config.workouts_summary} />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Workouts
            </h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <p className="w-full pt-8">{props.config.workouts_summary}</p>
        <div className="flex flex-wrap flex-row items-start justify-start pt-6">
          {props.data.map((workout: Record<string, string>, index: number) => (
            <Link
              key={`${index}-${workout.id}`}
              href={`/workouts/${workout.id}`}
              className="mb-4 pr-4 h-[300px] w-full sm:w-1/2"
            >
              <Image
                src={`${props.config.bucket_url}${workout.id}.jpg`}
                alt={workout.name}
                width={400}
                height={300}
                className="rounded-sm h-[300px] w-full"
                style={{ objectFit: "cover", objectPosition: "50% 35%" }}
                quality={100}
                priority
              />
              <div className="relative w-full -top-[300px] h-[300px] bg-black bg-opacity-30 text-white rounded-sm p-4">
                <div className="flex flex-col items-start justify-start">
                  <p className="font-light">{workout.type}</p>
                  <p className="uppercase font-serif">{workout.name}</p>
                </div>
              </div>

              <div className="relative w-full -top-[380px] h-[80px] text-white p-4">
                <div className="h-[80px] flex flex-col items-end justify-start">
                  <p className="capitalize">
                    {data.workoutData?.level || props.config.default_level}
                  </p>
                  <p className="font-light pt-1">Fitness Level</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
