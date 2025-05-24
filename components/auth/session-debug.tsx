"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { sessionManager } from "@/lib/session"
import { useEffect, useState } from "react"

export function SessionDebug() {
  const { user } = useAuth()
  const [sessionInfo, setSessionInfo] = useState<any>(null)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const session = sessionManager.getSession()
      setSessionInfo(session)
    }
  }, [user])

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-2 rounded text-xs max-w-xs z-50">
      <div>User: {user?.name || "None"}</div>
      <div>Role: {user?.role || "None"}</div>
      <div>Session: {sessionInfo ? "Valid" : "Invalid"}</div>
      {sessionInfo && <div>Expires: {new Date(sessionInfo.expiresAt).toLocaleString()}</div>}
    </div>
  )
}
