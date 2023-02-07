import React, { useEffect, createContext, useState, useContext } from "react";

type Data = {
  isLogged: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
};

const defaultData: Data = {
  isLogged: false,
};

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
