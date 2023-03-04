import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Image from "next/image";
import { useUserContext } from "../../../context/UserContext";
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

  return (
    <>
      <Head
        title="Workout Completed!"
        description="Congratulations! Your workout is completed. "
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-col items-center justify-start">
          <h1 className="w-full text-xl uppercase font-serif text-center">
            Workout completed!
          </h1>
          <p className="pt-2">Great job, keep going!</p>
        </div>
        <div className="flex flex-col items-start justify-start pt-6">
          <div className="w-full h-[325px]">
            <Image
              src={`${props.config.bucket_url}CompletedWorkout.jpg`}
              alt="Workout Completed!"
              width={1000}
              height={750}
              className="rounded-sm h-[325px] w-full"
              style={{ objectFit: "cover", objectPosition: "50% 0%" }}
              quality={100}
              priority
            />
            <div className="relative w-full -top-[325px] h-[325px] bg-black bg-opacity-40 text-white dark:text-neutral-100 rounded-sm p-4">
              <div className="flex flex-col items-start justify-start">
                <p className="font-light pt-2">
                  {data.workoutData?.log[0]
                    ? new Date(Number(data.workoutData?.log[0]?.timestamp))
                        .toISOString()
                        .substring(0, 16)
                        .replace("T", " ")
                    : null}
                </p>
                <p className="uppercase font-serif pt-1">
                  {data.workoutData?.log[0]?.workoutName}
                </p>
                {data.workoutData?.log[0]?.programId ? (
                  <p className="font-light pt-1">{`${data.workoutData?.log[0]?.programName} - Day ${data.workoutData?.log[0]?.programDay}`}</p>
                ) : null}
                <p className="font-light pt-4">
                  Congratulations! Your workout is completed.
                </p>
                <div className="w-full flex flex-col items-center justify-center pt-1"></div>
              </div>
            </div>
            <div className="relative w-full -top-[450px] h-[125px] text-white p-4">
              <div className="w-full flex flex-row">
                <div className="w-1/3 flex-col items-center justify-center">
                  <div className="capitalize font-serif">
                    {data.workoutData?.log[0]
                      ? new Date(data.workoutData?.log[0]?.timer * 1000)
                          .toISOString()
                          .substring(14, 19)
                      : null}
                  </div>
                  <div className="font-light pb-1">Time</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="w-1/3 flex-col items-center justify-center">
                  <div className="capitalize font-serif">
                    {data.workoutData?.log[0]
                      ? data.workoutData?.log[0]?.exercises
                      : null}
                  </div>
                  <div className="font-light pb-1">Exercises</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
                    />
                  </svg>
                </div>
                <div className="w-1/3 flex-col items-center justify-center">
                  <div className="capitalize font-serif">
                    {data.workoutData?.log[0]?.level}
                  </div>
                  <div className="font-light pb-1">Level</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center bg-white dark:bg-black z-10">
          <div className="w-full bg-black dark:bg-neutral-100 rounded-sm my-2">
            <Link href={`/`}>
              <p className="capitalize text-white dark:text-black px-8 py-2 text-center">
                Close →
              </p>
            </Link>
          </div>
        </div>
        <div className="pt-4">
          <div>A Little Reminder:</div>
          <div className="font-light">
            If you're looking to maximize the results of your workout, good
            nutrition, adequate rest and proper sleep, is the best way to go.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
