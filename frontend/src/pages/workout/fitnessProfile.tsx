import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoBack from "../../components/GoBack";
import { useUserContext } from "../../context/UserContext";

export const getStaticProps: GetStaticProps = async () => {
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const program = await fetch(`http://backend:3001/api/workout/programs/`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const programData = await program.json();
  if (programData.code === 404) return { notFound: true };
  return { props: { data: programData } };
};

export default function Page(props: { data: Record<string, string>[] }) {
  const { data, setData } = useUserContext();

  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [daysPerWeek, setdaysPerWeek] = useState(0);

  const changeLevel = (val: string) => {
    if (val !== level) {
      setLevel(val);
    }
  };

  const changeDaysPerWeek = (val: number) => {
    if (val !== daysPerWeek) {
      setdaysPerWeek(val);
    }
  };

  const changeGoal = (val: string) => {
    if (val !== goal) {
      setGoal(val);
    }
  };

  const saveChange = () => {
    const newProgram = props.data.filter((program) => program.goal === goal)[0];
    if (newProgram && data.workoutData) {
      const workoutData = {
        ...data.workoutData,
        level: level,
        daysPerWeek: daysPerWeek,
        currentProgram: {
          id: newProgram.id,
          goal: newProgram.goal,
          name: newProgram.name,
          description: newProgram.description,
          total_weeks: Number(newProgram.total_weeks),
          workouts: newProgram[`days_per_week_${daysPerWeek}`],
          currentDay: data.workoutData?.currentProgram?.currentDay || 1,
        },
      };
      setData({ ...data, workoutData: workoutData });
    }
  };

  useEffect(() => {
    if (
      level !== data.workoutData?.level ||
      daysPerWeek !== data.workoutData?.daysPerWeek ||
      goal !== data.workoutData?.currentProgram?.goal
    )
      saveChange();
  }, [level, goal, daysPerWeek]);

  useEffect(() => {
    if (data.workoutData?.currentProgram) {
      setLevel(data.workoutData?.level);
      setdaysPerWeek(data.workoutData?.daysPerWeek);
      setGoal(data.workoutData?.currentProgram?.goal);
    }
  }, [data]);

  return (
    <>
      <Head
        title="Fitness Profile"
        description="Answer a few simple questions about your workout goal, intensity and frequency preferences, and we'll create a fitness experience tailored just for you. Editing your fitness profile will reset your progress for your current personal program and generate a new one based on the new data."
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Fitness profile
            </h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="w-full flex flex-col items-start justify-start pt-8">
          <div className="w-full">
            Answer a few simple questions about your workout goal, intensity and
            frequency preferences, and we'll create a personal program and
            workouts tailored just for you.
          </div>
          <div className="w-full pt-6 font-serif">
            How would you describe your prior experience level with exercise?
          </div>
          <div className="w-full flex flex-row flex-wrap items-start justify-start text-center pt-4">
            <div className="w-1/2 sm:w-1/3 flex flex-col pb-4 pr-2">
              <button
                onClick={() => changeLevel("beginner")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light py-2 ${
                    level === "beginner"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  }`}
                >
                  Beginner
                </div>
              </button>
            </div>
            <div
              onClick={() => changeLevel("intermediate")}
              className="w-1/2 sm:w-1/3 flex flex-col pb-4 pr-2"
            >
              <button className="capitalize rounded-sm border border-black dark:border-white">
                <div
                  className={`capitalize font-light py-2 ${
                    level === "intermediate"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  }`}
                >
                  Intermediate
                </div>
              </button>
            </div>
            <div className="w-1/2 sm:w-1/3 flex flex-col pb-4 pr-2">
              <button
                onClick={() => changeLevel("advanced")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light py-2 ${
                    level === "advanced"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  }`}
                >
                  Advanced
                </div>
              </button>
            </div>
          </div>
          <div className="w-full pt-4">What is your primary workout goal?</div>
          <div className="w-full flex flex-row flex-wrap items-start justify-start pt-4">
            <div className="w-1/2 sm:w-1/3  flex flex-col pb-4 pr-2">
              <button
                onClick={() => changeGoal("General Fitness")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light py-2 ${
                    goal === "General Fitness"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  }`}
                >
                  General Fitness
                </div>
              </button>
            </div>
            <div className="w-1/2 sm:w-1/3  flex flex-col pb-4 pr-2">
              <button
                onClick={() => changeGoal("Build Muscle")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light py-2 ${
                    goal === "Build Muscle"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  }`}
                >
                  Build Muscle
                </div>
              </button>
            </div>
            <div className="w-1/2 sm:w-1/3 flex flex-col pb-4 pr-2">
              <button
                onClick={() => changeGoal("Fat Loss")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light py-2 ${
                    goal === "Fat Loss"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  }`}
                >
                  Fat Loss
                </div>
              </button>
            </div>
          </div>
          <div className="w-full pt-4">
            How many days per week would you like to workout?
          </div>
          <div className="w-full flex flex-row flex-wrap items-start justify-start pt-4">
            {[2, 3, 4, 5, 6, 7].map((val) => (
              <div key={val} className="w-1/3 flex flex-col pb-4 pr-2">
                <button
                  onClick={() => changeDaysPerWeek(val)}
                  className="capitalize rounded-sm border border-black dark:border-white"
                >
                  <div
                    className={`capitalize font-light py-2 ${
                      daysPerWeek === val
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : ""
                    }`}
                  >
                    {val}
                  </div>
                </button>
              </div>
            ))}
          </div>
          <div className="font-light">
            We recommend a minimum of two times per week.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
