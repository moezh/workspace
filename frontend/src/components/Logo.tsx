import Image from "next/image";
import logoBlack from "../../public/logo_black.png";
import logoWhite from "../../public/logo_white.png";
import CurrentProject from "./CurrentProject";

const Logo = (props: {project?: string;}) => {
  return (
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
        {props.project !== undefined ? props.project : <CurrentProject />}
      </div>
    </div>
  );
};

export default Logo;
