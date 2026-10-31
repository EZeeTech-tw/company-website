import { NextResponse, type NextRequest } from 'next/server';
export default function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const english = /^\/en(?:\/|$)/.test(request.nextUrl.pathname);
  headers.set('X-NEXT-INTL-LOCALE', english ? 'en' : 'zh');
  // Locale routing uses next.config rewrites to avoid Next 16's loopback proxy loop.
  return NextResponse.next({request: {headers}});
}
export const config = { matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'] };
