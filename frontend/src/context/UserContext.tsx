import React, { useEffect, createContext, useState, useContext } from "react";

type Data = {
  userData?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
  workoutData?: {
    level: string;
    daysPerWeek: number;
    workTime: number;
    restTime: number;
    currentProgram?: {
      id: string;
      goal: string;
      name: string;
      description: string;
      total_weeks: number;
      workouts: string;
      currentDay: number;
    };
    currentWorkout?: {
      id: string;
      type: string;
      name: string;
      description: string;
      exercises: {
        id: string;
        name: string;
      }[];
      isLinkedToProgram: boolean;
    };
    log: {
      timestamp: string;
      programId?: string;
      programName?: string;
      programDay?: number;
      workoutId: string;
      workoutName: string;
      level: string;
      timer: number;
      exercises: number;
    }[];
  };
};

const defaultData: Data = { userData: {} };

interface UserContextValue {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const defaultValue: UserContextValue = {
  data: defaultData,
  setData: () => {},
};

const UserContext = createContext(defaultValue);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState(defaultData);
  useEffect(() => {
    const localData = localStorage.getItem("data");
    if (localData !== null) {
      setData(JSON.parse(localData));
    }
  }, []);
  useEffect(() => {
    if (JSON.stringify(data) !== JSON.stringify(defaultData)) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);
  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
