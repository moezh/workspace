import { useState, useEffect } from "react";
import { getSubdomain } from "../utils/utils";

const CurrentProject = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const currentProject = getSubdomain(window.location.hostname);
  return <>{currentProject}</>;
};

export default CurrentProject;
