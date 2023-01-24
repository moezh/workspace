import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto pl-4 pr-4">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
