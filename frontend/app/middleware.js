import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  // Get the token from cookies (since localStorage is client-side only)
  // const token = request.cookies.get("token")?.value || "";

  // get the token from the local storage
  const token = localStorage.getItem("token");

  console.log(isPublicPath, token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl)); // Redirect to home/dashboard if already authenticated
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl)); // Redirect to login if not authenticated
  }

  return NextResponse.next(); // Allow the request to proceed
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
};
