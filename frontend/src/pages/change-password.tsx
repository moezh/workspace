import {GetServerSideProps} from "next";
import {readFileSync} from "fs";
import jwt from "jsonwebtoken";
import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {useRouter} from "next/router";
import {useState} from "react";
import GoBack from "../components/GoBack";
import {z} from "zod";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.query.token;
  if (token === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  if (context.query.password !== undefined) {
    const password = context.query.password;
    const backendPassword = readFileSync("/run/secrets/backend-password", {
      encoding: "utf8",
    });
    const response = await fetch("http://backend:3001/api/user/password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt.sign("admin", backendPassword)}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
        token: token,
      }),
    });
    const responseData = await response.json();
    return {
      props: {
        token: token,
        data: responseData,
      },
    };
  }
  return {
    props: {
      token: token,
      data: {},
    },
  };
};

export default function Page(props: {
  token: string;
  data: Record<string, string>;
}) {
  let router = useRouter();

  const [changeForm, setChangeForm] = useState({} as ChangeForm);
  const [error, setError] = useState(
    undefined as undefined | Record<string, string>
  );

  const ChangeForm = z
    .object({
      password: z
        .string()
        .min(6, {message: "Must be 6 or more characters long"})
        .max(50, {message: "Must be 50 or fewer characters long"}),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  type ChangeForm = z.infer<typeof ChangeForm>;

  const handleChange = (event: {target: {name: string; value: string;};}) => {
    setChangeForm({...changeForm, [event.target.name]: event.target.value});
  };

  const handleKeyDown = (target: {code: string; keyCode: number;}) => {
    if (
      target.code === "Enter" ||
      target.code === "NumpadEnter" ||
      target.keyCode === 13
    ) {
      handleChangePassword();
    }
  };

  const handleChangePassword = () => {
    const formParsed = ChangeForm.safeParse(changeForm);
    if (formParsed.success) {
      setError(undefined);
      const hostname = window.location.hostname;
      const protocol = window.location.protocol;
      router.push(
        {
          pathname: "/change-password",
          query: {token: props.token, password: changeForm.password},
        },
        "/change-password"
      );
    } else {
      setError(
        formParsed.error.errors.reduce((acc, c) => {
          return {...acc, [c.path[0]]: c.message};
        }, {})
      );
    }
  };

  return (
    <>
      <Head title="Change password" description="" />
      <Header />
      <div className="w-full pt-4 mx-auto">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/3">
            <GoBack />
          </div>
          <div className="w-1/3">
            <h1 className="text-xl uppercase font-serif text-center">
              New Password
            </h1>
          </div>
        </div>
        <div className="w-[280px] mx-auto py-8">
          <div className="flex flex-col items-start justify-start">
            <p className="text-lg uppercase font-serif pb-2 pt-4">Change your password?</p>
            <p className="pt-1">Enter your new password.</p>
            <form>
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
              onClick={handleChangePassword}
              aria-label="Change password"
              className="w-full mt-6 mb-1 bg-neutral-800 text-white dark:bg-neutral-100  dark:text-black rounded-sm"
            >
              <p className="capitalize px-8 py-2">Change →</p>
            </button>
            <p
              className={`text-sm pt-1 ${Number(props.data?.code) === 200
                ? "text-green-700"
                : "text-red-700"
                }`}
            >
              {props.data?.description}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
