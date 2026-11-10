import { NextResponse, type NextRequest } from 'next/server';
export default function proxy(request: NextRequest) {
  // New visitors enter the English site. An explicit Chinese choice is remembered.
  if (request.nextUrl.pathname === '/' && request.cookies.get('site-language')?.value !== 'zh') {
    const destination = request.nextUrl.clone();
    destination.pathname = '/en';
    return NextResponse.redirect(destination, 307);
  }
  const headers = new Headers(request.headers);
  const english = /^\/en(?:\/|$)/.test(request.nextUrl.pathname);
  headers.set('X-NEXT-INTL-LOCALE', english ? 'en' : 'zh');
  // Locale routing uses next.config rewrites to avoid Next 16's loopback proxy loop.
  return NextResponse.next({request: {headers}});
}
export const config = { matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'] };
