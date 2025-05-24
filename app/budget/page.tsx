"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { BudgetOverview } from "@/components/budget/budget-overview"
import { BudgetAnalytics } from "@/components/budget/budget-analytics"
import { ExpenseTrackerAdvanced } from "@/components/budget/expense-tracker-advanced"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BudgetPage() {
  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["user"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-trust to-aspiration bg-clip-text text-transparent">
                إدارة الميزانية
              </h1>
              <p className="text-gray-600 mt-1">تتبع مصروفاتك وخطط لمستقبلك المالي</p>
            </div>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="transactions">المعاملات</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <BudgetOverview />
            </TabsContent>

            <TabsContent value="transactions">
              <ExpenseTrackerAdvanced />
            </TabsContent>

            <TabsContent value="analytics">
              <BudgetAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
