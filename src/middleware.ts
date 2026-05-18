import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

    // Skip session check for non-auth/non-dashboard routes to save resources
    if (!isDashboardRoute && !isAuthRoute) {
        return NextResponse.next();
    }

    // Check for both HTTP and HTTPS (Secure) session cookies used by Better Auth
    const sessionToken = 
        request.cookies.get("better-auth.session_token") || 
        request.cookies.get("__Secure-better-auth.session_token") ||
        request.cookies.get("__secure-better-auth.session_token");

    const hasSession = !!sessionToken;

    if (isDashboardRoute && !hasSession) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (isAuthRoute && hasSession) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

