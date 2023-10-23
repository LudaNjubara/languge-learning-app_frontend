
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ALLOWED_URLS } from './lib/constants/consts';

export function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const isAllowedUrl = ALLOWED_URLS.includes(url.pathname);
    const token = request.cookies.get("token")?.value;

    if (!isAllowedUrl) {
        if (!token) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    } else {
        if (token && url.pathname === "/login") {
            const referer = request.headers.get("referer");
            console.log("referer", referer);

            return NextResponse.redirect(new URL(referer || "/", request.url));

        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}