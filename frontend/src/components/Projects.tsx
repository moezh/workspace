import { useState, useEffect } from "react";
import Link from "next/link";

const Projects = (props: { projects: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port;
  const domainparts = hostname.split(".");
  const domain = domainparts
    .slice(domainparts.length - 2, domainparts.length)
    .join(".");
  const workspaces = props.projects.split(",");
  return (
    <span>
        {workspaces.map((workspace, index) => (
            <span key={`${index}`}>
                <Link href={`${protocol}//${workspace}.${domain}:${port}`}>
                    {workspace}
                </Link>
                {index < workspaces.length - 1 ? <span className="px-1">|</span> : null}
            </span>
        ))}
    </span>
  );
};

export default Projects;