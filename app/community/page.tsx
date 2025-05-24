"use client"

import { ProtectedRoute } from "@/components/auth/protected-route"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { DiscussionForum } from "@/components/community/discussion-forum"
import { CommunityChallenges } from "@/components/community/community-challenges"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CommunityPage() {
  return (
    <ProtectedRoute requireAuth={true} allowedRoles={["user"]}>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-trust to-success bg-clip-text text-transparent">
                المجتمع
              </h1>
              <p className="text-gray-600 mt-1">تواصل مع الآخرين وشارك في التحديات المالية</p>
            </div>
          </div>

          <Tabs defaultValue="discussions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="discussions">المناقشات</TabsTrigger>
              <TabsTrigger value="challenges">التحديات</TabsTrigger>
            </TabsList>

            <TabsContent value="discussions">
              <DiscussionForum />
            </TabsContent>

            <TabsContent value="challenges">
              <CommunityChallenges />
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
