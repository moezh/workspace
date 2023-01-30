import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

export default function Page(props: { data: any }) {
  return (
    <>
      <Head title={props.data.title} description={props.data.summary} />
      <Header />
      <div className="w-full">
        <h1 className="font-medium text-xl uppercase font-serif text-center">
          {props.data.title}
        </h1>
        <div className="w-full flex flex-row flex-wrap items-start justify-center pt-1">
          {props.data.tags.split(",").map((tag: string, index: number) => (
            <span key={index} className="font-light mr-2">
              #{tag}
            </span>
          ))}
        </div>
        <div className="pt-6">
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
