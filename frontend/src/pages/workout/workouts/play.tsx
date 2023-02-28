import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import { useState } from "react";
import { useUserContext } from "../../../context/UserContext";
import jwt from "jsonwebtoken";
import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";

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
  const [currentExercise, setCurrentExercise] = useState({ id: "", name: "" });
  if (!data.workoutData) return null;
  if (currentExercise.id === "")
    setCurrentExercise(data.workoutData.currentWorkout.exercises[0]);

  return (
    <>
      <Head
        title={`${data.workoutData.currentWorkout.name}`}
        description={`${data.workoutData.currentWorkout.name} - ${data.workoutData.currentWorkout.description}`}
      />
      <Header />
      <div className="w-full pt-4">
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
        <div className="flex flex-col items-start justify-start pt-4">
          <p className="w-full uppercase text-center">{currentExercise.name}</p>
          <div className="w-full flex flex-col items-center justify-start bg-white pt-6 my-2 rounded-sm dark:opacity-95">
            <video
              autoPlay
              loop
              muted
              style={{ width: "640px", height: "480px" }}
            >
              <source
                src={`${props.config.bucket_url}${currentExercise.id}.mp4`}
              />
            </video>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
