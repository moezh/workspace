import Image from "next/image";
import googlePlayBadge from "../../public/google-play-badge.png";

const GooglePlay = (props: { url: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <a target="_blank" href={props.url}>
        <Image
          src={googlePlayBadge}
          alt="Get it on Google Play"
          width={646}
          height={250}
          className="h-[60px] w-auto"
          quality={100}
          priority
        />
      </a>
    </div>
  );
};

export default GooglePlay;
