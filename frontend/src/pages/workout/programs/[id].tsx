import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";

export default function Page() {
  /*const resetProgress = () => {
    if (confirm("This will reset your progress for your personal program!")) {
      if (data.workoutData?.currentProgram) {
        setData({
          ...data,
          workoutData: {
            ...data.workoutData,
            currentProgram: {
              ...data.workoutData.currentProgram,
              currentDay: 1,
            },
          },
        });
      }
    }
  };*/
  return (
    <>
      <Head title="" description="" />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center"></h1>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="pt-8"></div>
      </div>
      <Footer />
    </>
  );
}
