"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, Clock, Users, Play, BookOpen, Award, CheckCircle } from "lucide-react"
import type { Course } from "@/types/learning"

const mockCourses: Course[] = [
  {
    id: "1",
    title: "أساسيات الميزانية الشخصية",
    description: "تعلم كيفية إنشاء وإدارة ميزانية شخصية فعالة تساعدك في تحقيق أهدافك المالية",
    instructor: "د. أحمد محمد",
    duration: 180,
    difficulty: "beginner",
    category: "budgeting",
    thumbnail: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    studentsCount: 1250,
    lessonsCount: 12,
    price: 0,
    isFree: true,
    isEnrolled: true,
    progress: 75,
    tags: ["ميزانية", "تخطيط مالي", "مبتدئ"],
    prerequisites: [],
    learningOutcomes: ["إنشاء ميزانية شخصية فعالة", "تتبع المصروفات والدخل", "تحديد الأولويات المالية"],
    lessons: [],
  },
  {
    id: "2",
    title: "استراتيجيات الاستثمار للمبتدئين",
    description: "دليل شامل لبدء رحلتك في عالم الاستثمار بطريقة آمنة ومدروسة",
    instructor: "أ. فاطمة علي",
    duration: 240,
    difficulty: "intermediate",
    category: "investing",
    thumbnail: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    studentsCount: 890,
    lessonsCount: 16,
    price: 299,
    isFree: false,
    isEnrolled: false,
    progress: 0,
    tags: ["استثمار", "أسهم", "محافظ"],
    prerequisites: ["أساسيات الميزانية الشخصية"],
    learningOutcomes: ["فهم أنواع الاستثمارات المختلفة", "بناء محفظة استثمارية متنوعة", "إدارة المخاطر الاستثمارية"],
    lessons: [],
  },
  {
    id: "3",
    title: "إدارة الديون بذكاء",
    description: "تعلم كيفية التعامل مع الديون وسدادها بطريقة فعالة ومنظمة",
    instructor: "م. سارة حسن",
    duration: 150,
    difficulty: "intermediate",
    category: "debt-management",
    thumbnail: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    studentsCount: 650,
    lessonsCount: 10,
    price: 199,
    isFree: false,
    isEnrolled: true,
    progress: 30,
    tags: ["ديون", "سداد", "تخطيط"],
    prerequisites: [],
    learningOutcomes: ["وضع خطة سداد الديون", "تقليل الفوائد المدفوعة", "تجنب الوقوع في الديون مستقبلاً"],
    lessons: [],
  },
]

export function CourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("popular")

  const filteredCourses = useMemo(() => {
    let filtered = mockCourses

    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((course) => course.difficulty === selectedDifficulty)
    }

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "newest":
          return new Date(b.title).getTime() - new Date(a.title).getTime()
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        default: // popular
          return b.studentsCount - a.studentsCount
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "مبتدئ"
      case "intermediate":
        return "متوسط"
      case "advanced":
        return "متقدم"
      default:
        return difficulty
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>استكشف الدورات</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في الدورات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 ml-2" />
              تصفية متقدمة
            </Button>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="budgeting">الميزانية</SelectItem>
                <SelectItem value="investing">الاستثمار</SelectItem>
                <SelectItem value="saving">الادخار</SelectItem>
                <SelectItem value="debt-management">إدارة الديون</SelectItem>
                <SelectItem value="financial-planning">التخطيط المالي</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="المستوى" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المستويات</SelectItem>
                <SelectItem value="beginner">مبتدئ</SelectItem>
                <SelectItem value="intermediate">متوسط</SelectItem>
                <SelectItem value="advanced">متقدم</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">الأكثر شعبية</SelectItem>
                <SelectItem value="rating">التقييم</SelectItem>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="price-low">السعر (منخفض)</SelectItem>
                <SelectItem value="price-high">السعر (مرتفع)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Course Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">جميع الدورات</TabsTrigger>
          <TabsTrigger value="enrolled">دوراتي</TabsTrigger>
          <TabsTrigger value="completed">مكتملة</TabsTrigger>
          <TabsTrigger value="wishlist">المفضلة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {getDifficultyText(course.difficulty)}
                    </Badge>
                  </div>
                  {course.isFree && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-500 text-white">مجاني</Badge>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" className="bg-white text-black hover:bg-gray-100">
                      <Play className="h-4 w-4 ml-2" />
                      معاينة
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{course.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{course.instructor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {course.studentsCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {Math.floor(course.duration / 60)}س {course.duration % 60}د
                    </div>
                  </div>

                  {course.isEnrolled && course.progress > 0 && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-lg font-bold">{course.isFree ? "مجاني" : `${course.price} ج.م`}</div>
                    <Button size="sm" className={course.isEnrolled ? "bg-green-500 hover:bg-green-600" : ""}>
                      {course.isEnrolled ? (
                        <>
                          <CheckCircle className="h-4 w-4 ml-2" />
                          متابعة
                        </>
                      ) : (
                        <>
                          <BookOpen className="h-4 w-4 ml-2" />
                          التحق الآن
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="enrolled">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses
              .filter((course) => course.isEnrolled)
              .map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-all duration-300">
                  {/* Same card content but with progress emphasis */}
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="font-semibold">{course.title}</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>التقدم</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-3" />
                      </div>
                      <Button className="w-full">
                        <Play className="h-4 w-4 ml-2" />
                        متابعة التعلم
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-8">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">لا توجد دورات مكتملة بعد</h3>
            <p className="text-gray-600">أكمل دورتك الأولى للحصول على شهادة</p>
          </div>
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">قائمة المفضلة فارغة</h3>
            <p className="text-gray-600">أضف دورات إلى قائمة المفضلة لتتمكن من الوصول إليها بسهولة</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
