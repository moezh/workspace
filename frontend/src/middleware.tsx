import { NextRequest, NextResponse } from "next/server";
import { getSubdomain } from "./utils/utils";

export const config = {
  /*
   * Match all paths except for:
   * 1. /_next (Next.js internals)
   * 2. all global pages (e.g. privacy-policy, terms-of-service, contact-me ...)
   * 3. all root files inside /public (e.g. /favicon.ico)
   */
  matcher: [
    "/((?!_next|privacy-policy|terms-of-service|contact-mh|[\\w-]+\\.\\w+).*)",
  ],
};

export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");
  if (hostname !== null) {
    const subdomain = getSubdomain(hostname);
    if (subdomain !== "") {
      const url = req.nextUrl;
      url.pathname = `/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}
