"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Users, Calendar, Target, Award, Star } from "lucide-react"
import type { Challenge } from "@/types/community"

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "تحدي الادخار الشهري",
    description: "وفر 1000 ج.م خلال شهر واحد من خلال تقليل المصروفات غير الضرورية",
    category: "saving",
    difficulty: "medium",
    points: 500,
    participants: 234,
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    status: "active",
    requirements: ["تسجيل المصروفات يومياً", "تحديد 3 مصروفات غير ضرورية للتوقف عنها", "مشاركة التقدم أسبوعياً"],
    rewards: [
      { type: "points", value: 500, description: "500 نقطة" },
      { type: "badge", value: "مدخر ذكي", description: "شارة المدخر الذكي" },
    ],
  },
  {
    id: "2",
    title: "تحدي الميزانية الأسبوعية",
    description: "التزم بميزانيتك الأسبوعية لمدة 4 أسابيع متتالية",
    category: "budgeting",
    difficulty: "easy",
    points: 300,
    participants: 156,
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    status: "active",
    requirements: ["إنشاء ميزانية أسبوعية", "تتبع المصروفات يومياً", "عدم تجاوز الميزانية المحددة"],
    rewards: [
      { type: "points", value: 300, description: "300 نقطة" },
      { type: "certificate", value: "شهادة إدارة الميزانية", description: "شهادة معتمدة" },
    ],
  },
  {
    id: "3",
    title: "تحدي الاستثمار للمبتدئين",
    description: "ابدأ أول استثمار لك وتعلم أساسيات السوق المالي",
    category: "investing",
    difficulty: "hard",
    points: 1000,
    participants: 89,
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    status: "upcoming",
    requirements: [
      "إكمال دورة الاستثمار للمبتدئين",
      "فتح محفظة استثمارية",
      "القيام بأول استثمار",
      "تتبع الأداء لمدة شهر",
    ],
    rewards: [
      { type: "points", value: 1000, description: "1000 نقطة" },
      { type: "badge", value: "مستثمر مبتدئ", description: "شارة المستثمر المبتدئ" },
      { type: "certificate", value: "شهادة الاستثمار", description: "شهادة معتمدة في الاستثمار" },
    ],
  },
]

export function CommunityChallenges() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "سهل"
      case "medium":
        return "متوسط"
      case "hard":
        return "صعب"
      default:
        return difficulty
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط"
      case "upcoming":
        return "قادم"
      case "completed":
        return "مكتمل"
      default:
        return status
    }
  }

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            التحديات المجتمعية
          </CardTitle>
          <p className="text-gray-600">شارك في التحديات المالية واكسب نقاط وشارات وشهادات</p>
        </CardHeader>
      </Card>

      {/* Challenge Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Target className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">التحديات النشطة</p>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي المشاركين</p>
                <p className="text-2xl font-bold">2,847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">الجوائز الممنوحة</p>
                <p className="text-2xl font-bold">1,456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Challenges List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockChallenges.map((challenge) => {
          const daysRemaining = calculateDaysRemaining(challenge.endDate)
          const progress = challenge.status === "active" ? Math.floor(Math.random() * 100) : 0

          return (
            <Card key={challenge.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{challenge.title}</h3>
                      <Badge className={getStatusColor(challenge.status)}>{getStatusText(challenge.status)}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {getDifficultyText(challenge.difficulty)}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Trophy className="h-4 w-4" />
                        {challenge.points} نقطة
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700">{challenge.description}</p>

                {/* Challenge Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>{challenge.participants} مشارك</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      {challenge.status === "active"
                        ? `${daysRemaining} يوم متبقي`
                        : challenge.status === "upcoming"
                          ? "قريباً"
                          : "انتهى"}
                    </span>
                  </div>
                </div>

                {/* Progress for active challenges */}
                {challenge.status === "active" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>التقدم العام</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}

                {/* Requirements */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">المتطلبات:</h4>
                  <ul className="space-y-1">
                    {challenge.requirements.slice(0, 2).map((req, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        {req}
                      </li>
                    ))}
                    {challenge.requirements.length > 2 && (
                      <li className="text-sm text-gray-500">+{challenge.requirements.length - 2} متطلبات أخرى</li>
                    )}
                  </ul>
                </div>

                {/* Rewards */}
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">الجوائز:</h4>
                  <div className="flex flex-wrap gap-2">
                    {challenge.rewards.map((reward, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reward.description}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  className="w-full"
                  disabled={challenge.status === "completed"}
                  variant={challenge.status === "upcoming" ? "outline" : "default"}
                >
                  {challenge.status === "active"
                    ? "انضم للتحدي"
                    : challenge.status === "upcoming"
                      ? "تذكيرني عند البدء"
                      : "مكتمل"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Leaderboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            أفضل المتحدين هذا الشهر
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "أحمد محمد", points: 2850, challenges: 5 },
              { name: "فاطمة علي", points: 2640, challenges: 4 },
              { name: "محمد حسن", points: 2420, challenges: 6 },
            ].map((user, index) => (
              <div key={user.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full">
                    <span className="text-sm font-bold text-yellow-800">#{index + 1}</span>
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.challenges} تحديات مكتملة</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-yellow-600">{user.points.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">نقطة</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
