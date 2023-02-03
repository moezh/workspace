import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Link from "next/link";
import GoBack from "../../components/GoBack";
import Logo from "../../components/Logo";

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

export default function Categories(props: {
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
      <div className="w-full flex flex-col items-center justify-start px-4 pt-4 pb-8">
        <div className="fixed top-8 right-8">
          <GoBack />
        </div>
        <h1 className="w-[280px] flex flex-col items-start justify-start py-4">
          <Link href="/">
            <Logo />
          </Link>
        </h1>
      </div>
    </>
  );
}
