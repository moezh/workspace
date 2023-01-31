import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Search = (props: { link?: string }) => {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");

  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };

  const router = useRouter();

  const handleKeyDown = (target: any) => {
    if (target.code === "Enter") {
      router.push(`/?search=${search}`);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="flex flex-row items-center justify-center">
      <input
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={"Search for ..."}
        className="w-[150px] bg-inherit border focus:outline-0 px-1 border-neutral-300 placeholder-neutral-300 dark:border-neutral-500 dark:placeholder-neutral-500 "
      />
      <Link href={`/?search=${search}`}>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Search;
