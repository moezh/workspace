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
import Link from "next/link";
import { z } from "zod";

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context.query.email !== undefined) {
    const { email, password } = context.query;
    const backendPassword = readFileSync("/run/secrets/backend-password", {
      encoding: "utf8",
    });
    const response = await fetch("http://backend:3001/api/user/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt.sign("admin", backendPassword)}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
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
  const [loginForm, setLoginForm] = useState({} as LoginForm);
  const [error, setError] = useState(
    undefined as undefined | Record<string, string>
  );

  const LoginForm = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .max(100, { message: "Must be 100 or fewer characters long" }),
    password: z
      .string()
      .min(6, { message: "Password must be 6 or more characters long" })
      .max(50, { message: "Must be 50 or fewer characters long" }),
  });
  type LoginForm = z.infer<typeof LoginForm>;

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const handleKeyDown = (target: { code: string; keyCode: number }) => {
    if (
      target.code === "Enter" ||
      target.code === "NumpadEnter" ||
      target.keyCode === 13
    ) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const formParsed = LoginForm.safeParse(loginForm);
    if (formParsed.success) {
      setError(undefined);
      router.push(
        {
          pathname: "/login",
          query: { email: loginForm.email, password: loginForm.password },
        },
        "/login"
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
        ...data,
        userData: {
          email: props.data.email,
          firstName: props.data.first_name,
          lastName: props.data.last_name,
        },
      });
      router.push("/");
    }
  }, [props.data]);

  return (
    <>
      <Head title="Login / Sign in" description="" />
      <Header />
      <div className="w-full pt-4 mx-auto">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="text-xl uppercase font-serif text-center">
              Sign in
            </h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="w-[280px] mx-auto py-8">
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg uppercase font-serif pb-2 pt-4">
              Authentification
            </p>
            <p className="pt-1">Please login to your account</p>
            <form>
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
                autoComplete="current-password"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={"Password"}
                className="w-[280px] mt-4 bg-inherit border focus:outline-0 p-2 border-neutral-300 placeholder-neutral-300 dark:border-neutral-500 dark:placeholder-neutral-500 rounded-sm"
              />
              <p className="text-sm text-red-700">
                {error?.password === undefined ? null : error.password}
              </p>
              <p className="font-light pt-2 text-right w-[280px]">
                <Link href="/reset-password">Reset password →</Link>
              </p>
            </form>
            <button
              onClick={handleLogin}
              aria-label="Login"
              className="w-full mt-6 mb-1 bg-neutral-800 text-white dark:bg-neutral-100  dark:text-black rounded-sm"
            >
              <p className="capitalize px-8 py-2">Login →</p>
            </button>
            <p className="text-sm pt-1 text-red-700">
              {props.data?.description}
            </p>
            <p className="font-light pt-8 w-full text-center">
              <Link href="/signup">Need an account? Register now →</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
