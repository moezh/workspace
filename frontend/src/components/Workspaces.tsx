import { useState, useEffect } from "react";
import { getDomain, getSubdomain } from "../utils/utils";
import Link from "next/link";

const OtherWorkspaces = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  const host = window.location.hostname;
  const hostDomain = getDomain(host);
  const hostSubdomain = getSubdomain(host);
  const workspaces = ["", "blog"];
  return (
    <div className="flex flex-row">
      {workspaces.map((workspace, index) => {
        return (
          <div key={`${index}`}>
            {workspace === "" ? (
              <Link
                href={
                  workspace === hostSubdomain ? "/" : `https://${hostDomain}`
                }
                className={
                  workspace === hostSubdomain ? "font-normal" : "font-light"
                }
              >
                home
              </Link>
            ) : (
              <Link
                href={
                  workspace === hostSubdomain
                    ? "/"
                    : `https://${workspace}.${hostDomain}`
                }
                className={
                  workspace === hostSubdomain ? "font-normal" : "font-light"
                }
              >
                {workspace}
              </Link>
            )}
            {index < workspaces.length - 1 ? (
              <span className="mr-1">,</span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default OtherWorkspaces;
