"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  Menu,
  X,
  Bell,
  LogOut,
  Shield,
  MessageSquare,
  Trophy,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useI18n } from "@/hooks/use-i18n"

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const pathname = usePathname()

  const navigation = [
    { name: t("admin.overview"), href: "/admin", icon: LayoutDashboard },
    { name: t("admin.userManagement"), href: "/admin/users", icon: Users },
    { name: t("admin.analytics"), href: "/admin/analytics", icon: BarChart3 },
    { name: t("admin.contentModeration"), href: "/admin/content", icon: BookOpen },
    { name: t("community.title"), href: "/admin/community", icon: MessageSquare },
    { name: "الجوائز والتحديات", href: "/admin/gamification", icon: Trophy },
    { name: t("admin.systemConfig"), href: "/admin/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
        <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300">
          <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-trust to-aspiration">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-white" />
              <h2 className="text-lg font-bold text-white">Cash Craft Admin</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-white/20"
            >
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-trust to-aspiration text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:transform hover:scale-105"
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:z-50 lg:w-72 lg:bg-white lg:shadow-xl lg:block">
        <div className="flex items-center justify-center p-6 border-b bg-gradient-to-r from-trust to-aspiration">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-white" />
            <h2 className="text-xl font-bold text-white">Cash Craft Admin</h2>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-trust to-aspiration text-white shadow-lg transform scale-105"
                    : "text-gray-700 hover:bg-gray-100 hover:transform hover:scale-105"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 mb-4 border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-trust to-aspiration rounded-full flex items-center justify-center text-white text-sm font-bold">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500">مدير النظام</p>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 ml-2" />
            {t("nav.logout")}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pr-72">
        {/* Top bar */}
        <div className="bg-white/80 backdrop-blur-md shadow-sm border-b px-6 py-4 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-trust/10"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="relative hover:bg-trust/10">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </Button>
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-trust to-aspiration rounded-full flex items-center justify-center text-white text-sm font-bold">
                  <Shield className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
