"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  PiggyBank,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Target,
  Calendar,
  DollarSign,
} from "lucide-react"
import type { Budget, BudgetCategory } from "@/types/budget"

const mockBudget: Budget = {
  id: "1",
  name: "ميزانية يناير 2024",
  period: "monthly",
  startDate: "2024-01-01",
  endDate: "2024-01-31",
  totalIncome: 15000,
  totalExpenses: 12500,
  status: "active",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-20",
  categories: [
    {
      id: "1",
      name: "الطعام والشراب",
      budgetedAmount: 3000,
      spentAmount: 3500,
      icon: "🍽️",
      color: "#FF6B6B",
      subcategories: [
        { id: "1a", name: "مطاعم", budgetedAmount: 1000, spentAmount: 1200 },
        { id: "1b", name: "بقالة", budgetedAmount: 2000, spentAmount: 2300 },
      ],
    },
    {
      id: "2",
      name: "المواصلات",
      budgetedAmount: 1500,
      spentAmount: 1200,
      icon: "🚗",
      color: "#4ECDC4",
      subcategories: [
        { id: "2a", name: "وقود", budgetedAmount: 800, spentAmount: 700 },
        { id: "2b", name: "مواصلات عامة", budgetedAmount: 700, spentAmount: 500 },
      ],
    },
    {
      id: "3",
      name: "الترفيه",
      budgetedAmount: 2000,
      spentAmount: 2200,
      icon: "🎬",
      color: "#45B7D1",
      subcategories: [
        { id: "3a", name: "سينما", budgetedAmount: 500, spentAmount: 600 },
        { id: "3b", name: "ألعاب", budgetedAmount: 1500, spentAmount: 1600 },
      ],
    },
    {
      id: "4",
      name: "الفواتير",
      budgetedAmount: 2500,
      spentAmount: 2400,
      icon: "⚡",
      color: "#F7DC6F",
      subcategories: [
        { id: "4a", name: "كهرباء", budgetedAmount: 800, spentAmount: 750 },
        { id: "4b", name: "إنترنت", budgetedAmount: 400, spentAmount: 400 },
        { id: "4c", name: "هاتف", budgetedAmount: 300, spentAmount: 250 },
        { id: "4d", name: "ماء", budgetedAmount: 1000, spentAmount: 1000 },
      ],
    },
    {
      id: "5",
      name: "التسوق",
      budgetedAmount: 1800,
      spentAmount: 1600,
      icon: "🛍️",
      color: "#BB8FCE",
      subcategories: [
        { id: "5a", name: "ملابس", budgetedAmount: 1000, spentAmount: 800 },
        { id: "5b", name: "إلكترونيات", budgetedAmount: 800, spentAmount: 800 },
      ],
    },
    {
      id: "6",
      name: "الصحة",
      budgetedAmount: 1200,
      spentAmount: 1100,
      icon: "🏥",
      color: "#85C1E9",
      subcategories: [
        { id: "6a", name: "أدوية", budgetedAmount: 500, spentAmount: 400 },
        { id: "6b", name: "طبيب", budgetedAmount: 700, spentAmount: 700 },
      ],
    },
  ],
}

export function BudgetOverview() {
  const [selectedPeriod, setSelectedPeriod] = useState("current")
  const [showSubcategories, setShowSubcategories] = useState<string | null>(null)

  const budgetStats = useMemo(() => {
    const totalBudgeted = mockBudget.categories.reduce((sum, cat) => sum + cat.budgetedAmount, 0)
    const totalSpent = mockBudget.categories.reduce((sum, cat) => sum + cat.spentAmount, 0)
    const remaining = totalBudgeted - totalSpent
    const spentPercentage = (totalSpent / totalBudgeted) * 100

    return {
      totalBudgeted,
      totalSpent,
      remaining,
      spentPercentage,
      isOverBudget: totalSpent > totalBudgeted,
    }
  }, [])

  const getCategoryStatus = (category: BudgetCategory) => {
    const percentage = (category.spentAmount / category.budgetedAmount) * 100
    if (percentage >= 100) return { status: "over", color: "text-red-600", bgColor: "bg-red-100" }
    if (percentage >= 80) return { status: "warning", color: "text-yellow-600", bgColor: "bg-yellow-100" }
    return { status: "good", color: "text-green-600", bgColor: "bg-green-100" }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "over":
        return <AlertTriangle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <CheckCircle className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} ج.م`
  }

  const calculateDaysRemaining = () => {
    const endDate = new Date(mockBudget.endDate)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="space-y-6">
      {/* Budget Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5" />
                {mockBudget.name}
              </CardTitle>
              <p className="text-gray-600 mt-1">{calculateDaysRemaining()} يوم متبقي في هذه الفترة</p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">الحالية</SelectItem>
                  <SelectItem value="previous">السابقة</SelectItem>
                  <SelectItem value="compare">مقارنة</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Edit className="h-4 w-4 ml-2" />
                تعديل
              </Button>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                ميزانية جديدة
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Budget Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي الميزانية</p>
                <p className="text-2xl font-bold">{formatCurrency(budgetStats.totalBudgeted)}</p>
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
                <p className="text-sm text-gray-600">إجمالي المصروف</p>
                <p className="text-2xl font-bold">{formatCurrency(budgetStats.totalSpent)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${budgetStats.isOverBudget ? "bg-red-100" : "bg-green-100"}`}>
                {budgetStats.isOverBudget ? (
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                ) : (
                  <DollarSign className="h-5 w-5 text-green-600" />
                )}
              </div>
              <div>
                <p className="text-sm text-gray-600">المتبقي</p>
                <p className={`text-2xl font-bold ${budgetStats.isOverBudget ? "text-red-600" : "text-green-600"}`}>
                  {formatCurrency(Math.abs(budgetStats.remaining))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">نسبة الإنفاق</p>
                <p className="text-2xl font-bold">{Math.round(budgetStats.spentPercentage)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle>التقدم العام</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">
                {formatCurrency(budgetStats.totalSpent)} من {formatCurrency(budgetStats.totalBudgeted)}
              </span>
              <Badge
                className={
                  budgetStats.isOverBudget
                    ? "bg-red-100 text-red-800"
                    : budgetStats.spentPercentage >= 80
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                }
              >
                {Math.round(budgetStats.spentPercentage)}%
              </Badge>
            </div>
            <Progress
              value={Math.min(budgetStats.spentPercentage, 100)}
              className={`h-3 ${budgetStats.isOverBudget ? "[&>div]:bg-red-500" : ""}`}
            />
            {budgetStats.isOverBudget && (
              <div className="flex items-center gap-2 text-red-600 text-sm">
                <AlertTriangle className="h-4 w-4" />
                تجاوزت الميزانية المحددة بمقدار {formatCurrency(Math.abs(budgetStats.remaining))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Categories Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>تفصيل الفئات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBudget.categories.map((category) => {
              const categoryStatus = getCategoryStatus(category)
              const percentage = (category.spentAmount / category.budgetedAmount) * 100
              const isExpanded = showSubcategories === category.id

              return (
                <div key={category.id} className="space-y-3">
                  <div
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setShowSubcategories(isExpanded ? null : category.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <p className="text-sm text-gray-600">
                            {formatCurrency(category.spentAmount)} من {formatCurrency(category.budgetedAmount)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`${categoryStatus.bgColor} ${categoryStatus.color}`}>
                          {getStatusIcon(categoryStatus.status)}
                          <span className="ml-1">{Math.round(percentage)}%</span>
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Progress
                        value={Math.min(percentage, 100)}
                        className="h-2"
                        style={{
                          backgroundColor: `${category.color}20`,
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>المتبقي: {formatCurrency(category.budgetedAmount - category.spentAmount)}</span>
                        <span>{calculateDaysRemaining()} يوم متبقي</span>
                      </div>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {isExpanded && category.subcategories && (
                    <div className="ml-6 space-y-2">
                      {category.subcategories.map((subcategory) => {
                        const subPercentage = (subcategory.spentAmount / subcategory.budgetedAmount) * 100
                        return (
                          <div key={subcategory.id} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <span className="font-medium text-sm">{subcategory.name}</span>
                              <span className="text-sm text-gray-600">
                                {formatCurrency(subcategory.spentAmount)} / {formatCurrency(subcategory.budgetedAmount)}
                              </span>
                            </div>
                            <Progress value={Math.min(subPercentage, 100)} className="h-1" />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Plus className="h-5 w-5" />
              <span className="text-sm">إضافة مصروف</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Target className="h-5 w-5" />
              <span className="text-sm">تعديل الميزانية</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">عرض التقرير</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="text-sm">ميزانية الشهر القادم</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
