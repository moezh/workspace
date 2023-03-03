import Head from "../components/Head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useUserContext } from "../context/UserContext";
import GoBack from "../components/GoBack";
import Logout from "../components/Logout";

export default function Page() {
  const { data, setData } = useUserContext();

  return (
    <>
      <Head
        title="User Profile"
        description={`${data.userData?.firstName || "Anonymous"} ${
          data.userData?.lastName || "User"
        }'s profile`}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="text-xl uppercase font-serif text-center">
              User Profile
            </h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="w-[280px] mx-auto py-8">
          <div className="flex flex-col items-center justify-start">
            <p className="text-lg uppercase font-serif pb-2">
              {data.userData?.firstName} {data.userData?.lastName}
            </p>
            <p className="pt-1">
              {data.userData?.email || "You are not logged in!"}
            </p>
            <div className="pt-4">
              <Logout />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
