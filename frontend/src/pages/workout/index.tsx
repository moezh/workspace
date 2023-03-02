import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import { useUserContext } from "../../context/UserContext";
import { useEffect } from "react";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GooglePlay from "../../components/GooglePlay";
import Menu from "../../components/menu";
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
  return {
    props: { config: configData },
  };
};

export default function Page(props: { config: Record<string, string> }) {
  const { data, setData } = useUserContext();

  const workoutData = {
    level: data.workoutData?.level || "beginner",
    dayPerWeeks: data.workoutData?.dayPerWeeks || 5,
    workTime: data.workoutData?.workTime || 30,
    restTime: data.workoutData?.restTime || 10,
    currentProgram: data.workoutData?.currentProgram || undefined,
    currentWorkout: undefined,
    log: data.workoutData?.log || [],
  };

  useEffect(() => {
    setData({ ...data, workoutData: workoutData });
  }, []);

  return (
    <>
      <Head
        title={`${props.config.workout_title}`}
        description={props.config.workout_summary}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <Menu menu={JSON.parse(props.config.workout_menu)} url="/" />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Dashboard | Under construction
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-start pt-8">
          <div className="w-full flex flex-row flex-wrap items-start justify-start">
            <div className="w-1/2 lg:w-1/4 pb-4">
              <div className="uppercase font-serif">
                {data.workoutData?.currentProgram?.name.replace("Program", " ")}
              </div>
              <div className="capitalize font-light pt-1">Fitness goal</div>
            </div>
            <div className="w-1/2 lg:w-1/4 pb-4">
              <div className="uppercase font-serif">
                {data.workoutData?.level}
              </div>
              <div className="capitalize font-light pt-1">Fitness level</div>
            </div>
            <div className="w-1/2 lg:w-1/4 pb-4">
              <div className="uppercase font-serif">
                {data.workoutData?.dayPerWeeks} days/week
              </div>
              <div className="capitalize font-light pt-1">
                Fitness frequency
              </div>
            </div>
            <div className="w-1/2 lg:w-1/4 pb-4 text-gray-500">
              <Link href={`/fitnessProfile`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                  />
                </svg>
                <div className="capitalize font-light pt-1">
                  Edit fitness profile
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full pt-8">
            <div className="uppercase font-serif">Your personal program</div>
            <div className="capitalize font-light pt-1">
              A personalized program based on your data.
            </div>
          </div>
          {/* 
          <div>
            <div>Your fitness activity</div>
            <div>A quick snapshotof your last 7 days</div>
            <div>xxx</div>
            <div>Workouts</div>
            <div>xxx</div>
            <div>Minutes</div>
          </div>
          */}
        </div>
      </div>
      <div className="pt-6">
        <GooglePlay url="./android" />
      </div>
      <Footer />
    </>
  );
}
