import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value
    const role = request.cookies.get('user-role')?.value
    const { pathname } = request.nextUrl

    // Protect dashboard routes
    const isDashboardRoute = pathname.startsWith('/client-dashboard') ||
        pathname.startsWith('/lawyer-dashboard') ||
        pathname.startsWith('/admin-dashboard')

    if (isDashboardRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Role-based route protection
    if (token && role) {
        if (pathname.startsWith('/client-dashboard') && role !== 'client') {
            return NextResponse.redirect(new URL(`/${role}-dashboard`, request.url))
        }
        if (pathname.startsWith('/lawyer-dashboard') && role !== 'advocate') {
            return NextResponse.redirect(new URL(`/${role === 'advocate' ? 'lawyer' : role}-dashboard`, request.url))
        }
        // Simple mapping since advocate uses lawyer-dashboard
        const roleDashboardMap: Record<string, string> = {
            'client': '/client-dashboard',
            'advocate': '/lawyer-dashboard',
            'admin': '/admin-dashboard'
        }

        if (pathname.startsWith('/admin-dashboard') && role !== 'admin') {
            return NextResponse.redirect(new URL(roleDashboardMap[role] || '/login', request.url))
        }

        // Redirect authenticated users trying to access login page
        if (pathname === '/login') {
            if (role === 'client') return NextResponse.redirect(new URL('/client-dashboard', request.url))
            if (role === 'advocate') return NextResponse.redirect(new URL('/lawyer-dashboard', request.url))
            if (role === 'admin') return NextResponse.redirect(new URL('/admin-dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/client-dashboard/:path*', '/lawyer-dashboard/:path*', '/admin-dashboard/:path*', '/login'],
}
