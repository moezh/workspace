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
  const result = await fetch("http://backend:3001/api/web3/", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const resultData = await result.json();
  return { props: { data: resultData } };
};

export default function Page(props: { data: Record<string, string> }) {
  return (
    <>
      <Head title="MH's Web3" />
      <Header />
      <div className="w-full pt-4">
        <h1 className="text-xl uppercase font-serif text-center">
          Coming Soon
        </h1>
        <p className="pt-2 text-center pb-6">Under Construction!</p>
      </div>
      <Footer />
    </>
  );
}
