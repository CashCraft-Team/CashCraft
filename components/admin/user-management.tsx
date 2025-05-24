"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, UserPlus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function UserManagement() {
  const recentUsers = [
    {
      id: 1,
      name: "سارة أحمد",
      email: "sara@example.com",
      level: 5,
      status: "نشط",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "محمد علي",
      email: "mohamed@example.com",
      level: 3,
      status: "نشط",
      joinDate: "2024-01-10",
    },
    {
      id: 3,
      name: "فاطمة حسن",
      email: "fatima@example.com",
      level: 7,
      status: "غير نشط",
      joinDate: "2024-01-05",
    },
  ]

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>إدارة المستخدمين</CardTitle>
          <Button
            size="sm"
            className="bg-gradient-to-r from-trust to-aspiration hover:from-trust/90 hover:to-aspiration/90"
          >
            <UserPlus className="h-4 w-4 ml-2" />
            مستخدم جديد
          </Button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input placeholder="البحث عن مستخدم..." className="pl-10" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-r from-trust to-aspiration text-white">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">المستوى {user.level}</Badge>
                <Badge variant={user.status === "نشط" ? "default" : "secondary"}>{user.status}</Badge>
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
