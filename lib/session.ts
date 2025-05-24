import type { User } from "@/components/auth/auth-provider"
import { safeJsonStringify, safeJsonParse } from "./encoding"

const SESSION_COOKIE_NAME = "cash-craft-session"
const SESSION_EXPIRY_DAYS = 7

export interface SessionData {
  user: User
  expiresAt: number
  lastActivity: number
}

export class SessionManager {
  private static instance: SessionManager
  private sessionData: SessionData | null = null
  private listeners: Set<(session: SessionData | null) => void> = new Set()

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  // Set session with cookie and memory storage
  setSession(user: User): void {
    const expiresAt = Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    const sessionData: SessionData = {
      user,
      expiresAt,
      lastActivity: Date.now(),
    }

    this.sessionData = sessionData
    this.setCookie(sessionData)
    this.notifyListeners(sessionData)
  }

  // Get current session
  getSession(): SessionData | null {
    // First check memory
    if (this.sessionData && this.isSessionValid(this.sessionData)) {
      return this.sessionData
    }

    // Then check cookie
    const cookieSession = this.getCookieSession()
    if (cookieSession && this.isSessionValid(cookieSession)) {
      this.sessionData = cookieSession
      return cookieSession
    }

    // No valid session found
    this.clearSession()
    return null
  }

  // Clear session
  clearSession(): void {
    this.sessionData = null
    this.deleteCookie()
    this.notifyListeners(null)
  }

  // Update last activity
  updateActivity(): void {
    const session = this.getSession()
    if (session) {
      session.lastActivity = Date.now()
      this.setCookie(session)
    }
  }

  // Check if session is valid
  private isSessionValid(session: SessionData): boolean {
    const now = Date.now()
    return session.expiresAt > now && now - session.lastActivity < 24 * 60 * 60 * 1000 // 24 hours max inactivity
  }

  // Cookie management with Unicode support
  private setCookie(sessionData: SessionData): void {
    if (typeof document === "undefined") return

    try {
      // Use safe JSON stringify + URI encoding for Unicode support
      const jsonString = safeJsonStringify(sessionData)
      const cookieValue = encodeURIComponent(jsonString)
      const expires = new Date(sessionData.expiresAt).toUTCString()
      document.cookie = `${SESSION_COOKIE_NAME}=${cookieValue}; expires=${expires}; path=/; secure; samesite=strict`
    } catch (error) {
      console.error("Failed to set session cookie:", error)
    }
  }

  private getCookieSession(): SessionData | null {
    if (typeof document === "undefined") return null

    const cookies = document.cookie.split(";")
    const sessionCookie = cookies.find((cookie) => cookie.trim().startsWith(`${SESSION_COOKIE_NAME}=`))

    if (!sessionCookie) return null

    try {
      const cookieValue = sessionCookie.split("=")[1]
      // Use safe URI decoding + JSON parse for Unicode support
      const jsonString = decodeURIComponent(cookieValue)
      const sessionData = safeJsonParse(jsonString)
      return sessionData
    } catch (error) {
      console.error("Failed to parse session cookie:", error)
      this.deleteCookie() // Clean up invalid cookie
      return null
    }
  }

  private deleteCookie(): void {
    if (typeof document === "undefined") return
    document.cookie = `${SESSION_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  }

  // Event listeners for session changes
  addListener(callback: (session: SessionData | null) => void): () => void {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  private notifyListeners(session: SessionData | null): void {
    this.listeners.forEach((callback) => callback(session))
  }
}

export const sessionManager = SessionManager.getInstance()
