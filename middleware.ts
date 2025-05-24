import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Allow public routes
  const publicRoutes = ["/auth/login", "/auth/register", "/"]
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for session cookie
  const sessionCookie = request.cookies.get("cash-craft-session")

  if (!sessionCookie) {
    // No session, redirect to login
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    // Validate session cookie with Unicode support
    let sessionData
    try {
      // Try URI decoding first
      const decodedValue = decodeURIComponent(sessionCookie.value)
      sessionData = JSON.parse(decodedValue)
    } catch (decodeError) {
      // Fallback: try direct JSON parse
      sessionData = JSON.parse(sessionCookie.value)
    }

    const now = Date.now()

    // Check if session data is valid
    if (!sessionData || !sessionData.user || !sessionData.expiresAt) {
      throw new Error("Invalid session data structure")
    }

    if (sessionData.expiresAt <= now) {
      // Session expired, redirect to login
      const response = NextResponse.redirect(new URL("/auth/login", request.url))
      response.cookies.delete("cash-craft-session")
      return response
    }

    // Check admin routes
    if (pathname.startsWith("/admin") && sessionData.user.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error("Session validation failed:", error)
    // Invalid session cookie, redirect to login and clean up
    const response = NextResponse.redirect(new URL("/auth/login", request.url))
    response.cookies.delete("cash-craft-session")
    return response
  }
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
