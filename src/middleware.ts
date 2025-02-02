import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    try {
        const sessionToken = request.cookies.get('sessionToken');

        if (!sessionToken) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        if (request.nextUrl.pathname.startsWith('/auth')) {
            return NextResponse.next();
        }

        config.matcher.forEach((path) => {
            if (!request.nextUrl.pathname.startsWith(path)) {
                return NextResponse.redirect(new URL('/home', request.url));
            }
        });

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

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
}

export const config = {
    matcher: ['/', '/home', '/profile', '/post-detail', '/friend-suggestion', '/message'],
};
