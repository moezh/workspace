import Head from "../../../components/Head";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import GoBack from "../../../components/GoBack";
import { useUserContext } from "../../../context/UserContext";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const { data, setData } = useUserContext();

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
  if (!data.workoutData?.currentProgram) return null;

  return (
    <>
      <Head
        title={`${data.workoutData?.currentProgram?.name} - Day ${data.workoutData?.currentProgram?.currentDay}`}
        description={data.workoutData?.currentProgram?.description}
      />
      <Header />
      <div className="w-full pt-4">
        <div className="flex flex-row items-start justify-start">
          <div className="w-[60px]">
            <GoBack />
          </div>
          <div className="flex-grow">
            <h1 className="w-full text-xl uppercase font-serif text-center">
              {`${data.workoutData?.currentProgram?.name}`}
            </h1>
            <p className="w-full pt-1 text-center">
              Day {data.workoutData?.currentProgram?.currentDay}
            </p>
          </div>
          <div className="w-[60px]"></div>
        </div>
        <div className="pt-8">
          <div className="mb-4 h-[350px] w-full rounded-sm">
            <Link href={`/programs/${data.workoutData?.currentProgram?.id}`}>
              <Image
                src={`${data.workoutData?.bucket_url}${data.workoutData?.currentProgram?.id}.jpg`}
                alt={data.workoutData?.currentProgram?.name}
                width={400}
                height={300}
                className="rounded-sm h-[350px] w-full"
                style={{ objectFit: "cover", objectPosition: "50% 35%" }}
                quality={100}
                priority
              />
              <div className="relative flex flex-row items-start justify-start w-full -top-[350px] h-[350px] bg-black bg-opacity-30 text-white rounded-sm pl-4 pt-4">
                <div className="w-grow flex flex-col items-start justify-start">
                  <p className="font-light">
                    {data.workoutData?.currentProgram?.goal}
                  </p>
                  <p className="uppercase font-serif pt-1">
                    {data.workoutData?.currentProgram?.name}
                  </p>
                  <div className="flex flex-row items-center justify-start pt-1">
                    <div className="font-light mr-2">
                      Progress:{" "}
                      {Math.floor(
                        ((data.workoutData?.currentProgram?.currentDay - 1) /
                          (data.workoutData?.currentProgram?.total_weeks *
                            data.workoutData?.dayPerWeeks)) *
                          100
                      )}
                      %
                    </div>
                  </div>
                  <p className="font-light pt-2">
                    {data.workoutData?.currentProgram?.description}
                  </p>
                </div>
                <div className="w-[125px] flex flex-col items-end justify-center pt-8">
                  <div className="flex flex-col items-center justify-center w-[100px] bg-black bg-opacity-50 text-white rounded-l-sm py-1 px-2">
                    Day {data.workoutData?.currentProgram?.currentDay}
                  </div>
                </div>
              </div>
              <div className="relative w-full h-[80px] -top-[430px] flex flex-row items-start justify-start px-4">
                <div className="flex flex-col items-start justify-start text-white w-1/2">
                  <div className="capitalize">
                    {data.workoutData?.currentProgram?.total_weeks}-Week
                  </div>
                  <div className="font-light pt-1">
                    {data.workoutData?.dayPerWeeks} Days/Week
                  </div>
                </div>
                <div className="flex flex-col items-end justify-start text-white w-1/2">
                  <div className="capitalize">{data.workoutData?.level}</div>
                  <div className="font-light pt-1">Fitness Level</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
