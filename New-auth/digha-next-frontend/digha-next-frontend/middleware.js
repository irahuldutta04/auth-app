

// src/middleware.js
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';  // Import the getToken function to handle token extraction

export async function middleware(req) {
  console.log("Middleware triggered");

  // Try to get the session token from cookies
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Log token and cookies for debugging
  console.log('Token from cookies:', token);
  console.log('Request cookies:', req.cookies);

  // Define the paths that require authentication
  const isPublicPath = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/registration' || req.nextUrl.pathname === '/profile';

  // If the user is trying to access a protected route but is not authenticated
  if (!token && !isPublicPath) {
    console.log('Redirecting to login due to unauthenticated user');
    // Redirect to the login page if not authenticated
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // If the user is authenticated and is on the login/registration page, redirect to dashboard
  if (token && isPublicPath) {
    console.log('Redirecting to dashboard because user is authenticated');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If everything is fine, allow the request to proceed
  console.log('Request allowed to proceed');
  return NextResponse.next();
}

export const config = {
  matcher: [ '/dashboard', '/login', '/registration', '/profile'], // List all the paths you want to protect
};


