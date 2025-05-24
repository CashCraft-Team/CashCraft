"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Users, DollarSign, BookOpen, MessageSquare, Download, RefreshCw } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"

const userGrowthData = [
  { month: "يناير", users: 1200, active: 980 },
  { month: "فبراير", users: 1450, active: 1180 },
  { month: "مارس", users: 1680, active: 1420 },
  { month: "أبريل", users: 1920, active: 1650 },
  { month: "مايو", users: 2150, active: 1890 },
  { month: "يونيو", users: 2380, active: 2100 },
]

const revenueData = [
  { month: "يناير", revenue: 15000, expenses: 8000 },
  { month: "فبراير", revenue: 18000, expenses: 9500 },
  { month: "مارس", revenue: 22000, expenses: 11000 },
  { month: "أبريل", revenue: 25000, expenses: 12500 },
  { month: "مايو", revenue: 28000, expenses: 14000 },
  { month: "يونيو", revenue: 32000, expenses: 15500 },
]

const contentData = [
  { name: "فيديوهات", value: 45, color: "#4A90E2" },
  { name: "مقالات", value: 30, color: "#F5A623" },
  { name: "اختبارات", value: 15, color: "#7ED321" },
  { name: "تحديات", value: 10, color: "#D0021B" },
]

export function ReportsAnalytics() {
  const { t } = useI18n()
  const [dateRange, setDateRange] = useState<any>(null)
  const [selectedMetric, setSelectedMetric] = useState("users")
  const [isLoading, setIsLoading] = useState(false)

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
  }

  const handleExport = (format: string) => {
    console.log(`Exporting data in ${format} format`)
  }

  const metrics = [
    {
      title: "إجمالي المستخدمين",
      value: "2,380",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "الإيرادات الشهرية",
      value: "32,000 ج.م",
      change: "+14.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "المحتوى المنشور",
      value: "156",
      change: "+8.7%",
      trend: "up",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "التفاعل اليومي",
      value: "1,240",
      change: "-2.1%",
      trend: "down",
      icon: MessageSquare,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>التقارير والتحليلات</CardTitle>
            <div className="flex flex-wrap gap-2">
              <DatePickerWithRange date={dateRange} setDate={setDateRange} />
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">المستخدمين</SelectItem>
                  <SelectItem value="revenue">الإيرادات</SelectItem>
                  <SelectItem value="content">المحتوى</SelectItem>
                  <SelectItem value="engagement">التفاعل</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 ml-2" />
                )}
                تحديث
              </Button>
              <Button variant="outline" onClick={() => handleExport("pdf")}>
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${metric.trend === "up" ? "text-green-500" : "text-red-500"}`}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${metric.color}`}>
                  <metric.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">المستخدمين</TabsTrigger>
          <TabsTrigger value="revenue">الإيرادات</TabsTrigger>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="engagement">التفاعل</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>نمو المستخدمين</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#4A90E2" name="إجمالي المستخدمين" />
                  <Line type="monotone" dataKey="active" stroke="#7ED321" name="المستخدمين النشطين" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الإيرادات والمصروفات</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#4A90E2" name="الإيرادات" />
                  <Bar dataKey="expenses" fill="#F5A623" name="المصروفات" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>توزيع المحتوى</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={contentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {contentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>معدلات التفاعل</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">85%</p>
                  <p className="text-sm text-gray-600">معدل إكمال الدورات</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">92%</p>
                  <p className="text-sm text-gray-600">رضا المستخدمين</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">67%</p>
                  <p className="text-sm text-gray-600">معدل العودة الشهرية</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
