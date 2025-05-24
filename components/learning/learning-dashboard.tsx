"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Award, Clock, TrendingUp, Calendar, Trophy, Play } from "lucide-react"

export function LearningDashboard() {
  const stats = [
    {
      title: "الدروس المكتملة",
      value: "24",
      change: "+6 هذا الأسبوع",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "الشهادات المحققة",
      value: "3",
      change: "+1 هذا الشهر",
      icon: Award,
      color: "text-yellow-600",
    },
    {
      title: "ساعات التعلم",
      value: "48",
      change: "+12 هذا الأسبوع",
      icon: Clock,
      color: "text-green-600",
    },
    {
      title: "نقاط التعلم",
      value: "1,250",
      change: "+150 هذا الأسبوع",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  const currentCourses = [
    {
      id: "1",
      title: "أساسيات الميزانية الشخصية",
      progress: 75,
      nextLesson: "إنشاء خطة الطوارئ المالية",
      timeLeft: "15 دقيقة",
    },
    {
      id: "2",
      title: "إدارة الديون بذكاء",
      progress: 30,
      nextLesson: "استراتيجيات سداد الديون",
      timeLeft: "25 دقيقة",
    },
  ]

  const achievements = [
    {
      id: "1",
      title: "أول ميزانية",
      description: "أنشأت أول ميزانية شخصية",
      icon: "🎯",
      earned: true,
      date: "2024-01-15",
    },
    {
      id: "2",
      title: "متعلم نشط",
      description: "أكملت 5 دورات تدريبية",
      icon: "📚",
      earned: false,
      progress: "3/5",
    },
    {
      id: "3",
      title: "خبير استثمار",
      description: "حصلت على شهادة في الاستثمار",
      icon: "📈",
      earned: false,
      progress: "0/1",
    },
  ]

  const upcomingEvents = [
    {
      id: "1",
      title: "ورشة عمل: التخطيط للتقاعد",
      date: "2024-02-15",
      time: "19:00",
      type: "webinar",
    },
    {
      id: "2",
      title: "جلسة أسئلة وأجوبة مع خبير مالي",
      date: "2024-02-20",
      time: "20:00",
      type: "qa",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              الدورات الحالية
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentCourses.map((course) => (
              <div key={course.id} className="p-4 border rounded-lg space-y-3">
                <div>
                  <h4 className="font-semibold">{course.title}</h4>
                  <p className="text-sm text-gray-600">الدرس التالي: {course.nextLesson}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقدم</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {course.timeLeft}
                  </div>
                  <Button size="sm">
                    <Play className="h-4 w-4 ml-2" />
                    متابعة
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              الإنجازات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border ${
                  achievement.earned ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${achievement.earned ? "text-green-800" : "text-gray-600"}`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                    {achievement.earned ? (
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                        مكتمل - {achievement.date}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="mt-1">
                        {achievement.progress}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            الأحداث القادمة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {event.date} في {event.time}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  تسجيل الحضور
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
