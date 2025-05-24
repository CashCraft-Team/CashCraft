"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { sessionManager } from "@/lib/session"

export function SessionRecovery() {
  const { refreshSession } = useAuth()

  useEffect(() => {
    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible, check session validity
        const session = sessionManager.getSession()
        if (session) {
          refreshSession()
        }
      }
    }

    // Handle storage events (for cross-tab synchronization)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cash-craft-session" || e.key === null) {
        refreshSession()
      }
    }

    // Handle online/offline events
    const handleOnline = () => {
      refreshSession()
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("online", handleOnline)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("online", handleOnline)
    }
  }, [refreshSession])

  return null
}
