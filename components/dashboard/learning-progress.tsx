"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Award, Star } from "lucide-react"

export function LearningProgress() {
  const achievements = [
    { name: "أول ميزانية", icon: "🎯", earned: true },
    { name: "هدف الادخار", icon: "💰", earned: true },
    { name: "خبير الاستثمار", icon: "📈", earned: false },
    { name: "مدير مالي", icon: "👑", earned: false },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>التقدم التعليمي</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-trust" />
              <span className="font-medium">الدروس المكتملة</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>أساسيات الميزانية</span>
                <span className="text-success">مكتمل</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>الادخار والاستثمار</span>
                <span className="text-aspiration">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-aspiration" />
              <span className="font-medium">الإنجازات</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((achievement) => (
                <div
                  key={achievement.name}
                  className={`p-3 rounded-lg border text-center ${
                    achievement.earned ? "bg-success/10 border-success/20" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <div className="text-xs font-medium">{achievement.name}</div>
                  {achievement.earned && <Star className="h-3 w-3 text-success mx-auto mt-1" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
