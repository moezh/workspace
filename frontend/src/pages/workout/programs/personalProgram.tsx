import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import { useUserContext } from "../../../context/UserContext";
import { useState } from "react";
import jwt from "jsonwebtoken";
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
  const program = await fetch(`http://backend:3001/api/workout/programs/`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const programData = await program.json();
  if (programData.code === 404) return { notFound: true };
  return { props: { config: configData, data: programData } };
};

export default function Page(props: {
  config: Record<string, string>;
  data: Record<string, string>[];
}) {
  const { data, setData } = useUserContext();
  const [currentDay, setCurrentDay] = useState(
    data.workoutData?.currentProgram?.currentDay || 1
  );

  const resetProgress = () => {
    if (confirm("This will reset your progress for your personal program!")) {
      if (data.workoutData?.currentProgram) {
        setCurrentDay(1);
        setData({
          ...data,
          workoutData: {
            ...data.workoutData,
            currentProgram: {
              ...data.workoutData.currentProgram,
              currentDay: 1,
            },
          },
        });
      }
    }
  };

  return (
    <>
      <Head
        title={`${data.workoutData?.currentProgram?.name} - Day ${currentDay}`}
        description={data.workoutData?.currentProgram?.description}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              {`${data.workoutData?.currentProgram?.name}`}
            </h1>
            <p className="w-full pt-1 text-center">Day {currentDay}</p>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="pt-8">
          <div className="h-[350px] w-full rounded-sm">
            {data.workoutData?.currentProgram?.id ? (
              <Image
                src={`${props.config.bucket_url}${data.workoutData?.currentProgram?.id}.jpg`}
                alt={
                  data.workoutData?.currentProgram?.name || "Personal program"
                }
                width={400}
                height={300}
                className="rounded-sm h-[350px] w-full"
                style={{ objectFit: "cover", objectPosition: "50% 35%" }}
                quality={100}
                priority
              />
            ) : (
              <div className="h-[350px] w-full"></div>
            )}
            <div className="relative flex flex-row items-start justify-start w-full -top-[350px] h-[350px] bg-black bg-opacity-30 text-white rounded-sm pl-4 pt-4">
              <div className="w-full flex flex-col items-start justify-start">
                <p className="font-light">
                  {data.workoutData?.currentProgram?.goal}
                </p>
                <p className="uppercase font-serif pt-1">
                  {data.workoutData?.currentProgram?.name}
                </p>
                <div className="flex flex-row items-center justify-start pt-1">
                  <div className="font-light mr-2">
                    Progress:{" "}
                    {data.workoutData?.currentProgram
                      ? Math.floor(
                          ((currentDay - 1) /
                            (data.workoutData?.currentProgram?.total_weeks *
                              data.workoutData?.daysPerWeek)) *
                            100
                        )
                      : 0}
                    %
                  </div>
                  <button onClick={resetProgress}>
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
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                </div>
                <p className="font-light pt-2">
                  {data.workoutData?.currentProgram?.description}
                </p>
              </div>
            </div>
            <div className="relative w-full h-[80px] -top-[700px] flex flex-row items-start justify-start">
              <div className="w-full flex flex-col items-end justify-center pt-8">
                <div className="flex flex-col items-center justify-center w-[100px] bg-black bg-opacity-50 text-white rounded-l-sm py-1 px-2">
                  Day {currentDay}
                </div>
              </div>
            </div>
            <div className="relative w-full h-[80px] -top-[510px] flex flex-row items-start justify-start px-4">
              <div className="flex flex-col items-start justify-start text-white w-1/2">
                <div className="capitalize">
                  {data.workoutData?.currentProgram?.total_weeks}-Week
                </div>
                <div className="font-light pt-1">
                  {data.workoutData?.daysPerWeek} Days/Week
                </div>
              </div>
              <div className="flex flex-col items-end justify-start text-white w-1/2">
                <div className="capitalize">{data.workoutData?.level}</div>
                <div className="font-light pt-1">Fitness Level</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-black z-10">
            <div className="w-full bg-black dark:bg-neutral-100 rounded-sm my-2">
              <Link
                href={{
                  pathname: `/workouts/${
                    data.workoutData?.currentProgram?.workouts.split(",")[
                      Math.floor(
                        (currentDay - 1) % (data.workoutData?.daysPerWeek || 1)
                      )
                    ]
                  }`,
                  query: { program: "personal" },
                }}
              >
                <p className="capitalize text-white dark:text-black px-8 py-2 text-center">
                  Start Day {currentDay} ???
                </p>
              </Link>
            </div>
          </div>
          <div className="pt-8">
            <div className="font-serif uppercase">
              {data.workoutData?.currentProgram?.total_weeks}-Week schedule
            </div>
            <div className="pt-1">
              This {data.workoutData?.currentProgram?.name.toLowerCase()}{" "}
              routine is a {data.workoutData?.currentProgram?.total_weeks}-week{" "}
              {data.workoutData?.currentProgram?.goal.toLowerCase()} program
              that involves working out {data.workoutData?.daysPerWeek} times a
              week.
            </div>
            <div className="w-full flex flex-row flex-wrap items-start justify-start">
              {[
                ...Array(data.workoutData?.currentProgram?.total_weeks).keys(),
              ].map((i) => (
                <div key={`week-${i + 1}`} className="pr-4 pt-4 w-[80px]">
                  {Math.floor(
                    (currentDay - 1) / (data.workoutData?.daysPerWeek || 1)
                  ) === i ? (
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <div>{`week-${i + 1}`}</div>
                    </div>
                  ) : (
                    <div className="text-gray-300 dark:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <div className="font-light">{`week-${i + 1}`}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="pt-8">
            <div className="font-serif uppercase">
              {data.workoutData?.daysPerWeek} Days per week
            </div>
            <div className="w-full flex flex-row flex-wrap items-start justify-start">
              {[...Array(data.workoutData?.daysPerWeek).keys()].map((i) => (
                <div key={`day-${i + 1}`} className="pr-4 pt-4 w-[80px]">
                  {Math.floor(
                    (currentDay - 1) % (data.workoutData?.daysPerWeek || 1)
                  ) === i ? (
                    <div className="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <div>{`Day-${i + 1}`}</div>
                    </div>
                  ) : (
                    <div className="text-gray-300 dark:text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                      <div className="font-light">{`Day-${i + 1}`}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="pt-4">
              Try to spread out your workouts throughout the week and choose
              anyday/time that suits you best.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
