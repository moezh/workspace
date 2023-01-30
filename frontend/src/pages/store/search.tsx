import { GetServerSideProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Head from "../../components/Head";
import GoBack from "../../components/GoBack";

export default function Search() {
  return (
    <>
      <Head title="" />
      <div className="w-full flex flex-col items-center justify-start px-4 pt-4 pb-8">
        <div className="fixed right-0 pt-4 pr-4">
          <GoBack />
        </div>
        <h1 className="w-[280px] font-medium text-xl uppercase font-serif py-4">
          Coming Soon
        </h1>
        <p className="w-[260px]">Under Construction</p>
      </div>
    </>
  );
}
