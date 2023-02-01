import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Link from "next/link";
import GoBack from "../../components/GoBack";
import Logo from "../../components/Logo";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const config = await fetch("http://backend:3001/api/store/", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const configData = await config.json();
  const categories = await fetch("http://backend:3001/api/store/categories", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const categoriesData = await categories.json();
  return {
    props: { config: configData, categories: categoriesData },
  };
};

export default function Categories(props: {
  config: {
    store_title: string;
    store_category_title: string;
    store_category_summary: string;
  };
  categories: Record<string, string[]>;
}) {
  return (
    <>
      <Head
        title={`${props.config.store_title} - ${props.config.store_category_title}`}
        description={props.config.store_category_summary}
      />
      <div className="w-full flex flex-col items-center justify-start px-4 pt-4 pb-8">
        <div className="fixed top-8 right-8">
          <GoBack />
        </div>
        <h1 className="w-[280px] flex flex-col items-start justify-start py-4">
          <Link href="/">
            <Logo />
          </Link>
        </h1>
        {props.categories["Root"]?.map((level0) => (
          <div key={level0} className="w-[280px]">
            <div className="py-4 uppercase">
              {level0.slice(-1) === "→" ? (
                <Link
                  href={`/?category=${level0.replaceAll(/[^A-Za-z0-9]+/g, "")}`}
                >
                  <>{level0}</>
                </Link>
              ) : (
                <>{level0}</>
              )}
            </div>
            {props.categories[`${level0}`]?.map((level1) => (
              <div key={level1}>
                <div
                  className="py-4 ml-2"
                  hidden={level1.slice(-1) === "→" ? false : true}
                >
                  {level1.slice(-1) === "→" ? (
                    <Link
                      href={`/?category=${level1.replaceAll(
                        /[^A-Za-z0-9]+/g,
                        ""
                      )}`}
                    >
                      <>{level1}</>
                    </Link>
                  ) : (
                    <>{level1}</>
                  )}
                </div>
                {props.categories[`${level1}`]?.map((level2) => (
                  <div key={level2}>
                    <div
                      className="py-4 ml-4"
                      hidden={level2.slice(-1) === "→" ? false : true}
                    >
                      {level2.slice(-1) === "→" ? (
                        <Link
                          href={`/?category=${level2.replaceAll(
                            /[^A-Za-z0-9]+/g,
                            ""
                          )}`}
                        >
                          <>{level2}</>
                        </Link>
                      ) : (
                        <>{level2}</>
                      )}
                    </div>
                    {props.categories[`${level2}`]?.map((level3) => (
                      <div key={level3}>
                        <div
                          className="py-4 ml-6"
                          hidden={level3.slice(-1) === "→" ? false : true}
                        >
                          {level3.slice(-1) === "→" ? (
                            <Link
                              href={`/?category=${level3.replaceAll(
                                /[^A-Za-z0-9]+/g,
                                ""
                              )}`}
                            >
                              <>{level3}</>
                            </Link>
                          ) : (
                            <>{level3}</>
                          )}
                        </div>
                        {props.categories[`${level3}`]?.map((level4) => (
                          <div key={level4}>
                            <div
                              className="py-4 ml-8"
                              hidden={level4.slice(-1) === "→" ? false : true}
                            >
                              {level4.slice(-1) === "→" ? (
                                <Link
                                  href={`/?category=${level4.replaceAll(
                                    /[^A-Za-z0-9]+/g,
                                    ""
                                  )}`}
                                >
                                  <>{level4}</>
                                </Link>
                              ) : (
                                <>{level4}</>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
