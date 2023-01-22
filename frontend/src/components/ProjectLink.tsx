import Link from "next/link";
import { useState, useEffect } from "react";

const ProjectLink = (props: { project?: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const domainparts = hostname.split(".");
  const domain = domainparts
    .slice(domainparts.length - 2, domainparts.length)
    .join(".");
  if (props.project === undefined) {
    return <Link href={`${protocol}//${domain}`}>{`${domain} →`}</Link>;
  } else {
    return (
      <Link href={`${protocol}//${props.project}.${domain}`}>
        <p className="p-1">{`${props.project}.${domain} →`}</p>
      </Link>
    );
  }
};

export default ProjectLink;