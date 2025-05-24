"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Flag,
  MessageSquare,
  FileText,
  ImageIcon,
  Video,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"

interface ContentItem {
  id: string
  type: "post" | "comment" | "course" | "image" | "video"
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  status: "pending" | "approved" | "rejected" | "flagged"
  createdAt: string
  reportCount: number
  category: string
  tags: string[]
  reports: Array<{
    id: string
    reason: string
    reportedBy: string
    reportedAt: string
  }>
}

const mockContent: ContentItem[] = [
  {
    id: "1",
    type: "post",
    title: "كيف أبدأ في الاستثمار؟",
    content: "أريد أن أبدأ في الاستثمار ولكن لا أعرف من أين أبدأ. هل يمكنكم مساعدتي؟",
    author: { id: "1", name: "أحمد محمد" },
    status: "pending",
    createdAt: "2024-01-20T10:30:00Z",
    reportCount: 0,
    category: "investment",
    tags: ["استثمار", "مبتدئ"],
    reports: [],
  },
  {
    id: "2",
    type: "comment",
    title: "رد على: نصائح الادخار",
    content: "هذا المحتوى مفيد جداً، شكراً لك على المشاركة",
    author: { id: "2", name: "فاطمة علي" },
    status: "approved",
    createdAt: "2024-01-19T15:45:00Z",
    reportCount: 0,
    category: "saving",
    tags: ["ادخار"],
    reports: [],
  },
  {
    id: "3",
    type: "post",
    title: "محتوى مشكوك فيه",
    content: "هذا محتوى قد يحتوي على معلومات مضللة حول الاستثمار",
    author: { id: "3", name: "محمد حسن" },
    status: "flagged",
    createdAt: "2024-01-18T09:20:00Z",
    reportCount: 3,
    category: "investment",
    tags: ["استثمار"],
    reports: [
      {
        id: "r1",
        reason: "معلومات مضللة",
        reportedBy: "مستخدم 1",
        reportedAt: "2024-01-18T10:00:00Z",
      },
      {
        id: "r2",
        reason: "محتوى غير مناسب",
        reportedBy: "مستخدم 2",
        reportedAt: "2024-01-18T11:00:00Z",
      },
    ],
  },
]

export function ContentModeration() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null)

  const filteredContent = useMemo(() => {
    let filtered = mockContent

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.author.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((item) => item.status === selectedStatus)
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((item) => item.type === selectedType)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [searchQuery, selectedStatus, selectedType, selectedCategory])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "flagged":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      case "flagged":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "post":
        return <MessageSquare className="h-4 w-4" />
      case "comment":
        return <MessageSquare className="h-4 w-4" />
      case "course":
        return <FileText className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleApprove = (id: string) => {
    console.log("Approving content:", id)
    // Implementation for approving content
  }

  const handleReject = (id: string) => {
    console.log("Rejecting content:", id)
    // Implementation for rejecting content
  }

  const handleFlag = (id: string) => {
    console.log("Flagging content:", id)
    // Implementation for flagging content
  }

  const stats = {
    pending: mockContent.filter((item) => item.status === "pending").length,
    flagged: mockContent.filter((item) => item.status === "flagged").length,
    approved: mockContent.filter((item) => item.status === "approved").length,
    rejected: mockContent.filter((item) => item.status === "rejected").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">في انتظار المراجعة</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Flag className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">محتوى مبلغ عنه</p>
                <p className="text-2xl font-bold">{stats.flagged}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">محتوى موافق عليه</p>
                <p className="text-2xl font-bold">{stats.approved}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">محتوى مرفوض</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>إدارة المحتوى</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث في المحتوى..."
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
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="pending">في انتظار المراجعة</SelectItem>
                <SelectItem value="approved">موافق عليه</SelectItem>
                <SelectItem value="rejected">مرفوض</SelectItem>
                <SelectItem value="flagged">مبلغ عنه</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="النوع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الأنواع</SelectItem>
                <SelectItem value="post">منشور</SelectItem>
                <SelectItem value="comment">تعليق</SelectItem>
                <SelectItem value="course">دورة</SelectItem>
                <SelectItem value="image">صورة</SelectItem>
                <SelectItem value="video">فيديو</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="investment">استثمار</SelectItem>
                <SelectItem value="saving">ادخار</SelectItem>
                <SelectItem value="budgeting">ميزانية</SelectItem>
                <SelectItem value="general">عام</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>قائمة المحتوى</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredContent.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedItem?.id === item.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(item.type)}
                        <span className="text-sm text-gray-500 capitalize">{item.type}</span>
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1">{item.status}</span>
                      </Badge>
                      {item.reportCount > 0 && (
                        <Badge variant="destructive">
                          <Flag className="h-3 w-3 ml-1" />
                          {item.reportCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <h4 className="font-semibold mb-2 line-clamp-1">{item.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">{item.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">{item.author.name}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString("ar-EG")}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleApprove(item.id)
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleReject(item.id)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleFlag(item.id)
                      }}
                    >
                      <Flag className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Content Details */}
        <Card>
          <CardHeader>
            <CardTitle>تفاصيل المحتوى</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedItem ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {getTypeIcon(selectedItem.type)}
                    <span className="font-medium capitalize">{selectedItem.type}</span>
                    <Badge className={getStatusColor(selectedItem.status)}>{selectedItem.status}</Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{selectedItem.title}</h3>
                  <p className="text-gray-700">{selectedItem.content}</p>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Avatar>
                    <AvatarFallback>{selectedItem.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedItem.author.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(selectedItem.createdAt).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>

                {selectedItem.tags.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">العلامات</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItem.reports.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">البلاغات ({selectedItem.reports.length})</h4>
                    <div className="space-y-2">
                      {selectedItem.reports.map((report) => (
                        <div key={report.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-sm">{report.reason}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(report.reportedAt).toLocaleDateString("ar-EG")}
                            </span>
                          </div>
                          <span className="text-sm text-gray-600">بواسطة: {report.reportedBy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-medium">إجراءات الإدارة</h4>
                  <div className="flex gap-2">
                    <Button className="flex-1" onClick={() => handleApprove(selectedItem.id)}>
                      <Check className="h-4 w-4 ml-2" />
                      موافقة
                    </Button>
                    <Button variant="destructive" className="flex-1" onClick={() => handleReject(selectedItem.id)}>
                      <X className="h-4 w-4 ml-2" />
                      رفض
                    </Button>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => handleFlag(selectedItem.id)}>
                    <Flag className="h-4 w-4 ml-2" />
                    وضع علامة للمراجعة
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">ملاحظات الإدارة</h4>
                  <Textarea placeholder="أضف ملاحظات حول هذا المحتوى..." />
                  <Button className="mt-2">حفظ الملاحظات</Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">اختر محتوى لعرض التفاصيل</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
