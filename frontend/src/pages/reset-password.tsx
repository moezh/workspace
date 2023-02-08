import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { useState } from "react";
import GoBack from "../components/GoBack";
import { z } from "zod";

export default function Page() {
  let router = useRouter();

  const { data, setData } = useUserContext();
  const [resetForm, setResetForm] = useState({} as ResetForm);
  const [message, setMessage] = useState(undefined as undefined | string);
  const [error, setError] = useState(
    undefined as undefined | Record<string, string>
  );

  const ResetForm = z.object({
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .max(100, { message: "Must be 100 or fewer characters long" }),
  });
  type ResetForm = z.infer<typeof ResetForm>;

  const handleChange = (event: { target: { name: string; value: string } }) => {
    setResetForm({ ...resetForm, [event.target.name]: event.target.value });
  };

  const handleKeyDown = (target: { code: string; keyCode: number }) => {
    if (
      target.code === "Enter" ||
      target.code === "NumpadEnter" ||
      target.keyCode === 13
    ) {
      handleReset();
    }
  };

  const handleReset = () => {
    const formParsed = ResetForm.safeParse(resetForm);
    if (formParsed.success) {
      setError(undefined);
      //setData({ ...data, isLogged: false });
      setMessage("Password reset link sent successfully");
    } else {
      setError(
        formParsed.error.errors.reduce((acc, c) => {
          return { ...acc, [c.path[0]]: c.message };
        }, {})
      );
    }
  };

  return (
    <>
      <Head title="Reset password" description="" />
      <Header />
      <div className="w-full pt-4 mx-auto">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/3">
            <GoBack />
          </div>
          <div className="w-1/3">
            <h1 className="font-medium text-xl uppercase font-serif text-center">
              Reset
            </h1>
          </div>
        </div>
        <div className="w-[280px] mx-auto py-8">
          <div className="flex flex-col items-start justify-start">
            <p className="font-medium uppercase pt-4">Reset your password?</p>
            <p className="pt-1">
              Enter your email to have a reset link emailed to you.
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
            <button
              onClick={handleReset}
              aria-label="Reset password"
              className="w-full mt-6 mb-1 bg-neutral-800 text-white dark:bg-neutral-100  dark:text-black rounded-sm"
            >
              <p className="capitalize px-8 py-2">Reset →</p>
            </button>
            <p className="text-sm text-green-700">
              {message === undefined ? null : message}
            </p>
            <p className="text-sm text-red-700">
              {error?.reset === undefined ? null : error.reset}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
