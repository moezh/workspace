import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GooglePlay from "../../components/GooglePlay";
import Menu from "../../components/menu";

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

export default function Page(props: { config: Record<string, string> }) {
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
            <Menu menu={JSON.parse(props.config.workout_menu)} url="/" />
          </div>
          <div className="w-1/2 flex flex-col items-end justify-start"></div>
        </div>
        <div className="flex flex-col items-center justify-start pt-2">
          <h1 className="text-xl uppercase font-serif">Coming Soon</h1>
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
