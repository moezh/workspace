import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import GoBack from "../components/GoBack";
import { z } from "zod";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.email !== undefined) {
    const { email, firstName, lastName, password } = context.query;
    const backendPassword = readFileSync("/run/secrets/backend-password", {
      encoding: "utf8",
    });
    const response = await fetch("http://backend:3001/api/user/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt.sign("admin", backendPassword)}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        last_name: lastName,
        password: password,
      }),
    });
    const responseData = await response.json();
    return {
      props: {
        data: responseData,
      },
    };
  }
  return {
    props: {
      data: {},
    },
  };
};

export default function Page(props: { data: Record<string, string> }) {
  let router = useRouter();

  const { data, setData } = useUserContext();
  const [registerForm, setRegisterForm] = useState({} as RegisterForm);
  const [error, setError] = useState(
    undefined as undefined | Record<string, string>
  );

  const RegisterForm = z
    .object({
      firstName: z
        .string()
        .min(3, { message: "Must be 3 or more characters long" })
        .max(50, { message: "Must be 50 or fewer characters long" }),
      lastName: z
        .string()
        .min(3, { message: "Must be 3 or more characters long" })
        .max(50, { message: "Must be 50 or fewer characters long" }),
      email: z
        .string()
        .email({ message: "Invalid email address" })
        .max(100, { message: "Must be 100 or fewer characters long" }),
      password: z
        .string()
        .min(6, { message: "Must be 6 or more characters long" })
        .max(50, { message: "Must be 50 or fewer characters long" }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  type RegisterForm = z.infer<typeof RegisterForm>;

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleKeyDown = (target: { code: string; keyCode: number }) => {
    if (
      target.code === "Enter" ||
      target.code === "NumpadEnter" ||
      target.keyCode === 13
    ) {
      handleRegister();
    }
  };

  const handleRegister = () => {
    const formParsed = RegisterForm.safeParse(registerForm);
    if (formParsed.success) {
      setError(undefined);
      router.push(
        {
          pathname: "/signup",
          query: {
            email: registerForm.email,
            firstName: registerForm.firstName,
            lastName: registerForm.lastName,
            password: registerForm.password,
          },
        },
        "/signup"
      );
    } else {
      setError(
        formParsed.error.errors.reduce((acc, c) => {
          return { ...acc, [c.path[0]]: c.message };
        }, {})
      );
    }
  };

  useEffect(() => {
    if (props.data?.email !== undefined) {
      setData({
        email: props.data.email,
        firstName: props.data.first_name,
        lastName: props.data.last_name,
        userData: props.data.user_data,
      });
      router.push("/");
    }
  }, [props.data]);

  return (
    <>
      <Head title="Register / Sign up" description="" />
      <Header />
      <div className="w-full pt-4 mx-auto">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/3">
            <GoBack />
          </div>
          <div className="w-1/3">
            <h1 className="font-medium text-xl uppercase font-serif text-center">
              Sign up
            </h1>
          </div>
        </div>
        <div className="w-[280px] mx-auto py-8">
          <div className="flex flex-col items-start justify-start">
            <p className="font-medium uppercase pt-4">Create an account</p>
            <p className="pt-1">Sign up and activate your account.</p>
            <form>
              <input
                type="text"
                name="firstName"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={"First name"}
                className="w-[280px] mt-4 bg-inherit border focus:outline-0 p-2 border-neutral-300 placeholder-neutral-300 dark:border-neutral-500 dark:placeholder-neutral-500 rounded-sm"
              />
              <p className="text-sm text-red-700">
                {error?.firstName === undefined ? null : error.firstName}
              </p>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={"Last name"}
                className="w-[280px] mt-4 bg-inherit border focus:outline-0 p-2 border-neutral-300 placeholder-neutral-300 dark:border-neutral-500 dark:placeholder-neutral-500 rounded-sm"
              />
              <p className="text-sm text-red-700">
                {error?.lastName === undefined ? null : error.lastName}
              </p>
              <input
                type="text"
                name="email"
                autoComplete="username"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={"Email"}
                className="w-[280px] mt-4 bg-inherit border focus:outline-0 p-2 border-neutral-300 placeholder-neutral-300 dark:border-neutral-500 dark:placeholder-neutral-500 rounded-sm"
              />
              <p className="text-sm text-red-700">
                {error?.email === undefined ? null : error.email}
              </p>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={"Password"}
                className="w-[280px] mt-4 bg-inherit border focus:outline-0 p-2 border-neutral-300 placeholder-neutral-300 dark:border-neutral-500 dark:placeholder-neutral-500 rounded-sm"
              />
              <p className="text-sm text-red-700">
                {error?.password === undefined ? null : error.password}
              </p>
              <input
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={"Confirm password"}
                className="w-[280px] mt-4 bg-inherit border focus:outline-0 p-2 border-neutral-300 placeholder-neutral-300 dark:border-neutral-500 dark:placeholder-neutral-500 rounded-sm"
              />
              <p className="text-sm text-red-700">
                {error?.confirmPassword === undefined
                  ? null
                  : error.confirmPassword}
              </p>
            </form>
            <button
              onClick={handleRegister}
              aria-label="Login"
              className="w-full mt-6 mb-1 bg-neutral-800 text-white dark:bg-neutral-100  dark:text-black rounded-sm"
            >
              <p className="capitalize px-8 py-2">Sign up →</p>
            </button>
            <p className="text-sm pt-1 text-red-700">
              {props.data?.description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
