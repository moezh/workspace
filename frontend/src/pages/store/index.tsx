import {GetServerSideProps} from "next";
import {readFileSync} from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import Search from "../../components/Search";
import Menu from "../../components/menu";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const page = context.query.page ? Number(context.query.page) : 1;
  const category = context.query.category ? context.query.category : "";
  const search = context.query.search ? context.query.search : "";
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
  const limit = configData.productsPerPage
    ? Number(configData.productsPerPage)
    : 24;
  const offset = page * limit - limit;
  let urlProducts = `http://backend:3001/api/store/products?limit=${limit + 1
    }&offset=${offset}`;
  if (category !== "") urlProducts += `&category=${category}`;
  if (search !== "") urlProducts += `&search=${search}`;
  const products = await fetch(urlProducts, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const productsData = await products.json();
  let nextPage = false;
  if (productsData.length > limit) {
    nextPage = true;
    productsData.pop();
  }
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
      categories: categoriesData,
      products: productsData,
      count: countData,
      currentPage: page,
      currentCategory: category,
      currentSearch: search,
      nextPage: nextPage,
    },
  };
};

export default function Page(props: {
  config: {store_title: string; store_summary: string;};
  products: Record<string, string>[];
  categories: Record<string, string[]>;
  count: {product_category_name: string; product_count: string;};
  currentPage: number;
  currentCategory: string;
  currentSearch: string;
  nextPage: boolean;
}) {
  return (
    <>
      <Head
        title={`${props.config.store_title} - ${props.currentSearch !== ""
          ? "Search"
          : props.count.product_category_name
          }`}
        description={props.config.store_summary}
      />
      <Header />
      <div className="w-full">
        <div className="flex flex-row items-start justify-start py-1">
          <div className="w-1/2 flex flex-col items-start justify-center">
            <Menu menu={props.categories} url="/?category=" />
          </div>
          <div className="w-1/2 flex flex-col items-end justify-center">
            <Search />
          </div>
        </div>
        <div className="flex flex-col items-center justify-start pt-4">
          <h1 className="text-xl uppercase font-serif">
            {props.currentSearch !== ""
              ? "Search"
              : props.count.product_category_name}
          </h1>
          {props.currentSearch !== "" ? (
            <p>{props.currentSearch}</p>
          ) : (
            <p>{Number(props.count.product_count)} item(s)</p>
          )}
        </div>
        <div className="flex flex-row flex-wrap items-start justify-center pt-4 pb-6">
          {props.products.map((product, index: number) => (
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
                  quality={100}
                  priority
                />
              </Link>
              <div className="pt-2 p-8">
                <Link href={`/${product.product_uid}`}>
                  <div className="uppercase font-serif">{product.brand}</div>
                  <div className="font-light">
                    {product.sale_price === "" ||
                      product.sale_price === product.price ? (
                      <>{product.price}</>
                    ) : (
                      <>
                        {product.sale_price}{" "}
                        <s className="text-sm">{product.price}</s>
                      </>
                    )}
                  </div>
                  <div>{product.title}</div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div
          className="font-light"
          hidden={
            props.currentPage === 1 && props.nextPage === false ? true : false
          }
        >
          <div className="flex flex-row items-start justify-center">
            <div className="flex flex-col items-center justify-center mr-2 w-8">
              <Link
                href={`/?page=${Number(props.currentPage) - 1}${props.currentCategory !== ""
                  ? `&category=${props.currentCategory}`
                  : ""
                  }${props.currentSearch !== ""
                    ? `&search=${props.currentSearch}`
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
              Page {props.currentPage}
            </div>
            <div className="flex flex-col items-center justify-center ml-2 w-8">
              <Link
                href={`/?page=${Number(props.currentPage) + 1}${props.currentCategory !== ""
                  ? `&category=${props.currentCategory}`
                  : ""
                  }${props.currentSearch !== ""
                    ? `&search=${props.currentSearch}`
                    : ""
                  }`}
                hidden={!props.nextPage}
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
