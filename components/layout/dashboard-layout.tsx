"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Home, PiggyBank, Target, BookOpen, Users, Settings, Menu, X, Bell, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/hooks/use-i18n"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const pathname = usePathname()

  const navigation = [
    { name: t("nav.home"), href: "/dashboard", icon: Home },
    { name: t("nav.budget"), href: "/budget", icon: PiggyBank },
    { name: t("nav.goals"), href: "/goals", icon: Target },
    { name: t("nav.learn"), href: "/learn", icon: BookOpen },
    { name: t("nav.community"), href: "/community", icon: Users },
    { name: t("nav.settings"), href: "/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-lg">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold text-trust">Cash Craft</h2>
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    isActive
                      ? "bg-gradient-to-r from-trust to-aspiration text-white shadow-lg"
                      : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:w-64 lg:bg-white lg:shadow-lg lg:block">
        <div className="flex items-center justify-center p-6 border-b">
          <h2 className="text-xl font-bold text-trust">Cash Craft</h2>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                  isActive
                    ? "bg-gradient-to-r from-trust to-aspiration text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100 hover:shadow-md"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-trust rounded-full flex items-center justify-center text-white text-sm font-medium">
                {user?.name?.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500">المستوى {user?.level}</p>
              </div>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:bg-gray-100" onClick={logout}>
            <LogOut className="h-4 w-4 ml-2" />
            {t("nav.logout")}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pr-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-trust rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
