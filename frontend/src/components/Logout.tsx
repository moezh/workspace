import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

const Logout = (props: { text?: string }) => {
  const router = useRouter();
  const { data, setData } = useUserContext();

  const handleLogout = () => {
    router.push("/");
    setData({ ...data, userData: undefined });
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !data.userData?.email) return null;

  return (
    <button onClick={handleLogout}>
      <p className="capitalize py-2">Logout →</p>
    </button>
  );
};

export default Logout;
