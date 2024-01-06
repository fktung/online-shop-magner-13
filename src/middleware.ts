import { i18nRouter } from "next-i18n-router";
import { NextResponse, NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import i18nConfig from "./locales/i18nConfig";

function removeLocalePrefix(url: string): { prefix: string; locales: string } {
  const match = url.match(/^\/(\w{2})\//);
  if (match && i18nConfig.locales.includes(match[1])) {
    return { prefix: url.replace(match[0], "/"), locales: match[1] };
  }
  return { prefix: url, locales: i18nConfig.defaultLocale };
}

const prefixPathAuth = ["cart"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("_MToken")?.value;
  const path = request.nextUrl.pathname;
  let result = i18nRouter(request, i18nConfig);
  const pathName = removeLocalePrefix(path);
  const prefixPath = pathName.prefix.split("/").filter(Boolean)[0];
  if (!token && prefixPathAuth.includes(prefixPath)) {
    return NextResponse.redirect(
      new URL(`/login${path && "?path=" + path}`, request.url)
    );
  }
  if (request.nextUrl.basePath.startsWith("/product")) {
    result = NextResponse.redirect(new URL(`/products`, request.url));
  }
  createMiddleware(i18nConfig);
  return result;
}

// only applies this middleware to files in the app directory
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
