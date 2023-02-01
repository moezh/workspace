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
          className="h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </button>
  );
};

export default GoBack;
