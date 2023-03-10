import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const GoBack = (props: { text?: string }) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <button
      type="button"
      onClick={() => router.back()}
      hidden={!(window?.history?.length > 2)}
    >
      {props.text !== undefined ? (
        props.text
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7s"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </svg>
      )}
    </button>
  );
};

export default GoBack;
