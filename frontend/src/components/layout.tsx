import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import logoWhite from "../../public/mh_logo_white.png";
import logoBlack from "../../public/mh_logo_black.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Web Application</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto pl-2 pr-2">
        <header className="flex flex-col items-center justify-center pt-4 pb-4">
          <Link href="/">
            <div className="block dark:hidden">
              <Image src={logoBlack} alt="Logo Black" height={50} priority />
            </div>
            <div className="hidden dark:block">
              <Image src={logoWhite} alt="Logo White" height={50} priority />
            </div>
          </Link>
        </header>
        <main className="flex flex-col items-center justify-center pt-2 pb-2">
          {children}
        </main>
        <footer className="flex flex-col items-center justify-center pt-4 pb-4 font-light">
          <div className="font-light">
            Copyright © {new Date().getFullYear()} - All right reserved
          </div>
        </footer>
      </div>
    </>
  );
}
