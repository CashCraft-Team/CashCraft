"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Target, BookOpen, Users } from "lucide-react"

export function QuickActions() {
  const actions = [
    {
      title: "إضافة معاملة",
      description: "سجل مصروف أو دخل جديد",
      icon: Plus,
      color: "bg-trust hover:bg-trust/90",
      href: "/transactions/add",
    },
    {
      title: "إنشاء هدف",
      description: "حدد هدف ادخار جديد",
      icon: Target,
      color: "bg-aspiration hover:bg-aspiration/90",
      href: "/goals/create",
    },
    {
      title: "تعلم جديد",
      description: "اكتشف محتوى تعليمي",
      icon: BookOpen,
      color: "bg-success hover:bg-success/90",
      href: "/learn",
    },
    {
      title: "انضم للمجتمع",
      description: "شارك في التحديات",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600",
      href: "/community",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>إجراءات سريعة</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:shadow-md transition-shadow"
            >
              <action.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-gray-500">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
