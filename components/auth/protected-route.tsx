"use client"

import type React from "react"
import { useRouteGuard } from "@/hooks/use-route-guard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  allowedRoles?: string[]
  fallback?: React.ReactNode
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  allowedRoles = [],
  fallback,
}: ProtectedRouteProps) {
  const { isChecking } = useRouteGuard({
    requireAuth,
    requireAdmin,
    allowedRoles,
  })

  if (isChecking) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      )
    )
  }

  return <>{children}</>
}
