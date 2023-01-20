import Link from "next/link";
import Logo from "./Logo";
import DarkModeToggler from "./DarkModeToggler";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-center text-center pt-4 pb-4 mb-2">
      <div className="w-1/2 flex flex-col items-start justify-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
      <div className="w-1/2 flex flex-col items-end justify-center">
        <DarkModeToggler />
      </div>
    </header>
  );
};

export default Header;
