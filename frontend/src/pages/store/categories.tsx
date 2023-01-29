import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
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

export default function Page(props: { categories: any }) {
  return (
    <>
      <Head title="MH's Categories" />
      <div className="w-full">
        <div className="flex flex-col items-center justify-start py-6">
          {props.categories["Root"].map((level0: any) => (
            <div key={level0} className="w-[360px]">
              <Link
                href={`/?category=${level0.replaceAll(/[^A-Za-z0-9]+/g, "")}`}
              >
                <div className="font-medium text-gl uppercase py-4">
                  {level0} →
                </div>
              </Link>
              {props.categories[`${level0}`]?.map((level1: any) => (
                <div key={level1}>
                  <Link
                    href={`/?category=${level0
                      .concat(level1)
                      .replaceAll(/[^A-Za-z0-9]+/g, "")}`}
                  >
                    <div className="font-medium py-4 ml-4">{level1} →</div>
                  </Link>
                  {props.categories[`${level1}`]?.map((level2: any) => (
                    <div key={level2}>
                      <Link
                        href={`/?category=${level0
                          .concat(level1, level2)
                          .replaceAll(/[^A-Za-z0-9]+/g, "")}`}
                      >
                        <div className="font-normal py-4 ml-8">{level2} →</div>
                      </Link>
                      {props.categories[`${level2}`]?.map((level3: any) => (
                        <div key={level3}>
                          <Link
                            href={`/?category=${level0
                              .concat(level1, level2, level3)
                              .replaceAll(/[^A-Za-z0-9]+/g, "")}`}
                          >
                            <div className="font-light py-4 ml-12">
                              {level3} →
                            </div>
                          </Link>
                          {props.categories[`${level3}`]?.map((level4: any) => (
                            <div key={level4}>
                              <Link
                                href={`/?category=${level0
                                  .concat(level1, level2, level3, level4)
                                  .replaceAll(/[^A-Za-z0-9]+/g, "")}`}
                              >
                                <div className="font-light py-4 ml-16">
                                  {level4} →
                                </div>
                              </Link>
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
