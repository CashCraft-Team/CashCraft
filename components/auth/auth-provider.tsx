"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { sessionManager, type SessionData } from "@/lib/session"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  points: number
  badges: string[]
  role: "user" | "admin"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  refreshSession: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize session from storage
  const initializeSession = useCallback(() => {
    try {
      const session = sessionManager.getSession()
      if (session) {
        setUser(session.user)
        sessionManager.updateActivity()
      }
    } catch (error) {
      console.error("Failed to initialize session:", error)
      sessionManager.clearSession()
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Refresh session data
  const refreshSession = useCallback(() => {
    const session = sessionManager.getSession()
    if (session) {
      setUser(session.user)
      sessionManager.updateActivity()
    } else {
      setUser(null)
    }
  }, [])

  // Listen for session changes
  useEffect(() => {
    const unsubscribe = sessionManager.addListener((session: SessionData | null) => {
      setUser(session?.user || null)
    })

    return unsubscribe
  }, [])

  // Initialize on mount
  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  // Update activity on user interaction
  useEffect(() => {
    if (!user) return

    const updateActivity = () => {
      sessionManager.updateActivity()
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    events.forEach((event) => {
      document.addEventListener(event, updateActivity, { passive: true })
    })

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, updateActivity)
      })
    }
  }, [user])

  // Periodic session validation
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      const session = sessionManager.getSession()
      if (!session) {
        setUser(null)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [user])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      let mockUser: User

      // Check for admin account
      if (email === "admin@cashcraft.com") {
        mockUser = {
          id: "admin",
          name: "مدير النظام",
          email,
          level: 10,
          points: 0,
          badges: ["admin"],
          role: "admin",
        }
      } else {
        // Mock successful login for regular users
        mockUser = {
          id: Date.now().toString(),
          name: "أحمد محمد",
          email,
          level: 3,
          points: 1250,
          badges: ["first-budget", "savings-goal"],
          role: "user",
        }
      }

      // Try to set session with error handling
      try {
        sessionManager.setSession(mockUser)
        setUser(mockUser)
        return true
      } catch (sessionError) {
        console.error("Session creation failed:", sessionError)
        // Fallback: set user without persistent session
        setUser(mockUser)
        return true
      }
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        level: 1,
        points: 0,
        badges: [],
        role: "user",
      }

      sessionManager.setSession(mockUser)
      setUser(mockUser)
      return true
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = useCallback(() => {
    sessionManager.clearSession()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, refreshSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
