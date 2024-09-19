import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const authPaths = ['/login', '/register']
const privatePaths = ['/cart']
const adminPaths = ['/admin']

export default function middleware(request: NextRequest) {
    const token = cookies().get('token')
    const isAdmin: boolean = false
    const { pathname } = request.nextUrl

    // Kiểm tra isAdmin để trả về admin
    if (pathname == '/' && isAdmin) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }
    // Đăng nhập rồi thì không cho vào login/register nữa
    if (authPaths.some((path) => pathname.startsWith(path)) && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // Chưa đăng nhập thì không cho vào private 
    if (privatePaths.some((path) => pathname.startsWith(path) || adminPaths.some((path) => pathname.startsWith(path))) && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    // Không phải admin thì trả về trang home 
    if (adminPaths.some((path) => pathname.startsWith(path)) && !isAdmin) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/login', '/register', '/cart', '/admin/:path*'],
}
