"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Coffee, Car, Home } from "lucide-react"

export function RecentTransactions() {
  const transactions = [
    {
      id: 1,
      description: "تسوق من كارفور",
      amount: -450,
      category: "طعام",
      date: "اليوم",
      icon: ShoppingCart,
      color: "text-blue-500",
    },
    {
      id: 2,
      description: "قهوة من ستارباكس",
      amount: -85,
      category: "ترفيه",
      date: "أمس",
      icon: Coffee,
      color: "text-amber-500",
    },
    {
      id: 3,
      description: "وقود السيارة",
      amount: -200,
      category: "مواصلات",
      date: "2 أيام",
      icon: Car,
      color: "text-red-500",
    },
    {
      id: 4,
      description: "راتب شهري",
      amount: 12000,
      category: "دخل",
      date: "3 أيام",
      icon: Home,
      color: "text-green-500",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>المعاملات الأخيرة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full bg-gray-100 ${transaction.color}`}>
                  <transaction.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm">{transaction.description}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{transaction.date}</span>
                  </div>
                </div>
              </div>
              <div className={`font-medium ${transaction.amount > 0 ? "text-success" : "text-red-500"}`}>
                {transaction.amount > 0 ? "+" : ""}
                {transaction.amount} ج.م
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
