import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../../context/UserContext";
import jwt from "jsonwebtoken";
import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";
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
  return {
    props: { config: configData },
  };
};

export default function Page(props: { config: Record<string, string> }) {
  const { data, setData } = useUserContext();

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isRest, setIsRest] = useState(true);
  const [isNewExercise, setIsNewExercise] = useState(true);
  const [timer, setTimer] = useState(0);
  const [timerExercise, setTimerExercise] = useState(0);

  //let timerId: NodeJS.Timeout;
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!data.workoutData) return null;

  const handlePlayPause = () => {
    const video = videoRef.current as HTMLVideoElement;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextExercise = () => {
    if (
      data.workoutData &&
      index < data.workoutData.currentWorkout.exercises.length - 1
    ) {
      setIndex(index + 1);
      setIsNewExercise(true);
      setTimerExercise(0);
      setIsRest(true);
      const video = videoRef.current as HTMLVideoElement;
      video.load();
      isPlaying ? video.play() : video.pause();
    }
  };

  const prevExercise = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsNewExercise(true);
      setTimerExercise(0);
      setIsRest(true);
      const video = videoRef.current as HTMLVideoElement;
      video.load();
      isPlaying ? video.play() : video.pause();
    }
  };

  useEffect(() => {
    if (timerExercise === 0) {
      if (isNewExercise) {
        setIsNewExercise(false);
      } else {
        if (!isRest) nextExercise();
        setIsRest(!isRest);
      }
    }
  }, [timerExercise]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (isPlaying && data.workoutData) {
      timerId = setTimeout(() => {
        if (data.workoutData) {
          setTimer(timer + 1);
          setTimerExercise(
            (timerExercise + 1) %
              (isRest ? data.workoutData.restTime : data.workoutData.workTime)
          );
        }
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  });

  return (
    <>
      <Head
        title={`${data.workoutData.currentWorkout.name}`}
        description={`${data.workoutData.currentWorkout.name} - ${data.workoutData.currentWorkout.description}`}
      />
      <Header />
      <div className="w-full pt-4 pb-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <GoBack />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              {data.workoutData.currentWorkout.name}
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="w-full flex flex-row items-center justify-center">
            <div className="uppercase pr-1">
              {data.workoutData.currentWorkout.exercises[index].name}
            </div>
            <Link
              href={`/exercises/${data.workoutData.currentWorkout.exercises[index].id}`}
            >
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
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
              </svg>
            </Link>
          </div>
          <div className="w-full flex flex-row items-start justify-start pt-4">
            <div className="w-1/2 flex flex-col items-center justify-center">
              <div className="text-lg font-serif">
                {index + 1} of{" "}
                {data.workoutData.currentWorkout.exercises.length}
              </div>
              <div className="font-light">Exercices</div>
            </div>
            <div className="w-1/2 flex flex-col items-center justify-center">
              <div className="text-lg font-serif">
                {new Date(timer * 1000).toISOString().substring(14, 19)}
              </div>
              <div className="font-light">Overall time</div>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-start bg-white pt-6 my-2 rounded-sm dark:opacity-95">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              style={{ width: "640px", height: "480px" }}
              className={`${
                !isPlaying || isRest ? "opacity-50" : "dark:opacity-95"
              }`}
            >
              <source
                src={`${props.config.bucket_url}${data.workoutData.currentWorkout.exercises[index].id}.mp4`}
              />
            </video>
            <div className="relative h-0 -top-[240px] text-center text-black font-serif uppercase">
              {isPlaying ? (!isRest ? null : "Get Ready") : "Paused"}
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-center pt-4">
            <div className="w-1/3 flex flex-col items-start justify-end">
              {index > 0 ? (
                <button
                  onClick={prevExercise}
                  className="flex flex-row items-center justify-center"
                >
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
                      d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                    />
                  </svg>
                  <Image
                    src={`${props.config.bucket_url}${
                      data.workoutData.currentWorkout.exercises[index - 1].id
                    }.jpg`}
                    alt={data.workoutData.currentWorkout.exercises[index].name}
                    width={300}
                    height={300}
                    className="rounded-sm w-[100px] h-[100px] dark:opacity-95 ml-2"
                    priority
                  />
                </button>
              ) : null}
            </div>
            <div className="w-1/3 flex flex-col items-center justify-end">
              <button
                onClick={handlePlayPause}
                className="flex flex-col items-center justify-center"
              >
                <div className="text-lg font-serif text-center">
                  {new Date(timerExercise * 1000)
                    .toISOString()
                    .substring(17, 19)}
                </div>
                <div className="font-light">Seconds</div>
                <div className="h-10 pt-1">
                  {isPlaying ? (
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
                        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                      />
                    </svg>
                  ) : (
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
                        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>
            <div className="w-1/3 flex flex-col items-end justify-end">
              {index < data.workoutData.currentWorkout.exercises.length - 1 ? (
                <button
                  onClick={nextExercise}
                  className="flex flex-row items-center justify-center"
                >
                  <Image
                    src={`${props.config.bucket_url}${
                      data.workoutData.currentWorkout.exercises[index + 1].id
                    }.jpg`}
                    alt={data.workoutData.currentWorkout.exercises[index].name}
                    width={300}
                    height={300}
                    className="rounded-sm w-[100px] h-[100px] dark:opacity-95 mr-2"
                    priority
                  />
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
                      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
