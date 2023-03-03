import Link from "next/link";
import Logo from "./Logo";
import DarkModeToggler from "./DarkModeToggler";
import User from "./User";

const Header = () => {
  return (
    <header className="flex flex-row items-end justify-center text-center pt-4 pb-2">
      <div className="w-2/3 flex flex-col items-start justify-end">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="w-1/3 flex flex-row items-end justify-end">
        <div className="">
          <DarkModeToggler />
        </div>
        <div className="ml-4">
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
