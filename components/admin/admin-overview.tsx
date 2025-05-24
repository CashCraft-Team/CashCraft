"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, BookOpen, Trophy, AlertTriangle, CheckCircle } from "lucide-react"

export function AdminOverview() {
  const stats = [
    {
      title: "إجمالي المستخدمين",
      value: "12,847",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "المستخدمين النشطين",
      value: "8,234",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
    },
    {
      title: "الدروس المكتملة",
      value: "45,672",
      change: "+15.3%",
      trend: "up",
      icon: BookOpen,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "التحديات المنجزة",
      value: "23,891",
      change: "+9.7%",
      trend: "up",
      icon: Trophy,
      color: "from-yellow-500 to-yellow-600",
    },
  ]

  const alerts = [
    {
      type: "warning",
      message: "5 تقارير جديدة تحتاج مراجعة",
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      type: "success",
      message: "تم تحديث المحتوى التعليمي بنجاح",
      icon: CheckCircle,
      color: "text-green-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 ml-1" />
                {stat.change} من الشهر الماضي
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>التنبيهات والإشعارات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <alert.icon className={`h-5 w-5 ${alert.color}`} />
                <span className="text-sm">{alert.message}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
