import { GetServerSideProps, GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page ? Number(context.query.page) : 1;
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
  const products = await fetch(
    `http://backend:3001/api/store/products?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${jwt.sign("admin", password)}`,
        "Content-Type": "application/json",
      },
    }
  );
  const productsData = await products.json();
  return {
    props: { config: configData, products: productsData, currentPage: page },
  };
};

export default function Page(props: {
  config: any;
  products: any;
  currentPage: number;
}) {
  const products = props.products;
  const currentPage = props.currentPage;
  return (
    <>
      <Head title="MH's Store" />
      <Header />
      <div className="w-full">
        <h1 className="font-medium text-xl uppercase font-serif text-center">
          MH's Store
        </h1>
        <div className="flex flex-row flex-wrap items-start justify-center pt-8">
          {products.map((product: any, index: number) => (
            <div
              key={index}
              className="w-[300px] flex flex-col items-center justify-start text-center px-6"
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
              <div className="font-light h-[150px]">
                <Link href={`/${product.product_uid}`}>
                  <div className="font-medium pt-4">{product.brand}</div>
                  <div>
                    {product.sale_price === "" ? (
                      <>{product.price}</>
                    ) : (
                      <>
                        <s>{product.price}</s> {product.sale_price}
                      </>
                    )}
                  </div>
                  <div>{product.title}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-6 font-light">
        <ul className="flex flex-row items-start justify-center">
          <li className="flex flex-col items-center justify-center mr-2 w-8">
            <Link
              href={`/?page=${Number(currentPage) - 1}`}
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
            </Link>
          </li>
          <li className="mx-2">Page {currentPage}</li>
          <li className="flex flex-col items-center justify-center ml-2  w-8">
            <Link href={`/?page=${Number(currentPage) + 1}`}>
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
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}
