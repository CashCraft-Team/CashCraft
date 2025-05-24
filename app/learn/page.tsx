"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { LearningDashboard } from "@/components/learning/learning-dashboard"
import { CourseCatalog } from "@/components/learning/course-catalog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LearnPage() {
  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["user"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-trust to-success bg-clip-text text-transparent">
                التعلم والتطوير
              </h1>
              <p className="text-gray-600 mt-1">طور مهاراتك المالية من خلال دوراتنا التفاعلية</p>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="dashboard">لوحة التعلم</TabsTrigger>
              <TabsTrigger value="catalog">كتالوج الدورات</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <LearningDashboard />
            </TabsContent>

            <TabsContent value="catalog">
              <CourseCatalog />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
