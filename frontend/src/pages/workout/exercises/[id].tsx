import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const { id } = context.query;
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const exercise = await fetch(`http://backend:3001/api/workout/exercises/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const exerciseData = await exercise.json();
  if (exerciseData.code === 404) return { notFound: true };
  return { props: { data: exerciseData } };
};

export default function Page(props: { data: Record<string, string> }) {
  return <>{props.data.id}</>;
}
