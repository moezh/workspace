import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const getStaticProps: GetStaticProps = async (context) => {
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const result = await fetch("http://backend:3001/api/workout/", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const resultData = await result.json();
  return { props: { data: resultData } };
};

export default function Page(props: { data: any }) {
  return (
    <>
      <Head title="MH's Workout" />
      <Header
        logo_black={props.data.logo_black}
        logo_white={props.data.logo_white}
      />
      <div className="w-full">
        <h1 className="font-medium text-xl uppercase font-serif text-center">
          MH's Workout
        </h1>
        <div className="pt-8">Coming Soon</div>
      </div>
      <Footer />
    </>
  );
}
