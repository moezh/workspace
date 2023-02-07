import Link from "next/link";
import Logo from "./Logo";
import DarkModeToggler from "./DarkModeToggler";
import User from "./User";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-center text-center pt-4 pb-2">
      <div className="w-1/2 flex flex-col items-start justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="w-1/2 flex flex-row items-end justify-end">
        <div className="ml-4">
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
