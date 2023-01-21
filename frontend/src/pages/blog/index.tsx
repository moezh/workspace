import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export const getStaticProps: GetStaticProps = async (context) => {
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const result = await fetch("http://backend:3001/api/blog/", {
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
      <Head title="MH's Blog" />
      <Header />
      <div className="w-full">
        <h1 className="font-medium text-xl uppercase font-serif text-center">
          MH's Blog
        </h1>
        <div className="flex flex-row flex-wrap items-start justify-start pt-8">
          {props.data.map(
            (
              post: { id: string; title: string; summary: string },
              index: number
            ) => (
              <div
                key={index}
                className="w-1/3 flex flex-col items-center justify-start p-4 mb-4"
              >
                <Link href={`/${post.id}`}>
                  <p className="font-medium">{post.title}</p>
                  <p className="pt-1">{post.summary}</p>
                </Link>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
