import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import logoWhite from "../../public/logo_white.png";
import logoBlack from "../../public/logo_black.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Web Application</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
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
