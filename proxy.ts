// src/proxy.ts
import { NextResponse, type NextRequest } from 'next/server';
import { getCookie, setCookie, deleteCookie, hasCookie } from 'cookies-next/server';

// The function is still named 'middleware' internally for compatibility with the package
export async function proxy(request: NextRequest) {
  // Read cookies from the incoming request
  //const token = getCookie('auth_token', { req: request });
  const token = request.cookies.get('auth_token')?.value;
  //console.log('Token in proxy:', token);

  const response = NextResponse.next();

  // Set or update a cookie on the response
  // if (!token) {
  //   setCookie('session_id', 'some-long-session-value', { 
  //     req: request, 
  //     res: response, 
  //     maxAge: 60 * 60 * 24 // 1 day
  //   });
  // }

  // Check if a cookie exists
  // const hasSession = hasCookie('session_id', { req: request, res: response });
  // console.log('Has session:', hasSession);

  // // Example: Protect a route
  // if (!token && request.nextUrl.pathname.startsWith('/protected')) {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  if (request.nextUrl.pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // To delete a cookie:
  // deleteCookie('old_cookie', { req: request, res: response });

  return NextResponse.next();
}

// Configuration for which paths the proxy should run on
export const config = {
  // The matcher is the same as previous Next.js versions
 // matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
 matcher: ['/dashboard/:path*'],
};
