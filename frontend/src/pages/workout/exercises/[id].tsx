import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const { id } = context.query;
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
  const exercise = await fetch(
    `http://backend:3001/api/workout/exercises/${id}`,
    {
      headers: {
        Authorization: `Bearer ${jwt.sign("admin", password)}`,
        "Content-Type": "application/json",
      },
    }
  );
  const exerciseData = await exercise.json();
  if (exerciseData.code === 404) return { notFound: true };
  return { props: { config: configData, data: exerciseData } };
};

export default function Page(props: {
  config: Record<string, string>;
  data: Record<string, string>;
}) {
  return (
    <>
      <Head
        title={`${props.data.name}`}
        description={`${props.data.name} - ${props.data.instruction}`}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              {props.data.name}
            </h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="w-full flex flex-col items-center justify-start bg-white pt-6 my-2 rounded-sm dark:opacity-95">
          <video
            autoPlay
            loop
            muted
            style={{ width: "auto", height: "360px" }}
            className="dark:opacity-95"
          >
            <source src={`${props.config.bucket_url}${props.data.id}.mp4`} />
          </video>
        </div>
        <div className="pt-6">
          <div className="uppercase font-serif">Instruction</div>
          {props.data.instruction.split(".").map((i: string, index: number) =>
            i === "" ? null : (
              <div key={`instruction-${index}`}>
                <div className="uppercase pt-4">Step {index + 1}:</div>
                <div className="pt-2 w-full">{i}.</div>
              </div>
            )
          )}
        </div>
        <div className="pt-8 pb-2">
          <div className="uppercase font-serif">Hints</div>
          <div className="w-full pt-1">
            {props.data.hints.split(".").map((h: string, index: number) =>
              h === "" ? null : (
                <div key={`hint-${index}`}>
                  <div className="pt-2">??? {h}.</div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
