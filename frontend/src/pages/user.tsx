import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import GoBack from "../components/GoBack";

export default function Page() {
  const router = useRouter();

  const { data, setData } = useUserContext();

  const handleLogout = () => {
    setData({ ...data, isLogged: false });
    router.push("/");
  };

  useEffect(() => {
    if (data?.isLogged === false) router.push("/login");
  }, []);

  return (
    <>
      <Head
        title="User Profile"
        description={`${data?.firstName} ${data?.lastName}`}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/3">
            <GoBack />
          </div>
          <div className="w-1/3">
            <h1 className="font-medium text-xl uppercase font-serif text-center">
              User Profile
            </h1>
          </div>
        </div>
        <div className="w-[280px] mx-auto py-8">
          <div className="flex flex-col items-center justify-start">
            <p className="font-medium uppercase">
              {data?.firstName} {data?.lastName}
            </p>
            <p className="pt-1">{data?.email}</p>
            <button onClick={handleLogout} aria-label="Logout" className="mt-6">
              <p className="capitalize py-2">Logout →</p>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
