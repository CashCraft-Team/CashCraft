"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Target,
  Download,
} from "lucide-react"
import type { FinancialReport } from "@/types/budget"

const mockReport: FinancialReport = {
  id: "1",
  type: "monthly",
  period: "يناير 2024",
  totalIncome: 15000,
  totalExpenses: 12500,
  netIncome: 2500,
  categoryBreakdown: [
    { categoryId: "1", categoryName: "الطعام والشراب", amount: 3500, percentage: 28, change: 5 },
    { categoryId: "2", categoryName: "المواصلات", amount: 1200, percentage: 9.6, change: -10 },
    { categoryId: "3", categoryName: "الترفيه", amount: 2000, percentage: 16, change: 15 },
    { categoryId: "4", categoryName: "الفواتير", amount: 2800, percentage: 22.4, change: 2 },
    { categoryId: "5", categoryName: "التسوق", amount: 1800, percentage: 14.4, change: -5 },
    { categoryId: "6", categoryName: "الصحة", amount: 1200, percentage: 9.6, change: 8 },
  ],
  trends: [
    { period: "سبتمبر", income: 14500, expenses: 13000, savings: 1500 },
    { period: "أكتوبر", income: 14800, expenses: 12800, savings: 2000 },
    { period: "نوفمبر", income: 15200, expenses: 12200, savings: 3000 },
    { period: "ديسمبر", income: 15000, expenses: 11800, savings: 3200 },
    { period: "يناير", income: 15000, expenses: 12500, savings: 2500 },
  ],
  insights: [
    {
      type: "warning",
      title: "زيادة في مصروفات الترفيه",
      description: "ارتفعت مصروفات الترفيه بنسبة 15% مقارنة بالشهر الماضي",
      action: "راجع ميزانية الترفيه",
    },
    {
      type: "tip",
      title: "توفير في المواصلات",
      description: "انخفضت مصروفات المواصلات بنسبة 10%، استمر في هذا النهج",
      action: "حافظ على هذا التوفير",
    },
    {
      type: "achievement",
      title: "هدف الادخار محقق",
      description: "تمكنت من ادخار 2500 ج.م هذا الشهر",
      action: "ضع هدف ادخار جديد",
    },
  ],
}

export function BudgetAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedYear, setSelectedYear] = useState("2024")

  const savingsRate = useMemo(() => {
    return ((mockReport.netIncome / mockReport.totalIncome) * 100).toFixed(1)
  }, [])

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "tip":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "achievement":
        return <Target className="h-4 w-4 text-green-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "tip":
        return "bg-blue-50 border-blue-200"
      case "achievement":
        return "bg-green-50 border-green-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              التحليلات المالية
            </CardTitle>
            <div className="flex gap-3">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">شهري</SelectItem>
                  <SelectItem value="quarterly">ربع سنوي</SelectItem>
                  <SelectItem value="yearly">سنوي</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الدخل</p>
                <p className="text-2xl font-bold">{mockReport.totalIncome.toLocaleString()} ج.م</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <TrendingDown className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي المصروفات</p>
                <p className="text-2xl font-bold">{mockReport.totalExpenses.toLocaleString()} ج.م</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">صافي الدخل</p>
                <p className="text-2xl font-bold text-green-600">{mockReport.netIncome.toLocaleString()} ج.م</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">معدل الادخار</p>
                <p className="text-2xl font-bold text-purple-600">{savingsRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="breakdown">تفصيل الفئات</TabsTrigger>
          <TabsTrigger value="trends">الاتجاهات</TabsTrigger>
          <TabsTrigger value="insights">الرؤى والتوصيات</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تفصيل المصروفات حسب الفئة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReport.categoryBreakdown.map((category) => (
                  <div key={category.categoryId} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{category.categoryName}</span>
                        <Badge variant={category.change > 0 ? "destructive" : "secondary"}>
                          {category.change > 0 ? "+" : ""}
                          {category.change}%
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{category.amount.toLocaleString()} ج.م</p>
                        <p className="text-sm text-gray-500">{category.percentage}%</p>
                      </div>
                    </div>
                    <Progress value={category.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اتجاهات الدخل والمصروفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReport.trends.map((trend, index) => (
                  <div key={trend.period} className="grid grid-cols-4 gap-4 p-3 border rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">الفترة</p>
                      <p className="font-medium">{trend.period}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الدخل</p>
                      <p className="font-medium text-green-600">{trend.income.toLocaleString()} ج.م</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">المصروفات</p>
                      <p className="font-medium text-red-600">{trend.expenses.toLocaleString()} ج.م</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الادخار</p>
                      <p className="font-medium text-blue-600">{trend.savings.toLocaleString()} ج.م</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="space-y-4">
            {mockReport.insights.map((insight, index) => (
              <Card key={index} className={`border ${getInsightColor(insight.type)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                      {insight.action && (
                        <Button variant="outline" size="sm" className="mt-3">
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
