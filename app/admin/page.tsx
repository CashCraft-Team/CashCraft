"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/layout/admin-layout"
import { AdminOverview } from "@/components/admin/admin-overview"
import { UserManagement } from "@/components/admin/user-management"
import { SystemAnalytics } from "@/components/admin/system-analytics"
import { ContentManagement } from "@/components/admin/content-management"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requireAuth={true} requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-trust to-aspiration bg-clip-text text-transparent">
                لوحة تحكم المدير
              </h1>
              <p className="text-gray-600 mt-1">إدارة شاملة لمنصة Cash Craft</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-trust to-aspiration text-white px-4 py-2 rounded-full text-sm font-medium">
                مدير النظام
              </div>
            </div>
          </div>

          <AdminOverview />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <UserManagement />
            <SystemAnalytics />
          </div>

          <ContentManagement />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
