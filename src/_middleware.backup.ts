import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("_MToken")?.value;
  const path = request.nextUrl.pathname;
  // console.log(request); // token ketika ada perubahan tidak berubah
  if (!token) {
    NextResponse.redirect(
      new URL(`/login${path && "?path=" + path}`, request.url)
    );
  }
  if (request.nextUrl.basePath.startsWith("/product")) {
    NextResponse.redirect(new URL(`/products`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
    "/cart/:path*",
    "/membership/:path*",
    "/balance/:path*",
    "/checkout/:path*",
  ],
};
