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
  const page = context.query.page ? Number(context.query.page) : 1;
  const category = context.query.category ? context.query.category : "";
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
  const limit = configData.productsPerPage
    ? Number(configData.productsPerPage)
    : 24;
  const offset = page * limit - limit;
  let urlProducts = `http://backend:3001/api/store/products?limit=${limit}&offset=${offset}`;
  if (category !== "") urlProducts += `&category=${category}`;
  const products = await fetch(urlProducts, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const productsData = await products.json();
  let urlProductsCount = `http://backend:3001/api/store/products/count`;
  if (category !== "") urlProductsCount += `?category=${category}`;
  const count = await fetch(urlProductsCount, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const countData = await count.json();
  return {
    props: {
      config: configData,
      products: productsData,
      count: countData,
      currentPage: page,
      currentCategory: category,
    },
  };
};

export default function Page(props: {
  config: any;
  products: any;
  count: any;
  currentPage: number;
  currentCategory: string;
}) {
  const totalPages = Math.ceil(
    props.count.product_count / props.config.productsPerPage
  );
  return (
    <>
      <Head
        title={
          props.currentCategory !== ""
            ? props.count.product_category_name
            : "MH's Store"
        }
      />
      <Header />
      <div className="w-full">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4 flex flex-col items-start justify-start">
            <Link href={`/categories`}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </Link>
          </div>
          <div className="w-2/4 flex flex-col items-center justify-start text-center">
            <h1 className="font-medium text-xl uppercase font-serif">
              {props.currentCategory !== ""
                ? `${props.count.product_category_name}`
                : "All products"}
            </h1>
            <p>{props.count.product_count} items</p>
          </div>
          <div className="w-1/4 flex flex-col items-end justify-start">
            <Link href={`/search`}>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-start justify-center pt-8">
          {props.products.map((product: any, index: number) => (
            <div
              key={`${product.product_uid}-${index}`}
              className="w-[320px] flex flex-col items-center justify-start text-center px-2"
            >
              <Link href={`/${product.product_uid}`}>
                <Image
                  src={product.image_link}
                  alt={`${product.title}, ${product.brand}`}
                  width="400"
                  height="400"
                  className="h-[200px] w-auto"
                  priority
                />
              </Link>
              <div className="font-light pt-2 p-8">
                <Link href={`/${product.product_uid}`}>
                  <div className="font-medium">{product.brand}</div>
                  <div>
                    {product.sale_price === "" ? (
                      <>{product.price}</>
                    ) : (
                      <>
                        {product.sale_price} <s>{product.price}</s>
                      </>
                    )}
                  </div>
                  <div>{product.title}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="py-2 font-light" hidden={totalPages > 1 ? false : true}>
          <div className="flex flex-row items-start justify-center">
            <div className="flex flex-col items-center justify-center mr-2 w-8">
              <Link
                href={`/?page=${Number(props.currentPage) - 1}${
                  props.currentCategory !== ""
                    ? `&category=${props.currentCategory}`
                    : ""
                }`}
                hidden={props.currentPage > 1 ? false : true}
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
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center mx-2">
              Page {props.currentPage} / {totalPages}
            </div>
            <div className="flex flex-col items-center justify-center ml-2 w-8">
              <Link
                href={`/?page=${Number(props.currentPage) + 1}${
                  props.currentCategory !== ""
                    ? `&category=${props.currentCategory}`
                    : ""
                }`}
                hidden={props.currentPage < totalPages ? false : true}
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
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
