import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggler from "./DarkModeToggler";
import CurrentProject from "./CurrentProject";
import Projects from "./Projects";

import logoWhite from "../../public/logo_white.png";
import logoBlack from "../../public/logo_black.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
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
      <div className="sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg mx-auto">
        <header className="flex flex-row items-center justify-center text-center p-4">
          <div className="w-1/2 flex flex-col items-start justify-center">
            <Link href="/">
              <div className="flex flex-row items-start justify-center">
                <div className="block dark:hidden">
                  <Image
                    src={logoBlack}
                    alt="Logo Black"
                    width={870}
                    height={372}
                    className="h-[35px] w-auto"
                    priority
                  />
                </div>
                <div className="hidden dark:block">
                  <Image
                    src={logoWhite}
                    alt="Logo White"
                    width={870}
                    height={372}
                    className="h-[35px] w-auto"
                    priority
                  />
                </div>
                <div className="text-xl font-semibold tracking-wider pt-[13px] ml-2 capitalize">
                  <CurrentProject />
                </div>
              </div>
            </Link>
          </div>
          <div className="w-1/2 flex flex-col items-end justify-center">
            <DarkModeToggler />
          </div>
        </header>
        <main className="flex flex-col items-center justify-center text-justify p-4">
          {children}
        </main>
        <footer className="flex flex-col items-center justify-center text-center font-light font-sans p-4 mt-8">
          <div>
            <a target="_blank" href="https://github.com/moezh/workspace">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="w-8 h-8 mx-auto"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <p className="font-extralight">
                Code source is available at GitHub
              </p>
            </a>
          </div>
          <div className="pt-6 capitalize">
            <Projects />
          </div>
          <div>
            <Link href="../contact-mh">Contact</Link>
            <span className="ml-1 mr-1">|</span>
            <Link href="../privacy-policy">Privacy Policy</Link>
            <span className="ml-1 mr-1">|</span>
            <Link href="../terms-of-service">Terms of Service</Link>
          </div>
          <div>Copyright © {new Date().getFullYear()} - All right reserved</div>
        </footer>
      </div>
    </>
  );
}
