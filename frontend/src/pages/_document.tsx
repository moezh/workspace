import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-black text-neutral-800 dark:text-neutral-100 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto px-4">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
