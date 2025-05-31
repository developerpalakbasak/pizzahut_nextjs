import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl;

  const pathname = url?.pathname || ""; // ✅ safe fallback

  // console.log("Token from middleware.js", token);

  // 🔒 Not logged in? Redirect to /signin
  if (!token) {
    if (pathname.startsWith("/account") || pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  // 🧾 Signed-in user tries to access /signin → redirect based on role
  if (pathname.startsWith("/signin") && token) {
    return NextResponse.redirect(
      new URL(token.role === "admin" ? "/admin" : "/account", req.url)
    );
  }

  // 🛑 Prevent non-admins from accessing /admin
  if (pathname.startsWith("/admin") && token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/cart/")) {
    if (!token) {
      const redirectUrl = url.clone();
      redirectUrl.pathname = "/signin";
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}
