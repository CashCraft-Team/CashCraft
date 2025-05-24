"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"

export function FinancialOverview() {
  const stats = [
    {
      title: "الرصيد الحالي",
      value: "15,750 ج.م",
      change: "+5.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-success",
    },
    {
      title: "المصروفات الشهرية",
      value: "8,420 ج.م",
      change: "-2.1%",
      trend: "down",
      icon: CreditCard,
      color: "text-trust",
    },
    {
      title: "المدخرات",
      value: "3,200 ج.م",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-aspiration",
    },
    {
      title: "الهدف الشهري",
      value: "85%",
      change: "+8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-success",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div
              className={`p-2 rounded-lg ${stat.color === "text-success" ? "bg-success/10" : stat.color === "text-trust" ? "bg-trust/10" : "bg-aspiration/10"}`}
            >
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center text-xs text-gray-600">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-success ml-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 ml-1" />
              )}
              {stat.change} من الشهر الماضي
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
