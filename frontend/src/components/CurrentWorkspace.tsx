import { useState, useEffect } from "react";
import { getSubdomain } from "../utils/utils";

const CurrentWorkspace = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const currentWorkspace = getSubdomain(window.location.hostname);
  return <>{currentWorkspace}</>;
};

export default CurrentWorkspace;
