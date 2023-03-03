import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoBack from "../../components/GoBack";
import { useUserContext } from "../../context/UserContext";

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

  const [level, setLevel] = useState(data.workoutData?.level || "beginner");
  const [goal, setGoal] = useState(
    data.workoutData?.currentProgram?.goal || "General Fitness"
  );
  const [dayPerWeeks, setDayPerWeeks] = useState(
    data.workoutData?.dayPerWeeks || 5
  );

  const changeLevel = (val: string) => {
    if (val !== level) {
      setLevel(val);
    }
  };

  const changeDayPerWeeks = (val: number) => {
    if (val !== dayPerWeeks) {
      setDayPerWeeks(val);
    }
  };

  const changeGoal = (val: string) => {
    if (val !== goal) {
      setGoal(val);
    }
  };

  const saveChange = () => {
    if (data.workoutData?.currentProgram) {
      const newProgram = props.data.filter(
        (program) => program.goal === goal
      )[0];
      if (newProgram) {
        const workoutData = {
          ...data.workoutData,
          level: level,
          dayPerWeeks: dayPerWeeks,
          currentProgram: {
            id: newProgram.id,
            goal: newProgram.goal,
            name: newProgram.name,
            description: newProgram.description,
            total_weeks: Number(newProgram.total_weeks),
            workouts:
              newProgram[`days_per_week_${data.workoutData?.dayPerWeeks || 5}`],
            currentDay: 1,
          },
        };
        setData({ ...data, workoutData: workoutData });
      }
    }
  };

  useEffect(() => {
    saveChange();
  }, [level, goal, dayPerWeeks]);

  return (
    <>
      <Head
        title="Fitness Profile"
        description="Answer a few simple questions about your workout goal, intensity and frequency preferences, and we'll create a fitness experience tailored just for you. Editing your fitness profile will reset your progress for your current personal program and generate a new one based on the new data."
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <GoBack />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Fitness profile
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col items-start justify-start pt-8">
          <div className="p">
            Answer a few simple questions about your workout goal, intensity and
            frequency preferences, and we'll create a fitness experience
            tailored just for you. Editing your fitness profile will reset your
            progress for your current personal program and generate a new one
            based on the new data.
          </div>
          <div className="pt-4 font-serif">
            How would you describe your prior experience level with exercise?
          </div>
          <div className="w-full flex flex-row items-center justify-center text-center pt-4 pb-1">
            <div className="w-1/3 flex flex-col pb-4 pr-4">
              <button
                onClick={() => changeLevel("beginner")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light ${
                    level === "beginner"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  } px-4 py-1`}
                >
                  Beginner
                </div>
              </button>
            </div>
            <div
              onClick={() => changeLevel("intermediate")}
              className="w-1/3 flex flex-col pb-4 pr-4"
            >
              <button className="capitalize rounded-sm border border-black dark:border-white">
                <div
                  className={`capitalize font-light ${
                    level === "intermediate"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  } px-4 py-1`}
                >
                  Intermediate
                </div>
              </button>
            </div>
            <div className="w-1/3 flex flex-col pb-4 pr-4">
              <button
                onClick={() => changeLevel("advanced")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light ${
                    level === "advanced"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  } px-4 py-1`}
                >
                  Advanced
                </div>
              </button>
            </div>
          </div>
          <div className="pt-4">What is your primary workout goal?</div>
          <div className="w-full flex flex-row items-start justify-start pt-4 pb-1">
            <div className="w-1/3 flex flex-col pb-4 pr-4">
              <button
                onClick={() => changeGoal("Fat Loss")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light ${
                    goal === "Fat Loss"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  } px-4 py-1`}
                >
                  Fat Loss
                </div>
              </button>
            </div>
            <div className="w-1/3 flex flex-col pb-4 pr-4">
              <button
                onClick={() => changeGoal("Build Muscle")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light ${
                    goal === "Build Muscle"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  } px-4 py-1`}
                >
                  Build Muscle
                </div>
              </button>
            </div>
            <div className="w-1/3 flex flex-col pb-4 pr-4">
              <button
                onClick={() => changeGoal("General Fitness")}
                className="capitalize rounded-sm border border-black dark:border-white"
              >
                <div
                  className={`capitalize font-light ${
                    goal === "General Fitness"
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : ""
                  } px-4 py-1`}
                >
                  General Fitness
                </div>
              </button>
            </div>
          </div>
          <div className="pt-4">
            How many days per week would you like to workout?
          </div>
          <div className="w-full flex flex-row flex-wrap items-start justify-start pt-4 pb-1">
            {[2, 3, 4, 5, 6, 7].map((val) => (
              <div key={val} className="w-1/3 flex flex-col pb-4 pr-4">
                <button
                  onClick={() => changeDayPerWeeks(val)}
                  className="capitalize rounded-sm border border-black dark:border-white"
                >
                  <div
                    className={`capitalize font-light ${
                      dayPerWeeks === val
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : ""
                    } px-4 py-1`}
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
