import { useState, useEffect } from "react";
import { getDomain, getSubdomain } from "../utils/utils";
import Link from "next/link";

const Projects = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const host = window.location.hostname;
  const hostDomain = getDomain(host);
  const hostSubdomain = getSubdomain(host);
  const projects = ["", "blog", "store", "web3", "workout"];
  return (
    <div className="flex flex-row">
      {projects.map((project, index) => {
        return (
          <div key={`${index}`}>
            {project === "" ? (
              <Link
                href={project === hostSubdomain ? "/" : `https://${hostDomain}`}
              >
                Home
              </Link>
            ) : (
              <Link
                href={
                  project === hostSubdomain
                    ? "/"
                    : `https://${project}.${hostDomain}`
                }
              >
                {project}
              </Link>
            )}
            {index < projects.length - 1 ? (
              <span className="mr-1"> | </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
