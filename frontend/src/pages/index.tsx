import { GetStaticProps } from "next";
import { readFileSync } from "fs";
import jwt from "jsonwebtoken";
import Link from "next/link";
import Image from "next/image";
import Head from "../components/Head";
import Header from "../components/Header";
import Icons from "../components/Icons";
import Logo from "../components/Logo";
import Github from "../components/Github";
import Footer from "../components/Footer";

export const getStaticProps: GetStaticProps = async (context) => {
  const password = readFileSync("/run/secrets/backend-password", {
    encoding: "utf8",
  });
  const result = await fetch("http://backend:3001/api/home/", {
    headers: {
      Authorization: `Bearer ${jwt.sign("admin", password)}`,
      "Content-Type": "application/json",
    },
  });
  const resultData = await result.json();
  return { props: { data: resultData } };
};

export default function Page(props: { data: any }) {
  return (
    <>
      <Head title={props.data.title} />
      <Header />
      <div className="w-full">
        <h1 className="font-medium text-xl uppercase font-serif text-center">
          {props.data.title}
        </h1>
        <div className="flex flex-row items-center justify-center pt-8">
          <div className="w-32 ml-4 mr-4">
            <Image
              src={props.data.profile_photo_url}
              alt={props.data.profile_name}
              width={200}
              height={200}
              className="w-32"
              priority
            />
          </div>
          <div className="flex flex-col items-start justify-start">
            <h1 className="font-medium uppercase text-left">
              {props.data.profile_name}
            </h1>
            <h2 className="text-left">{props.data.profile_job_title}</h2>
            <p className="font-light text-left">
              {props.data.profile_location}
            </p>
            <div className="w-full flex flex-row flex-wrap items-start justify-start pt-2">
              <div className="w-6 mr-6">
                <a target="_blank" href={`mailto:${props.data.contact_email}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-6 h-6"
                  >
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                  </svg>
                </a>
              </div>
              <div className="w-6 mr-6">
                <a
                  target="_blank"
                  href={`https://wa.me/${props.data.contact_whatapp}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-6 h-6 mx-auto"
                  >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                </a>
              </div>
              <div className="w-6 mr-6">
                <a target="_blank" href={props.data.contact_linkedin_url}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                    className="w-6 h-6 mx-auto"
                  >
                    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                  </svg>
                </a>
              </div>
              <div className="w-6 mr-6">
                <a target="_blank" href={props.data.contact_calendly_url}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-6 h-6 mx-auto"
                  >
                    <path d="M8 9.05a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2Zm10.798 11c-.453-1.27-1.76-3-4.798-3-3.037 0-4.345 1.73-4.798 3H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1.202Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4">{props.data.profile_summary}</p>
        c
        <p className="pt-4">{props.data.skills_summary}</p>
        <p className="font-medium pt-6 text-center">
          {props.data.skill_group1_title}:
        </p>
        <div className="w-full flex flex-row flex-wrap items-start justify-center pt-4">
          {props.data.skill_group1_summary
            .split(",")
            .map((skill: string, index: number) => (
              <div
                key={index}
                className="w-28 flex flex-col items-center justify-center ml-1 mr-1 mb-4"
              >
                <Icons name={skill} />
                <div className="pt-1">{skill}</div>
              </div>
            ))}
        </div>
        <p className="font-medium pt-6 text-center">
          {props.data.skill_group2_title}:
        </p>
        <div className="w-full flex flex-row flex-wrap items-start justify-center pt-4">
          {props.data.skill_group2_summary
            .split(",")
            .map((skill: string, index: number) => (
              <div
                key={index}
                className="w-28 flex flex-col items-center justify-center ml-1 mr-1 mb-4"
              >
                <Icons name={skill} />
                <div className="pt-1">{skill}</div>
              </div>
            ))}
        </div>
        <p className="font-medium pt-6 text-center">
          {props.data.skill_group3_title}:
        </p>
        <div className="w-full flex flex-row flex-wrap items-start justify-center pt-4">
          {props.data.skill_group3_summary
            .split(",")
            .map((skill: string, index: number) => (
              <div
                key={index}
                className="w-28 flex flex-col items-center justify-center ml-1 mr-1 mb-4"
              >
                <Icons name={skill} />
                <div className="pt-1">{skill}</div>
              </div>
            ))}
        </div>
        <p className="font-medium uppercase pt-8 text-center">
          {props.data.projects_title}
        </p>
        <p className="pt-4">{props.data.projects_summary}</p>
        <div className="w-full flex flex-row flex-wrap items-start justify-center pt-2">
          {props.data.projects
            .split(",")
            .map((project: string, index: number) => (
              <div
                key={index}
                className="w-1/2 flex flex-col items-center justify-start p-4"
              >
                <Link href={`https://${project}.${props.data.domain}`}>
                  <Logo project={project} />
                  <p className="font-light text-center">{`${project}.${props.data.domain}`}</p>
                </Link>
                <p className="pt-2">{props.data[`${project}_summary`]}</p>
              </div>
            ))}
        </div>
      </div>
      <div className="pt-6">
        <Github github_url={props.data.github_url} />
      </div>
      <Footer />
    </>
  );
}
