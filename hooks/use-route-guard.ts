"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

interface RouteGuardOptions {
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
  allowedRoles?: string[]
}

export function useRouteGuard(options: RouteGuardOptions = {}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [isChecking, setIsChecking] = useState(true)

  const { requireAuth = true, requireAdmin = false, redirectTo, allowedRoles = [] } = options

  useEffect(() => {
    // Don't check while auth is still loading
    if (isLoading) {
      return
    }

    setIsChecking(true)

    // Determine redirect destination
    let redirectPath = redirectTo

    if (!redirectPath) {
      if (!user && requireAuth) {
        redirectPath = "/auth/login"
      } else if (user && !requireAuth && (pathname === "/auth/login" || pathname === "/auth/register")) {
        redirectPath = user.role === "admin" ? "/admin" : "/dashboard"
      } else if (user && requireAdmin && user.role !== "admin") {
        redirectPath = "/dashboard"
      } else if (user && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
        redirectPath = user.role === "admin" ? "/admin" : "/dashboard"
      }
    }

    // Perform redirect if needed
    if (redirectPath && redirectPath !== pathname) {
      router.replace(redirectPath)
    } else {
      setIsChecking(false)
    }
  }, [user, isLoading, pathname, requireAuth, requireAdmin, redirectTo, allowedRoles, router])

  return {
    isChecking: isLoading || isChecking,
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  }
}
