"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, MessageSquare, ThumbsUp, Eye, Pin, Bookmark, Share, MoreHorizontal } from "lucide-react"
import type { Post } from "@/types/community"

const mockPosts: Post[] = [
  {
    id: "1",
    title: "كيف أبدأ في الاستثمار بمبلغ صغير؟",
    content: "أريد أن أبدأ في الاستثمار ولكن لدي مبلغ صغير فقط. ما هي أفضل الطرق للبدء؟",
    author: {
      id: "1",
      name: "أحمد محمد",
      avatar: "/placeholder.svg",
      level: 5,
      points: 1250,
      badges: [],
      joinedAt: "2023-01-15",
      isOnline: true,
      reputation: 85,
    },
    category: "investing",
    tags: ["استثمار", "مبتدئ", "مبلغ صغير"],
    createdAt: "2024-01-20T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    likesCount: 45,
    commentsCount: 23,
    viewsCount: 156,
    isLiked: false,
    isBookmarked: true,
    isPinned: true,
    status: "published",
    attachments: [],
  },
  {
    id: "2",
    title: "نصائح لتوفير المال في المصروفات اليومية",
    content: "شاركوني تجاربكم في توفير المال من المصروفات اليومية. ما هي الطرق التي نجحت معكم؟",
    author: {
      id: "2",
      name: "فاطمة علي",
      avatar: "/placeholder.svg",
      level: 3,
      points: 890,
      badges: [],
      joinedAt: "2023-03-20",
      isOnline: false,
      reputation: 72,
    },
    category: "saving",
    tags: ["ادخار", "نصائح", "مصروفات"],
    createdAt: "2024-01-19T15:45:00Z",
    updatedAt: "2024-01-19T15:45:00Z",
    likesCount: 32,
    commentsCount: 18,
    viewsCount: 89,
    isLiked: true,
    isBookmarked: false,
    isPinned: false,
    status: "published",
    attachments: [],
  },
  {
    id: "3",
    title: "تجربتي مع تطبيق الميزانية الشهرية",
    content: "بعد 6 أشهر من تطبيق الميزانية الشهرية، هذه هي النتائج والدروس المستفادة...",
    author: {
      id: "3",
      name: "محمد حسن",
      avatar: "/placeholder.svg",
      level: 7,
      points: 2150,
      badges: [],
      joinedAt: "2022-11-10",
      isOnline: true,
      reputation: 94,
    },
    category: "budgeting",
    tags: ["ميزانية", "تجربة شخصية", "نجاح"],
    createdAt: "2024-01-18T09:20:00Z",
    updatedAt: "2024-01-18T09:20:00Z",
    likesCount: 67,
    commentsCount: 31,
    viewsCount: 203,
    isLiked: false,
    isBookmarked: false,
    isPinned: false,
    status: "published",
    attachments: [],
  },
]

export function DiscussionForum() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("latest")

  const filteredPosts = useMemo(() => {
    let filtered = mockPosts

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((post) => post.category === selectedCategory)
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return b.likesCount + b.commentsCount - (a.likesCount + a.commentsCount)
        case "most-liked":
          return b.likesCount - a.likesCount
        case "most-commented":
          return b.commentsCount - a.commentsCount
        default: // latest
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy])

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      general: "bg-gray-100 text-gray-800",
      budgeting: "bg-blue-100 text-blue-800",
      investing: "bg-green-100 text-green-800",
      saving: "bg-yellow-100 text-yellow-800",
      debt: "bg-red-100 text-red-800",
      career: "bg-purple-100 text-purple-800",
      "success-stories": "bg-emerald-100 text-emerald-800",
      questions: "bg-orange-100 text-orange-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getCategoryText = (category: string) => {
    const texts: { [key: string]: string } = {
      general: "عام",
      budgeting: "ميزانية",
      investing: "استثمار",
      saving: "ادخار",
      debt: "ديون",
      career: "مهنة",
      "success-stories": "قصص نجاح",
      questions: "أسئلة",
    }
    return texts[category] || category
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "منذ دقائق"
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`
    return `منذ ${Math.floor(diffInHours / 24)} يوم`
  }

  return (
    <div className="space-y-6">
      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              منتدى المناقشات
            </CardTitle>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              موضوع جديد
            </Button>
          </div>

          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في المناقشات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفئات</SelectItem>
                  <SelectItem value="general">عام</SelectItem>
                  <SelectItem value="budgeting">ميزانية</SelectItem>
                  <SelectItem value="investing">استثمار</SelectItem>
                  <SelectItem value="saving">ادخار</SelectItem>
                  <SelectItem value="debt">ديون</SelectItem>
                  <SelectItem value="career">مهنة</SelectItem>
                  <SelectItem value="success-stories">قصص نجاح</SelectItem>
                  <SelectItem value="questions">أسئلة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">الأحدث</SelectItem>
                  <SelectItem value="popular">الأكثر شعبية</SelectItem>
                  <SelectItem value="most-liked">الأكثر إعجاباً</SelectItem>
                  <SelectItem value="most-commented">الأكثر تعليقاً</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.author.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          المستوى {post.author.level}
                        </Badge>
                        {post.author.isOnline && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>{formatTimeAgo(post.createdAt)}</span>
                        <span>•</span>
                        <span>{post.author.reputation} نقطة سمعة</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Post Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {post.isPinned && <Pin className="h-4 w-4 text-blue-500" />}
                    <h3 className="text-lg font-semibold hover:text-blue-600 cursor-pointer">{post.title}</h3>
                  </div>
                  <p className="text-gray-700 line-clamp-2">{post.content}</p>

                  {/* Tags */}
                  <div className="flex items-center gap-2">
                    <Badge className={getCategoryColor(post.category)}>{getCategoryText(post.category)}</Badge>
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Post Stats and Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className={`h-4 w-4 ${post.isLiked ? "text-blue-500 fill-current" : ""}`} />
                      {post.likesCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {post.commentsCount}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.viewsCount}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Bookmark className={`h-4 w-4 ${post.isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                    <Button size="sm">رد</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline">تحميل المزيد من المناقشات</Button>
      </div>
    </div>
  )
}
