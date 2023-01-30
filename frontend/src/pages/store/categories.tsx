import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Link from "next/link";
import GoBack from "../../components/GoBack";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const categories = await fetch("http://backend:3001/api/store/categories", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const categoriesData = await categories.json();
  return {
    props: { categories: categoriesData },
  };
};

export default function Categories(props: { categories: any }) {
  return (
    <>
      <Head title="" />
      <div className="w-full">
        <div className="w-full flex flex-col items-center justify-start px-4 pt-4 pb-8">
          <div className="fixed right-0 pt-4 pr-4">
            <GoBack />
          </div>
          <h1 className="w-[280px] font-medium text-xl uppercase font-serif py-4">
            <Link href="/">All Products →</Link>
          </h1>
          {props.categories["Root"]?.map((level0: any) => (
            <div key={level0} className="w-[260px]">
              <div className="py-4 font-medium">
                {level0.slice(-1) === "→" ? (
                  <Link
                    href={`/?category=${level0.replaceAll(
                      /[^A-Za-z0-9]+/g,
                      ""
                    )}`}
                    className="disabled-link"
                  >
                    <>{level0}</>
                  </Link>
                ) : (
                  <>{level0}</>
                )}
              </div>
              {props.categories[`${level0}`]?.map((level1: any) => (
                <div key={level1}>
                  <div
                    className="py-4 ml-4"
                    hidden={level1.slice(-1) === "→" ? false : true}
                  >
                    {level1.slice(-1) === "→" ? (
                      <Link
                        href={`/?category=${level1.replaceAll(
                          /[^A-Za-z0-9]+/g,
                          ""
                        )}`}
                        className="disabled-link"
                      >
                        <>{level1}</>
                      </Link>
                    ) : (
                      <>{level1}</>
                    )}
                  </div>
                  {props.categories[`${level1}`]?.map((level2: any) => (
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
                            className="disabled-link"
                          >
                            <>{level2}</>
                          </Link>
                        ) : (
                          <>{level2}</>
                        )}
                      </div>
                      {props.categories[`${level2}`]?.map((level3: any) => (
                        <div key={level3}>
                          <div
                            className="py-4 ml-4"
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
                          {props.categories[`${level3}`]?.map((level4: any) => (
                            <div key={level4}>
                              <div
                                className="py-4 ml-4"
                                hidden={level4.slice(-1) === "→" ? false : true}
                              >
                                {level4.slice(-1) === "→" ? (
                                  <Link
                                    href={`/?category=${level4.replaceAll(
                                      /[^A-Za-z0-9]+/g,
                                      ""
                                    )}`}
                                    className="disabled-link"
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
      </div>
    </>
  );
}
