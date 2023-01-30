import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";

export const getServerSideProps: GetServerSideProps = async (context) => {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600"
  );
  const { gtin } = context.query;
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const link = await fetch(`http://backend:3001/api/store/link/${gtin}`, {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const linkData = await link.json();
  if (linkData.code === 404) return { notFound: true };
  return {
    redirect: {
      destination: linkData.link,
      permanent: true,
    },
  };
};

export default function Page(props: { data: any }) {
  return <>{props.data.link}</>;
}
