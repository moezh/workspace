import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const { id } = context.query;
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const result = await fetch(`http://backend:3001/api/store/product/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const resultData = await result.json();
  if (resultData.code === 404) return { notFound: true };
  return { props: { data: resultData } };
};

const arrayToText = (arrayOfText: string[], title: string = "") => {
  if (arrayOfText[0] === "") {
    return <></>;
  } else {
    return (
      <>
        {title === "" ? null : (
          <span className="capitalize pr-2">{title}:</span>
        )}
        {arrayOfText.map((e: string, index: number) => (
          <span key={index} className="font-light pr-2">
            {e}
          </span>
        ))}
      </>
    );
  }
};

const arrayToImages = (arrayOfImages: string[]) => {
  if (arrayOfImages[0] === "") {
    return <></>;
  } else {
    return (
      <>
        {arrayOfImages.map((e: string, index: number) => (
          <Image
            key={index}
            src={e}
            alt={e.substring(e.lastIndexOf("/") + 1)}
            width="640"
            height="640"
            className="w-[320px] h-auto mx-1 mb-2"
            priority
          />
        ))}
      </>
    );
  }
};

export default function Page(props: { data: any }) {
  return (
    <>
      <Head
        title={props.data.title[0]}
        description={props.data.description[0]}
      />
      <Header />
      <div className="w-full">
        <h1 className="font-medium text-xl uppercase font-serif text-center">
          {arrayToText(props.data.title)}
        </h1>
        <p className="pt-2 text-center">{props.data.product_category_name}</p>
        <div className="flex flex-col items-center justify-start mt-6 mb-2">
          <div className="flex flex-row flex-wrap items-center justify-center">
            <Link href={`/link/${props.data.gtin[0]}`}>
              {arrayToImages(props.data.image_link)}
            </Link>
            <Link href={`/link/${props.data.gtin[0]}`}>
              {arrayToImages(props.data.additional_image_link)}
            </Link>
          </div>
          <div className="flex flex-col items-center justify-start pt-4">
            <p className="text-center">
              {arrayToText(props.data.brand, "brand")}
            </p>
            <div className="flex flex-row items-start justify-start text-center pt-1">
              {props.data.sale_price[0] === "" ? (
                <p>{arrayToText(props.data.price, "price")}</p>
              ) : (
                <p>
                  {arrayToText(props.data.sale_price, "price")}{" "}
                  <s className="text-sm">{arrayToText(props.data.price)}</s>
                </p>
              )}
            </div>
            <div className="w-[260px] flex flex-col items-center justify-start py-4">
              <Link
                href={`/link/${props.data.gtin[0]}`}
                className="border border-gray-900 dark:border-white rounded-sm"
              >
                <p className="capitalize font-light px-8 py-2">buy now →</p>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-2">
            <p>{arrayToText(props.data.description)}</p>
            <p className="pt-4">
              {arrayToText(props.data.availability, "availability")}
            </p>
            <p>{arrayToText(props.data.condition, "condition")}</p>
            <p>{arrayToText(props.data.age_group, "age group")}</p>
            <p>{arrayToText(props.data.gender, "gender")}</p>
            <p>{arrayToText(props.data.color, "color")}</p>
            <p>{arrayToText(props.data.material, "material")}</p>
            <p>{arrayToText(props.data.pattern, "pattern")}</p>
            <div className="w-[260px] flex flex-col items-start justify-start py-2">
              <Link href={`/link/${props.data.gtin[0]}`}>
                <p className="font-medium capitalize py-2">more details →</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
