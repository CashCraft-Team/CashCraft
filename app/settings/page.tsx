"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AccountSettings } from "@/components/settings/account-settings"

export default function SettingsPage() {
  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["user"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-trust to-aspiration bg-clip-text text-transparent">
                إعدادات الحساب
              </h1>
              <p className="text-gray-600 mt-1">إدارة حسابك وتخصيص تجربتك</p>
            </div>
          </div>

          <AccountSettings />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
