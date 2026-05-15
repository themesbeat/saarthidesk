import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "better-auth/types";

export async function middleware(request: NextRequest) {
    const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
    const isAuthRoute = request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/register');

    // Skip session check for non-auth/non-dashboard routes to save resources
    if (!isDashboardRoute && !isAuthRoute) {
        return NextResponse.next();
    }

    try {
        const { data: session, error } = await betterFetch<Session>(
            "/api/auth/get-session",
            {
                baseURL: process.env.BETTER_AUTH_URL || request.nextUrl.origin,
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            },
        );

        if (error) {
            console.error("[Middleware] Session fetch error:", error);
        }

        if (isDashboardRoute && !session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        if (isAuthRoute && session) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    } catch (err) {
        console.error("[Middleware] Fatal error in middleware:", err);
        // In case of error, we can either block (secure) or allow (fail-open)
        // For now, let's allow but log the error to avoid blocking the user
        if (isDashboardRoute) {
            // If it's a dashboard route and we can't verify session, better to redirect to login
            console.warn("[Middleware] Redirecting to login due to middleware error");
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

