import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next|login|signup|reset-password|change-password|user|privacy-policy|app-privacy-policy|terms-of-service|contact|[\\w-]+\\.\\w+).*)",
  ],
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
