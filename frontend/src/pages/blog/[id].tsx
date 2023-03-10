import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoBack from "../../components/GoBack";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const { id } = context.query;
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const result = await fetch(`http://backend:3001/api/blog/post/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const resultData = await result.json();
  if (resultData.code === 404) return { notFound: true };
  return { props: { data: resultData } };
};

export default function Page(props: {
  data: { title: string; summary: string; tags: string; content_html: string };
}) {
  return (
    <>
      <Head title={props.data.title} description={props.data.summary} />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              {props.data.title}
            </h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <h1 className="text-xl uppercase font-serif text-center">
          {props.data.title}
        </h1>
        <div className="w-full flex flex-row flex-wrap items-start justify-center pt-1">
          {props.data.tags.split(",").map((tag, index: number) => (
            <span key={index} className="font-light mr-2">
              #{tag}
            </span>
          ))}
        </div>
        <div className="pt-8">
          <div
            dangerouslySetInnerHTML={{
              __html: props.data.content_html,
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
