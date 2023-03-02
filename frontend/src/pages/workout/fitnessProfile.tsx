import Head from "../../components/Head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import GoBack from "../../components/GoBack";

export default function Page() {
  return (
    <>
      <Head title="Fitness Profile" description="" />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-1/4">
            <GoBack />
          </div>
          <div className="w-2/4">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              Fitness Profile
            </h1>
          </div>
        </div>
        <div className="pt-8"></div>
      </div>
      <Footer />
    </>
  );
}
