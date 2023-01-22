import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { useState } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const config = await fetch("http://backend:3001/api/blog/", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const configData = await config.json();
  const posts = await fetch("http://backend:3001/api/blog/posts", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const postsData = await posts.json();
  return { props: { config: configData, posts: postsData } };
};

export default function Page(props: { config: any; posts: any }) {
  const [currentTag, setCurrentTag] = useState("");
  return (
    <>
      <Head title="MH's Blog" />
      <Header />
      <div className="w-full">
        <h1 className="font-medium text-xl uppercase font-serif text-center">
          MH's Blog
        </h1>
        <div className="w-full flex flex-row flex-wrap items-start justify-center ">
          <button
            onClick={() => setCurrentTag("")}
            className={
              "" === currentTag ? "p-2 mr-2 font-medium" : "p-2 mr-2 font-light"
            }
          >
            #all
          </button>
          {props.config.tags.split(",").map((tag: string, index: number) => (
            <button
              key={index}
              onClick={
                tag === currentTag
                  ? () => setCurrentTag("")
                  : () => setCurrentTag(tag)
              }
              className={
                tag === currentTag
                  ? "p-2 mr-2 font-medium"
                  : "p-2 mr-2 font-light"
              }
            >
              #{tag}
            </button>
          ))}
        </div>
        <div className="flex flex-row flex-wrap items-start justify-start pt-6">
          {props.posts
            .filter((post: { tags: string }) => post.tags.includes(currentTag))
            .map(
              (
                post: {
                  id: string;
                  title: string;
                  tags: string;
                  summary: string;
                },
                index: number
              ) => (
                <div
                  key={index}
                  className="sm:w-full md:w-1/2 lg:w-1/3 flex flex-col items-start justify-start p-2 mb-4"
                >
                  <Link href={`/${post.id}`}>
                    <p className="font-medium">{post.title}</p>
                  </Link>
                  <div className="w-full flex flex-row flex-wrap items-start justify-start pt-1">
                    {post.tags.split(",").map((tag: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTag(tag)}
                        className="font-light mr-2"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                  <p className="pt-1">{post.summary}</p>
                  <div className="pt-1">
                    <Link href={`/${post.id}`}>
                      <p className="font-medium capitalize">Read full post →</p>
                    </Link>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <Footer />
    </>
  );
}
