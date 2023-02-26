import {GetServerSideProps} from "next";
import {readFileSync} from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import GoBack from "../../components/GoBack";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const {uid} = context.query;
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const result = await fetch(`http://backend:3001/api/store/product/${uid}`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const resultData = await result.json();
  if (resultData.code === 404) return {notFound: true};
  return {props: {data: resultData}};
};

export default function Page(props: {data: Record<string, string>;}) {
  const imagesArray = Array.from(
    new Set(
      `${props.data.image_link},${props.data.additional_image_link}`.split(",")
    )
  );
  return (
    <>
      <Head
        title={`${props.data.title} - ${props.data.brand}`}
        description={props.data.description}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <GoBack />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              {props.data.title}
            </h1>
          </div>
        </div>
        <p className="pt-2 w-full text-center">
          {props.data.product_category_name}
        </p>
        <div className="flex flex-col items-center justify-start mt-6 mb-2">
          <div className="flex flex-row flex-wrap items-center justify-center">
            {imagesArray.map((e: string, index: number) => {
              return e === "" ? (
                <></>
              ) : (
                <Link href={`/link/${props.data.product_uid}`}>
                  <Image
                    key={index}
                    src={e}
                    alt={e.substring(e.lastIndexOf("/") + 1)}
                    width="640"
                    height="640"
                    className="w-[320px] h-auto mx-1 mb-2"
                    quality={100}
                    priority
                  />
                </Link>
              );
            })}
          </div>
          <div className="flex flex-col items-center justify-start pt-4">
            {props.data.brand === "" ? null : (
              <p className="w-full text-center">
                <span className="capitalize pr-2">Brand:</span>
                <span className="font-light">{props.data.brand}</span>
              </p>
            )}
            <div className="flex flex-row items-start justify-start text-center pt-1">
              {props.data.sale_price === "" ||
                props.data.sale_price === props.data.price ? (
                <p className="w-full">
                  <span className="capitalize pr-2">Price:</span>
                  <span className="font-light">{props.data.price}</span>
                </p>
              ) : (
                <p className="w-full">
                  <span className="capitalize pr-2">Price:</span>
                  <span className="font-light">
                    {props.data.sale_price}{" "}
                    <s className="text-sm">{props.data.price}</s>
                  </span>
                </p>
              )}
            </div>
            <div className="w-[260px] flex flex-col items-center justify-start py-4">
              <Link
                href={`/link/${props.data.product_uid}`}
                className="border border-gray-900 dark:border-white rounded-sm"
              >
                <p className="capitalize px-8 py-2">buy now →</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-4">
            <p className="w-full pb-4">{props.data.description}</p>
            {props.data.availability === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Availability:</span>
                <span className="font-light">{props.data.availability}</span>
              </p>
            )}
            {props.data.condition === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Condition:</span>
                <span className="font-light">{props.data.condition}</span>
              </p>
            )}
            {props.data.age_group === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Age Group:</span>
                <span className="font-light">{props.data.age_group}</span>
              </p>
            )}
            {props.data.gender === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Gender:</span>
                <span className="font-light">{props.data.gender}</span>
              </p>
            )}
            {props.data.size === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Size:</span>
                <span className="font-light">{props.data.size}</span>
              </p>
            )}
            {props.data.color === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Color:</span>
                <span className="font-light">{props.data.color}</span>
              </p>
            )}
            {props.data.material === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Material:</span>
                <span className="font-light">{props.data.material}</span>
              </p>
            )}
            {props.data.pattern === "" ? null : (
              <p className="w-full">
                <span className="capitalize pr-2">Pattern:</span>
                <span className="font-light">{props.data.pattern}</span>
              </p>
            )}
            <div className="w-[260px] flex flex-col items-start justify-start pt-2">
              <Link href={`/link/${props.data.product_uid}`}>
                <p className="capitalize py-2">more details →</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
