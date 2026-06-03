import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const protectedRoutes = ["/dashboard"];
  const adminProtectedRoutes = ["/admin/dashboard"];

  const isProtectedRoute = protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));
  const isAdminProtectedRoute = adminProtectedRoutes.some(route => req.nextUrl.pathname.startsWith(route));

  // Get user_data from cookies directly using Edge-compatible API
  const userDataCookie = req.cookies.get("user_data")?.value;
  let session = null;
  if (userDataCookie) {
    try {
      session = JSON.parse(userDataCookie);
    } catch (e) {
      session = null;
    }
  }

  if (isProtectedRoute) {
    if (!session || !session.access_token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (isAdminProtectedRoute) {
    if (!session || !session.access_token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const token = session.access_token;
    try {
      const response = await fetch(`${process.env.BACKEND_AUTH_SERVER_URL}/api/v1/user/admin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}