"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { ActiveGoals } from "@/components/goals/active-goals"

export default function GoalsPage() {
  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["user"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">أهدافي المالية</h1>
              <p className="text-gray-600">تتبع وإدارة أهدافك المالية بسهولة</p>
            </div>
          </div>

          <ActiveGoals />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
