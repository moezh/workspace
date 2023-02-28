import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import { useRouter } from "next/router";
import GoBack from "../components/GoBack";

export default function Page() {
  const router = useRouter();

  const { data, setData } = useUserContext();

  const handleLogout = () => {
    setData({});
    router.push("/");
  };

  return (
    <>
      <Head
        title="Settings"
        description={`${data?.firstName} ${data?.lastName}'s settings`}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/3">
            <GoBack />
          </div>
          <div className="w-1/3">
            <h1 className="text-xl uppercase font-serif text-center">
              Settings
            </h1>
          </div>
        </div>
        <div className="w-[280px] mx-auto py-8">
          <div className="flex flex-col items-center justify-start">
            <p className="text-lg uppercase font-serif pb-2">
              {data?.firstName} {data?.lastName}
            </p>
            <p className="pt-1">{data?.email}</p>
            {data.email !== undefined ? (
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="mt-6"
              >
                <p className="capitalize py-2">Logout →</p>
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
