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
import Image from "next/image";

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
  return { props: { config: configData } };
};

export default function Page(props: { config: Record<string, string> }) {
  const { data, setData } = useUserContext();

  const workoutData = data.workoutData || JSON.parse(props.config.default_data);

  useEffect(() => {
    setData({ ...data, workoutData: workoutData });
  }, []);

  const sevenDaysAgo = (Date.now() - 1000 * 60 * 60 * 24 * 7).toString();
  const last7DaysActivity =
    data.workoutData?.log.filter(
      (workout) => workout.timestamp > sevenDaysAgo
    ) || [];
  const last7daysWorkouts = last7DaysActivity.length;
  const last7daysTimer = last7DaysActivity.reduce(
    (acc, current) => acc + current.timer,
    0
  );

  return (
    <>
      <Head
        title={`${props.config.workout_title}`}
        description={props.config.workout_summary}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <Menu menu={JSON.parse(props.config.workout_menu)} url="/" />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Dashboard
            </h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="w-full flex flex-col items-start justify-start pt-8">
          <div className="w-full uppercase font-serif">
            Your fitness profile
          </div>
          <div className="w-full pt-1">
            Every workout is adapted to your fitness profile.
          </div>
          <div className="w-full flex flex-row flex-wrap items-start justify-start pt-4">
            <div className="w-1/2 lg:w-1/4 pb-4">
              <div className="uppercase">
                {data.workoutData?.currentProgram?.goal}
              </div>
              <div className="capitalize font-light pt-1">Fitness goal</div>
            </div>
            <div className="w-1/2 lg:w-1/4 pb-4 pl-1">
              <div className="uppercase">{data.workoutData?.level}</div>
              <div className="capitalize font-light pt-1">Fitness level</div>
            </div>
            <div className="w-1/2 lg:w-1/4 pb-4">
              <div className="uppercase">
                {data.workoutData?.daysPerWeek} days/week
              </div>
              <div className="capitalize font-light pt-1">
                Fitness frequency
              </div>
            </div>
            <div className="w-1/2 lg:w-1/4 pb-4 pl-1 text-gray-500">
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
            <div className="w-full uppercase font-serif">
              Your personal program
            </div>
            <div className="w-full pt-1">
              A personalized program based on your fitness profile.
            </div>
            <div className="mb-4 h-[300px] w-full pt-4 rounded-sm">
              <Link href={"/programs/personalProgram"}>
                <Image
                  src={`${props.config.bucket_url}${data.workoutData?.currentProgram?.id}.jpg`}
                  alt={
                    data.workoutData?.currentProgram?.name || "Current Program"
                  }
                  width={400}
                  height={300}
                  className="rounded-sm h-[300px] w-full"
                  style={{ objectFit: "cover", objectPosition: "50% 35%" }}
                  quality={100}
                  priority
                />
                <div className="relative flex flex-row items-start justify-start w-full -top-[300px] h-[300px] bg-black bg-opacity-30 text-white rounded-sm pl-4 pt-4">
                  <div className="w-1/2 flex flex-col items-start justify-start">
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
                              ((data.workoutData?.currentProgram?.currentDay -
                                1) /
                                (data.workoutData?.currentProgram?.total_weeks *
                                  data.workoutData?.daysPerWeek)) *
                                100
                            )
                          : 0}
                        %
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-end justify-center pt-8">
                    <div className="flex flex-col items-center justify-center w-[100px] bg-black bg-opacity-50 text-white rounded-l-sm py-1 px-2">
                      Day {data.workoutData?.currentProgram?.currentDay}
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-[80px] -top-[380px] flex flex-row items-start justify-start px-4">
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
              </Link>
            </div>
          </div>
          <div className="w-full pt-12">
            <div className="w-full uppercase font-serif">
              Your fitness activity
            </div>
            <div className="w-full pt-1">
              A quick snapshot of your last 7 days.
            </div>
            <div className="flex flex-row items-start justify-start pt-4">
              <div className="w-1/2 flex flex-col items-start justify-start">
                <div className="uppercase">{last7daysWorkouts}</div>
                <div className="font-light pt-1">Workouts</div>
              </div>
              <div className="w-1/2 flex flex-col items-start justify-start">
                <div className="uppercase">
                  {Math.floor(last7daysTimer / 60)}
                </div>
                <div className="font-light pt-1">Minutes</div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start pt-6 overflow-x-auto">
              {last7DaysActivity.map((workout, index) => (
                <div key={index} className="h-[120px] mr-4 mb-4">
                  <Image
                    src={`${props.config.bucket_url}${workout.workoutId}.jpg`}
                    alt={workout.workoutName}
                    width={160}
                    height={120}
                    className="rounded-sm"
                    quality={100}
                    priority
                  />
                  <div className="relative flex flex-col items-start justify-start -top-[120px] h-[120px] w-[160px] bg-black bg-opacity-30 text-white rounded-sm p-2">
                    <div className="font-light text-sm">
                      {new Date(Number(workout.timestamp))
                        .toISOString()
                        .substring(0, 16)
                        .replace("T", " ")}
                    </div>
                  </div>
                  <div className="relative flex flex-col items-start justify-end -top-[240px] h-[120px] w-[160px] text-white rounded-sm p-2">
                    <div className="font-light">{workout.workoutName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pt-8">
        <GooglePlay url="./android" />
      </div>
      <Footer />
    </>
  );
}
