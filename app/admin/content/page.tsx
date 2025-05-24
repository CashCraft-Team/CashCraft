"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { AdminLayout } from "@/components/layout/admin-layout"
import { ContentModeration } from "@/components/admin/content-moderation"

export default function AdminContentPage() {
  return (
    <ProtectedRoute requireAuth={true} requireAdmin={true}>
      <AdminLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-trust to-aspiration bg-clip-text text-transparent">
                إدارة المحتوى
              </h1>
              <p className="text-gray-600 mt-1">مراجعة وإدارة المحتوى المنشور على المنصة</p>
            </div>
          </div>

          <ContentModeration />
        </div>
      </AdminLayout>
    </ProtectedRoute>
  )
}
