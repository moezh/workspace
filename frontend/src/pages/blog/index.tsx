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

export default function Page(props: {
  config: {
    postsPerPage: string;
    blog_title: string;
    blog_summary: string;
    tags: string;
  };
  posts: {
    id: string;
    title: string;
    tags: string;
    summary: string;
  }[];
}) {
  const [currentTag, setCurrentTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const filtredPosts = props.posts.filter((post: { tags: string }) =>
    post.tags.includes(currentTag)
  );
  const totalPages = Math.ceil(
    filtredPosts.length / Number(props.config.postsPerPage)
  );
  const postsToDisplay = filtredPosts.slice(
    (currentPage - 1) * Number(props.config.postsPerPage),
    currentPage * Number(props.config.postsPerPage)
  );
  return (
    <>
      <Head
        title={props.config.blog_title}
        description={props.config.blog_summary}
      />
      <Header />
      <div className="w-full pt-4">
        <h1 className="text-xl uppercase font-serif text-center">
          {props.config.blog_title}
        </h1>
        <div className="w-full flex flex-row flex-wrap items-start justify-center pt-1">
          <button
            onClick={() => {
              setCurrentTag("");
              setCurrentPage(1);
            }}
            className={
              "" === currentTag ? "p-1 mr-2 font-medium" : "p-1 mr-2 font-light"
            }
          >
            #all
          </button>
          {props.config.tags.split(",").map((tag, index: number) => (
            <button
              key={index}
              onClick={
                tag === currentTag
                  ? () => {
                      setCurrentTag("");
                      setCurrentPage(1);
                    }
                  : () => {
                      setCurrentTag(tag);
                      setCurrentPage(1);
                    }
              }
              className={
                tag === currentTag
                  ? "p-1 mr-2 font-medium"
                  : "p-1 mr-2 font-light"
              }
            >
              #{tag}
            </button>
          ))}
        </div>
        <div className="flex flex-row flex-wrap items-start justify-start pt-6">
          {postsToDisplay.map((post, index: number) => (
            <div
              key={index}
              className="sm:w-full md:w-1/2 lg:w-1/3 flex flex-col items-start justify-start p-2 mb-4"
            >
              <Link href={`/${post.id}`}>
                <p className="text-lg font-serif">{post.title}</p>
              </Link>
              <div className="w-full flex flex-row flex-wrap items-start justify-start pt-1">
                {post.tags.split(",").map((tag, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentTag(tag);
                      setCurrentPage(1);
                    }}
                    className="font-light mr-2"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              <p className="pt-1">{post.summary}</p>
              <div className="pt-1">
                <Link href={`/${post.id}`}>
                  <p className="font-light capitalize">Read full post ???</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-6 font-light" hidden={totalPages > 1 ? false : true}>
        <ul className="flex flex-row items-start justify-center">
          <li className="flex flex-col items-center justify-center mr-2 w-8">
            <button
              onClick={() => {
                setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
                window.scroll(0, 0);
              }}
              hidden={currentPage > 1 ? false : true}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
          <li className="mx-2">
            Page {currentPage} / {totalPages}
          </li>
          <li className="flex flex-col items-center justify-center ml-2  w-8">
            <button
              onClick={() => {
                setCurrentPage(
                  currentPage < totalPages ? currentPage + 1 : totalPages
                );
                window.scroll(0, 0);
              }}
              hidden={currentPage < totalPages ? false : true}
            >
              <svg
                aria-hidden="true"
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}
