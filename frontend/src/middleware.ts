import { NextRequest, NextResponse } from "next/server";

export const config = {
  /*
   * Match all paths except for:
   * 1. /api routes
   * 2. /_next (Next.js internals)
   * 3. all root files inside /public (e.g. /favicon.ico)
   */
  matcher: ["/((?!api|_next|[\\w-]+\\.\\w+).*)"],
};

export default async function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");
  if (hostname !== null) {
    const domainparts = hostname.split(".");
    const subdomain = domainparts
      .slice(0, domainparts.length - 2)
      .reverse()
      .join("/");
    if (subdomain !== "") {
      const url = req.nextUrl;
      url.pathname = `/${subdomain}${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  return NextResponse.next();
}
