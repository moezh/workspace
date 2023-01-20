import Link from "next/link";
import Image from "next/image";
import CurrentProject from "./CurrentProject";
import DarkModeToggler from "./DarkModeToggler";

const Header = (props: { logo_black: string; logo_white: string }) => {
  return (
    <header className="flex flex-row items-center justify-center text-center pt-4 pb-4">
      <div className="w-1/2 flex flex-col items-start justify-center">
        <Link href="/">
          <div className="flex flex-row items-start justify-center">
            <div className="block dark:hidden">
              <Image
                src={props.logo_black}
                alt="Logo Black"
                width={870}
                height={372}
                className="h-[35px] w-auto"
                priority
              />
            </div>
            <div className="hidden dark:block">
              <Image
                src={props.logo_white}
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
  );
};

export default Header;
