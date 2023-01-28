import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
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
      <div className="pt-1 capitalize">
        {title === "" ? <></> : <span className="pr-2">{title}:</span>}
        {arrayOfText.map((e: string, index: number) => (
          <span key={index} className="font-light pr-2">
            {e}
          </span>
        ))}
      </div>
    );
  }
};

const arrayToImages = (arrayOfImages: string[]) => {
  if (arrayOfImages[0] === "") {
    return <></>;
  } else {
    return (
      <div>
        {arrayOfImages.map((e: string, index: number) => (
          <Image
            key={index}
            src={e}
            alt={e.substring(e.lastIndexOf("/") + 1)}
            width="640"
            height="640"
            className="w-[320px] h-auto mx-2 mb-2"
            priority
          />
        ))}
      </div>
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
        <div className="flex flex-col items-center justify-start mt-8 mb-2">
          <div className="flex flex-row flex-wrap items-start justify-center">
            {arrayToImages(props.data.image_link)}
            {arrayToImages(props.data.additional_image_link)}
          </div>
          <div className="pt-4"></div>
          {arrayToText(props.data.brand, "brand")}
          <div className="flex flex-row items-start justify-start">
            {props.data.sale_price[0] === "" ? (
              <>{arrayToText(props.data.price, "price")}</>
            ) : (
              <>
                {arrayToText(props.data.sale_price, "price")}{" "}
                <s>{arrayToText(props.data.price)}</s>
              </>
            )}
          </div>
          <Link
            href={props.data.link[0]}
            className="my-4 border border-gray-900 dark:border-white px-6 py-2 rounded-sm"
          >
            <p className="text-gray-900 dark:text-white capitalize font-light">
              buy now →
            </p>
          </Link>
          <div className="w-full pt-2">
            {arrayToText(props.data.description)}
            <div className="pt-4"></div>
            {arrayToText(props.data.availability, "availability")}
            {arrayToText(props.data.condition, "condition")}
            {arrayToText(props.data.age_group, "age group")}
            {arrayToText(props.data.gender, "gender")}
            {arrayToText(props.data.color, "color")}
            {arrayToText(props.data.size, "size")}
            {arrayToText(props.data.material, "material")}
            {arrayToText(props.data.pattern, "pattern")}
            <Link href={props.data.link[0]}>
              <div className="font-medium capitalize mt-4">more details →</div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
