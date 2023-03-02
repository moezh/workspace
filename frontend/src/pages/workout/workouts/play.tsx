import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import { useState, useEffect, useRef } from "react";
import { useUserContext } from "../../../context/UserContext";
import jwt from "jsonwebtoken";
import Head from "../../../components/Head";
import Image from "next/image";
import { useRouter } from "next/router";
import DarkModeToggler from "../../../components/DarkModeToggler";

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
  const [timer, setTimer] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [side, setSide] = useState("Left");
  const [isFinished, setIsFinished] = useState(false);

  let router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    const video = videoRef.current as HTMLVideoElement;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
    speechSynthesis.cancel();
  };

  const prevExercise = () => {
    if (index > 0) {
      setIndex(index - 1);
      startRestPeriod();
      const video = videoRef.current as HTMLVideoElement;
      video.load();
      isPlaying ? video.play() : video.pause();
      speechSynthesis.cancel();
    }
  };

  const nextExercise = () => {
    if (data.workoutData?.currentWorkout) {
      if (index < data.workoutData.currentWorkout.exercises.length - 1) {
        setIndex(index + 1);
        startRestPeriod();
        const video = videoRef.current as HTMLVideoElement;
        video.load();
        isPlaying ? video.play() : video.pause();
        speechSynthesis.cancel();
      }
      if (index === data.workoutData.currentWorkout.exercises.length - 1) {
        finishWorkout();
      }
    }
  };

  const closeWorkout = () => {
    if (confirm("Your progress won't be saved!")) {
      speechSynthesis.cancel();
      if (data.workoutData?.currentWorkout) {
        setData({
          ...data,
          workoutData: { ...data.workoutData, currentWorkout: undefined },
        });
      }
      router.back();
    }
  };

  const finishWorkout = () => {
    setIsPlaying(false);
    utterance.text = "Congratulations! Your workout is completed.";
    speechSynthesis.speak(utterance);
    setIsFinished(true);
    if (data.workoutData?.currentWorkout) {
      setData({
        ...data,
        workoutData: {
          ...data.workoutData,
          currentWorkout: undefined,
          log: [
            {
              timestamp: Date.now().toString(),
              workoutId: data.workoutData.currentWorkout.id,
              workoutName: data.workoutData.currentWorkout.name,
              timer: timer,
              exercises: data.workoutData.currentWorkout.exercises.length,
              level: data.workoutData.level,
            },
            ...data.workoutData.log,
          ],
        },
      });
    }
    router.push({
      pathname: "/workouts/completed",
    });
  };

  const startRestPeriod = () => {
    if (data.workoutData) {
      setIsRest(true);
      setCountDown(data.workoutData.restTime);
      setSide("Left");
    }
  };

  const startWorkPeriod = () => {
    if (data.workoutData) {
      setIsRest(false);
      setCountDown(data.workoutData.workTime);
      setSide("Left");
    }
  };

  const changeSide = () => {
    const video = videoRef.current as HTMLVideoElement;
    setSide(side === "Left" ? "Right" : "Left");
    video.load();
    isPlaying ? video.play() : video.pause();
  };

  useEffect(() => {
    const timerId = setInterval(() => {
      if (data.workoutData?.currentWorkout && isPlaying) {
        setTimer(timer + 1);
        if (timer === 0) {
          startRestPeriod();
        } else {
          setCountDown(countDown - 1);
          if (countDown === 0) {
            if (isRest) {
              startWorkPeriod();
            } else {
              startRestPeriod();
              nextExercise();
            }
          } else {
            if (!isRest) {
              if (countDown === 1) utterance.text = "Stop!";
              if (countDown === 2) utterance.text = "1";
              if (countDown === 3) utterance.text = "2";
              if (countDown === 4) utterance.text = "3";
              if (countDown === Math.ceil(data.workoutData.workTime / 2) + 1) {
                if (
                  data.workoutData.currentWorkout.exercises[index].id.slice(
                    -4
                  ) === "Left" ||
                  data.workoutData.currentWorkout.exercises[index].id.slice(
                    -5
                  ) === "Right"
                ) {
                  if (
                    data.workoutData.currentWorkout.exercises[index].id.slice(
                      -4
                    ) === side
                  ) {
                    utterance.text = "Change side.";
                    changeSide();
                  }
                } else {
                  utterance.text = "Halfway.";
                }
              }
            }
            if (isRest) {
              if (countDown === 1) utterance.text = "Begin!";
              if (countDown === 2) utterance.text = "1";
              if (countDown === 3) utterance.text = "2";
              if (countDown === 4) utterance.text = "3";
              if (countDown === data.workoutData.restTime)
                utterance.text = `"Get ready for : ${data.workoutData.workTime} seconds of ${data.workoutData.currentWorkout.exercises[index].name}`;
            }
            speechSynthesis.speak(utterance);
          }
        }
      } else {
        clearInterval(timerId);
      }
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  });

  if (!data.workoutData?.currentWorkout || isFinished) return null;

  let utterance = new SpeechSynthesisUtterance();
  let samantha = speechSynthesis.getVoices().find((v) => v.name == "Samantha");
  if (samantha) utterance.voice = samantha;

  return (
    <>
      <Head
        title={`${data.workoutData.currentWorkout.name}`}
        description={`${data.workoutData.currentWorkout.name} - ${data.workoutData.currentWorkout.description}`}
      />
      <div className="w-full h-screen py-4 flex flex-col items-center justify-between">
        <div className="flex-shrink w-full">
          <div className="flex flex-row items-start justify-start">
            <button
              className="w-1/4 flex flex-row items-center justify-start"
              onClick={closeWorkout}
            >
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="w-2/4 flex flex-row items-center justify-center">
              <h1 className="w-full text-xl uppercase font-serif text-center">
                {data.workoutData.currentWorkout.name}
              </h1>
            </div>
            <div className="w-1/4 flex flex-row items-center justify-end">
              <DarkModeToggler />
            </div>
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <div className="uppercase">
              {data.workoutData.currentWorkout.exercises[index].name}
            </div>
          </div>
          <div className="w-full flex flex-row items-start justify-start pt-1">
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
          <div className="h-1 w-full rounded-full bg-gray-100  dark:bg-gray-800 mt-2">
            <div
              className="h-1 rounded-full bg-black dark:bg-white"
              style={{
                width: `${
                  ((index + 1) /
                    data.workoutData.currentWorkout.exercises.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center py-2">
          <div className="w-full h-full max-h-[360px] flex flex-col items-center justify-center bg-white rounded-sm dark:opacity-95">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              className={`h-full w-auto ${
                !isPlaying || isRest ? "opacity-50" : "dark:opacity-95"
              }`}
            >
              <source
                src={`${
                  props.config.bucket_url
                }${data.workoutData.currentWorkout.exercises[index].id.replace(
                  "Left",
                  side
                )}.mp4`}
              />
            </video>
            <div className="relative h-0 -top-[50%] text-center text-black font-serif uppercase">
              {isPlaying ? (!isRest ? null : "Get Ready") : "Paused"}
            </div>
          </div>
        </div>
        <div className="flex-shrink w-full">
          <div className="h-1 w-full rounded-full bg-gray-100  dark:bg-gray-800">
            <div
              className="h-1 rounded-full bg-black dark:bg-white"
              style={{
                width: `${
                  100 -
                  (countDown /
                    (isRest
                      ? Number(data.workoutData.restTime)
                      : Number(data.workoutData.workTime))) *
                    100
                }%`,
              }}
            ></div>
          </div>
          <div className="w-full flex flex-row items-center justify-center pt-2">
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                  <Image
                    src={`${props.config.bucket_url}${
                      data.workoutData.currentWorkout.exercises[index - 1].id
                    }.jpg`}
                    alt={data.workoutData.currentWorkout.exercises[index].name}
                    width={300}
                    height={300}
                    className="rounded-sm w-[100px] h-[100px] dark:opacity-95 ml-1"
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
                  {new Date(countDown * 1000).toISOString().substring(17, 19)}
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
                    className="rounded-sm w-[100px] h-[100px] dark:opacity-95 mr-1"
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
