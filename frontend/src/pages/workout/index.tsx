import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import GooglePlay from "../../components/GooglePlay";

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

export default function Page(props: {
  config: {
    workout_title: string;
    workout_summary: string;
  };
}) {
  return (
    <>
      <Head
        title={`${props.config.workout_title}`}
        description={props.config.workout_summary}
      />
      <Header />
      <div className="w-full">
        <div className="flex flex-row items-start justify-start py-1">
          <div className="w-1/2 flex flex-col items-start justify-start">
            <Link href={`/menu`}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Link>
          </div>
          <div className="w-1/2 flex flex-col items-end justify-start"></div>
        </div>
        <div className="flex flex-col items-center justify-start pt-2">
          <h1 className="font-medium text-xl uppercase font-serif">
            Coming Soon
          </h1>
          <p className="pt-2 text-center pb-6">Under Construction!</p>
        </div>
      </div>
      <div className="pt-6">
        <GooglePlay url="./android" />
      </div>
      <Footer />
    </>
  );
}
