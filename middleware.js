import { NextResponse } from 'next/server';

const protectedPaths = ['/admin'];
const publicPaths = ['/admin/login'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!isProtected || isPublic) {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get('admin-auth')?.value;

  if (!sessionCookie) {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
