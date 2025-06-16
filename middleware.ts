// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware(async (auth, req) => {
  // Completely disable auth for all routes during development
  if (process.env.NODE_ENV === 'development') {
    return; // Skip all auth checks
  }

  // Production behavior (optional - can remove if you want all routes public)
  const isPublicRoute = [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api(.*)', // Allow all API routes
    '/uploadthing(.*)' // Explicitly allow UploadThing
  ].some(path => req.nextUrl.pathname.match(new RegExp(path)));

  if (!isPublicRoute) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.svg).*)'
  ]
};