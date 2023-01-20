import { useState, useEffect } from "react";

const CurrentProject = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const hostname = window.location.hostname;
  const domainparts = hostname.split(".");
  const subdomain = domainparts
    .slice(0, domainparts.length - 2)
    .reverse()
    .join(".");
  return <>{subdomain}</>;
};

export default CurrentProject;
