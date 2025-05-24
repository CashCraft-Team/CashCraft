"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Eye, MoreHorizontal } from "lucide-react"

export function ContentManagement() {
  const content = [
    {
      id: 1,
      title: "أساسيات الميزانية الشخصية",
      type: "فيديو",
      status: "منشور",
      views: 1250,
      lastUpdated: "2024-01-20",
    },
    {
      id: 2,
      title: "كيفية الادخار بذكاء",
      type: "مقال",
      status: "مسودة",
      views: 0,
      lastUpdated: "2024-01-18",
    },
    {
      id: 3,
      title: "اختبار الثقافة المالية",
      type: "اختبار",
      status: "منشور",
      views: 890,
      lastUpdated: "2024-01-15",
    },
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>إدارة المحتوى التعليمي</CardTitle>
          <Button className="bg-gradient-to-r from-success to-green-600 hover:from-success/90 hover:to-green-600/90">
            <Plus className="h-4 w-4 ml-2" />
            محتوى جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {content.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <Badge variant={item.type === "فيديو" ? "default" : item.type === "مقال" ? "secondary" : "outline"}>
                    {item.type}
                  </Badge>
                  <Badge variant={item.status === "منشور" ? "default" : "secondary"}>{item.status}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {item.views} مشاهدة
                  </span>
                  <span>آخر تحديث: {item.lastUpdated}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
