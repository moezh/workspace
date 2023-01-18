import Head from "next/head";
import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const result = await fetch("http://backend:3001/api/info", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const resultData = JSON.stringify(await result.json());
  return { props: { data: resultData } };
};

export default function Page(props: { data: string }) {
  return (
    <>
      <Head>
        <title>MH's Workout</title>
      </Head>
      <h1 className="font-medium text-xl uppercase font-serif">MH's Workout</h1>
      <div className="w-full pt-8"></div>
      <p className="font-medium uppercase">Coming Soon</p>
      <p>{props.data}</p>
    </>
  );
}
