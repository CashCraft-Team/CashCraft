"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { FinancialOverview } from "@/components/dashboard/financial-overview"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { GoalsProgress } from "@/components/dashboard/goals-progress"
import { LearningProgress } from "@/components/dashboard/learning-progress"
import { useAuth } from "@/components/auth/auth-provider"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["user"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">مرحباً، {user?.name}</h1>
              <p className="text-gray-600">إليك نظرة عامة على وضعك المالي اليوم</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-aspiration/10 text-aspiration px-2 py-1 rounded-full">المستوى {user?.level}</span>
              <span className="bg-success/10 text-success px-2 py-1 rounded-full">{user?.points} نقطة</span>
            </div>
          </div>

          <FinancialOverview />
          <QuickActions />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentTransactions />
            <GoalsProgress />
          </div>

          <LearningProgress />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
