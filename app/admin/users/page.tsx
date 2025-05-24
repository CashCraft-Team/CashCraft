"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/layout/admin-layout"
import { AdvancedUserManagement } from "@/components/admin/advanced-user-management"

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requireAuth={true} requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-trust to-aspiration bg-clip-text text-transparent">
                إدارة المستخدمين
              </h1>
              <p className="text-gray-600 mt-1">إدارة شاملة لحسابات المستخدمين وصلاحياتهم</p>
            </div>
          </div>

          <AdvancedUserManagement />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
