import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white dark:bg-black text-neutral-800 dark:text-neutral-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
