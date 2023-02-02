import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination:
        "https://play.google.com/store/apps/details?id=com.ffsense.homeworkout",
      permanent: false,
    },
  };
};

export default function Page() {
  return <></>;
}
