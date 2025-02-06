import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get('sessionToken')?.value;

        if (!sessionToken) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        if (request.nextUrl.pathname.startsWith('/auth')) {
            return NextResponse.next();
        }

        const isProtectedRoute = config.matcher.some((path) => request.nextUrl.pathname.startsWith(path));

        if (isProtectedRoute) {
            const response = await fetch('http://localhost:8080/auth/check-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sessionToken }),
            });

            if (response.status !== 200) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
            }
        }
        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: ['/', '/home', '/profile', '/search', '/friend-suggestion', '/message'],
};
