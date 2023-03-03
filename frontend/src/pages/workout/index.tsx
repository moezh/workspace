import { GetServerSideProps } from "next";
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
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

  const workoutData = {
    level: data.workoutData?.level || "beginner",
    dayPerWeeks: data.workoutData?.dayPerWeeks || 5,
    workTime: data.workoutData?.workTime || 30,
    restTime: data.workoutData?.restTime || 10,
    currentProgram: data.workoutData?.currentProgram || {
      id: props.data[0].id,
      goal: props.data[0].goal,
      name: props.data[0].name,
      description: props.data[0].description,
      total_weeks: Number(props.data[0].total_weeks),
      workouts:
        props.data[0][`days_per_week_${data.workoutData?.dayPerWeeks || 5}`],
      currentDay: data.workoutData?.currentProgram?.currentDay || 1,
    },
    currentWorkout: undefined,
    log: data.workoutData?.log || [],
  };

  const resetProgress = () => {
    if (confirm("This will reset your progress for your personal program!")) {
      if (data.workoutData?.currentProgram) {
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

  useEffect(() => {
    setData({ ...data, workoutData: workoutData });
  }, []);

  if (!data.workoutData?.currentProgram) return null;

  const sevenDaysAgo = (Date.now() - 1000 * 60 * 60 * 24 * 7).toString();
  const last7DaysActivity = data.workoutData.log.filter(
    (workout) => workout.timestamp > sevenDaysAgo
  );
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
          <div className="w-1/4">
            <Menu menu={JSON.parse(props.config.workout_menu)} url="/" />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Dashboard
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-start pt-8">
          <div className="w-full flex flex-row flex-wrap items-start justify-start">
            <div className="w-1/2 lg:w-1/4 pb-4">
              <div className="uppercase font-serif">
                {data.workoutData?.currentProgram?.goal}
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
            <div className="font-light pt-1">
              A personalized program based on your fitness profile.
            </div>
            <div className="mb-4 pr-4 h-[300px] w-full pt-4 rounded-sm">
              <Link href={`/programs/${data.workoutData?.currentProgram?.id}`}>
                <Image
                  src={`${props.config.bucket_url}${data.workoutData?.currentProgram?.id}.jpg`}
                  alt={data.workoutData?.currentProgram?.name}
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
                        {Math.floor(
                          ((data.workoutData?.currentProgram?.currentDay - 1) /
                            (data.workoutData?.currentProgram?.total_weeks *
                              data.workoutData?.dayPerWeeks)) *
                            100
                        )}
                        %
                      </div>
                      <button onClick={resetProgress}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="w-1/2 flex flex-col items-end justify-center pt-8">
                    <div className="flex flex-col items-center justify-center w-[125px] bg-black bg-opacity-50 text-white rounded-l-sm py-1 px-2">
                      Day {data.workoutData?.currentProgram?.currentDay}
                    </div>
                  </div>
                </div>
                <div className="relative w-full h-[80px] -top-[380px] flex flex-row items-start justify-start px-4">
                  <div className="flex flex-col items-start justify-start text-white w-1/2">
                    <div className="font-light">
                      {data.workoutData?.currentProgram?.total_weeks}-Week
                    </div>
                    <div className="font-light pt-1">
                      {data.workoutData?.dayPerWeeks} Days/Week
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
            <div className="uppercase font-serif">Your fitness activity</div>
            <div className="font-light pt-1">
              A quick snapshot of your last 7 days.
            </div>
            <div className="flex flex-row items-start justify-start pt-4">
              <div className="w-1/2 flex flex-col items-start justify-start">
                <div>{last7daysWorkouts}</div>
                <div className="font-light pt-1">Workouts</div>
              </div>
              <div className="w-1/2 flex flex-col items-start justify-start">
                <div>{Math.floor(last7daysTimer / 60)}</div>
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
