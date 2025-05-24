"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Plus, Search, Download, CalendarIcon, MapPin, Receipt, Repeat, Edit, MoreHorizontal } from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import type { Transaction } from "@/types/budget"

const mockTransactions: Transaction[] = [
  {
    id: "1",
    description: "تسوق من كارفور",
    amount: 450,
    type: "expense",
    categoryId: "food",
    date: "2024-01-20",
    paymentMethod: { id: "1", name: "بطاقة ائتمان", type: "card", icon: "💳" },
    location: "كارفور المعادي",
    notes: "تسوق أسبوعي للمنزل",
    tags: ["تسوق", "طعام", "أسبوعي"],
    isRecurring: false,
  },
  {
    id: "2",
    description: "راتب شهري",
    amount: 12000,
    type: "income",
    categoryId: "salary",
    date: "2024-01-20",
    paymentMethod: { id: "2", name: "تحويل بنكي", type: "bank", icon: "🏦" },
    notes: "راتب شهر يناير",
    tags: ["راتب", "دخل"],
    isRecurring: true,
    recurringPattern: { frequency: "monthly", interval: 1 },
  },
  {
    id: "3",
    description: "فاتورة الكهرباء",
    amount: 280,
    type: "expense",
    categoryId: "utilities",
    date: "2024-01-19",
    paymentMethod: { id: "3", name: "فوري", type: "digital", icon: "📱" },
    notes: "فاتورة شهر ديسمبر",
    tags: ["فواتير", "كهرباء"],
    isRecurring: true,
    recurringPattern: { frequency: "monthly", interval: 1 },
  },
  {
    id: "4",
    description: "وقود السيارة",
    amount: 200,
    type: "expense",
    categoryId: "transport",
    date: "2024-01-19",
    paymentMethod: { id: "1", name: "بطاقة ائتمان", type: "card", icon: "💳" },
    location: "محطة توتال",
    tags: ["وقود", "سيارة"],
    isRecurring: false,
  },
  {
    id: "5",
    description: "عشاء في مطعم",
    amount: 150,
    type: "expense",
    categoryId: "entertainment",
    date: "2024-01-18",
    paymentMethod: { id: "4", name: "نقدي", type: "cash", icon: "💵" },
    location: "مطعم أبو السيد",
    notes: "عشاء مع الأصدقاء",
    tags: ["مطعم", "ترفيه"],
    isRecurring: false,
  },
]

export function ExpenseTrackerAdvanced() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("all")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [sortBy, setSortBy] = useState("date")

  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions

    if (searchQuery) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.notes?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((transaction) => transaction.type === selectedType)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((transaction) => transaction.categoryId === selectedCategory)
    }

    if (selectedPaymentMethod !== "all") {
      filtered = filtered.filter((transaction) => transaction.paymentMethod.id === selectedPaymentMethod)
    }

    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        return transactionDate >= dateRange.from! && transactionDate <= dateRange.to!
      })
    }

    // Sort transactions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.amount - a.amount
        case "amount-asc":
          return a.amount - b.amount
        case "description":
          return a.description.localeCompare(b.description)
        default: // date
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

    return filtered
  }, [searchQuery, selectedType, selectedCategory, selectedPaymentMethod, dateRange, sortBy])

  const totalIncome = useMemo(() => {
    return filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
  }, [filteredTransactions])

  const totalExpenses = useMemo(() => {
    return filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
  }, [filteredTransactions])

  const getCategoryName = (categoryId: string) => {
    const categories: { [key: string]: string } = {
      food: "طعام وشراب",
      transport: "مواصلات",
      entertainment: "ترفيه",
      utilities: "فواتير",
      shopping: "تسوق",
      health: "صحة",
      salary: "راتب",
      freelance: "عمل حر",
      investment: "استثمار",
    }
    return categories[categoryId] || categoryId
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: ar })
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">إجمالي الدخل</p>
              <p className="text-2xl font-bold text-green-600">{totalIncome.toLocaleString()} ج.م</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">إجمالي المصروفات</p>
              <p className="text-2xl font-bold text-red-600">{totalExpenses.toLocaleString()} ج.م</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">صافي الدخل</p>
              <p
                className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {(totalIncome - totalExpenses).toLocaleString()} ج.م
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>سجل المعاملات</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                إضافة معاملة
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في المعاملات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="النوع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="income">دخل</SelectItem>
                  <SelectItem value="expense">مصروف</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="food">طعام وشراب</SelectItem>
                  <SelectItem value="transport">مواصلات</SelectItem>
                  <SelectItem value="entertainment">ترفيه</SelectItem>
                  <SelectItem value="utilities">فواتير</SelectItem>
                  <SelectItem value="shopping">تسوق</SelectItem>
                  <SelectItem value="health">صحة</SelectItem>
                  <SelectItem value="salary">راتب</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الطرق</SelectItem>
                  <SelectItem value="1">بطاقة ائتمان</SelectItem>
                  <SelectItem value="2">تحويل بنكي</SelectItem>
                  <SelectItem value="3">فوري</SelectItem>
                  <SelectItem value="4">نقدي</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="h-4 w-4 ml-2" />
                    التاريخ
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
                </PopoverContent>
              </Popover>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">التاريخ</SelectItem>
                  <SelectItem value="amount">المبلغ (عالي)</SelectItem>
                  <SelectItem value="amount-asc">المبلغ (منخفض)</SelectItem>
                  <SelectItem value="description">الوصف</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                    }`}
                  >
                    <span className="text-lg">{transaction.paymentMethod.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{transaction.description}</h4>
                      {transaction.isRecurring && (
                        <Badge variant="outline" className="text-xs">
                          <Repeat className="h-3 w-3 ml-1" />
                          متكرر
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span>{getCategoryName(transaction.categoryId)}</span>
                      <span>•</span>
                      <span>{transaction.paymentMethod.name}</span>
                      <span>•</span>
                      <span>{formatDate(transaction.date)}</span>
                      {transaction.location && (
                        <>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {transaction.location}
                          </div>
                        </>
                      )}
                    </div>
                    {transaction.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {transaction.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    {transaction.notes && <p className="text-sm text-gray-600 mt-1">{transaction.notes}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        transaction.type === "income" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount.toLocaleString()} ج.م
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {transaction.receipt && (
                      <Button variant="ghost" size="sm">
                        <Receipt className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">لا توجد معاملات تطابق المعايير المحددة</p>
            </div>
          )}

          {filteredTransactions.length > 0 && (
            <div className="mt-6 text-center">
              <Button variant="outline">تحميل المزيد من المعاملات</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
