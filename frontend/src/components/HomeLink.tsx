import Link from "next/link";
import { useState, useEffect } from "react";

const HomeLink = () => {
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
  return <Link href={`${protocol}//${domain}:${port}`}>{domain}</Link>;
};

export default HomeLink;
