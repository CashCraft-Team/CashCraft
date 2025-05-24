"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, BookOpen, Target } from "lucide-react"

export function SystemAnalytics() {
  const metrics = [
    {
      name: "معدل إكمال الدروس",
      value: 78,
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      name: "مشاركة المستخدمين",
      value: 85,
      icon: Users,
      color: "text-green-600",
    },
    {
      name: "تحقيق الأهداف",
      value: 62,
      icon: Target,
      color: "text-purple-600",
    },
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>تحليلات النظام</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <span className="text-sm font-bold">{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}

          <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">الأداء العام</span>
            </div>
            <p className="text-xs text-green-700">النظام يعمل بكفاءة عالية مع نمو مستمر في المشاركة</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
