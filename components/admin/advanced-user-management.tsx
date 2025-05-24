"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Shield,
  Crown,
  Users,
  TrendingUp,
  Download,
  Upload,
} from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"

interface ExtendedUser {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  role: "user" | "admin" | "moderator"
  status: "active" | "inactive" | "banned" | "pending"
  level: number
  points: number
  badges: string[]
  joinedAt: string
  lastLoginAt: string
  location?: string
  isEmailVerified: boolean
  isPhoneVerified: boolean
  twoFactorEnabled: boolean
  loginCount: number
  coursesCompleted: number
  goalsAchieved: number
  communityPosts: number
  totalSpent: number
  notes: string
}

const mockUsers: ExtendedUser[] = [
  {
    id: "1",
    name: "أحمد محمد علي",
    email: "ahmed@example.com",
    phone: "+201234567890",
    role: "user",
    status: "active",
    level: 5,
    points: 1250,
    badges: ["first-budget", "savings-goal"],
    joinedAt: "2023-01-15",
    lastLoginAt: "2024-01-20T10:30:00Z",
    location: "القاهرة، مصر",
    isEmailVerified: true,
    isPhoneVerified: false,
    twoFactorEnabled: true,
    loginCount: 45,
    coursesCompleted: 3,
    goalsAchieved: 2,
    communityPosts: 8,
    totalSpent: 15000,
    notes: "مستخدم نشط ومتفاعل",
  },
  {
    id: "2",
    name: "فاطمة حسن",
    email: "fatima@example.com",
    phone: "+201987654321",
    role: "moderator",
    status: "active",
    level: 8,
    points: 2890,
    badges: ["moderator", "helpful-member", "course-master"],
    joinedAt: "2022-11-10",
    lastLoginAt: "2024-01-20T08:15:00Z",
    location: "الإسكندرية، مصر",
    isEmailVerified: true,
    isPhoneVerified: true,
    twoFactorEnabled: true,
    loginCount: 120,
    coursesCompleted: 8,
    goalsAchieved: 5,
    communityPosts: 25,
    totalSpent: 45000,
    notes: "مشرفة ممتازة ومساعدة للمجتمع",
  },
  {
    id: "3",
    name: "محمد سعد",
    email: "mohamed@example.com",
    role: "user",
    status: "banned",
    level: 2,
    points: 150,
    badges: [],
    joinedAt: "2024-01-01",
    lastLoginAt: "2024-01-10T14:20:00Z",
    location: "الجيزة، مصر",
    isEmailVerified: false,
    isPhoneVerified: false,
    twoFactorEnabled: false,
    loginCount: 5,
    coursesCompleted: 0,
    goalsAchieved: 0,
    communityPosts: 1,
    totalSpent: 0,
    notes: "تم حظره بسبب انتهاك قوانين المجتمع",
  },
]

export function AdvancedUserManagement() {
  const { t } = useI18n()
  const [users, setUsers] = useState<ExtendedUser[]>(mockUsers)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("joinedAt")
  const [selectedUser, setSelectedUser] = useState<ExtendedUser | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredUsers = useMemo(() => {
    let filtered = users

    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.phone?.includes(searchQuery),
      )
    }

    if (selectedRole !== "all") {
      filtered = filtered.filter((user) => user.role === selectedRole)
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((user) => user.status === selectedStatus)
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "email":
          return a.email.localeCompare(b.email)
        case "points":
          return b.points - a.points
        case "level":
          return b.level - a.level
        case "lastLogin":
          return new Date(b.lastLoginAt).getTime() - new Date(a.lastLoginAt).getTime()
        default: // joinedAt
          return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime()
      }
    })
  }, [users, searchQuery, selectedRole, selectedStatus, sortBy])

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      banned: users.filter((u) => u.status === "banned").length,
      admins: users.filter((u) => u.role === "admin").length,
      moderators: users.filter((u) => u.role === "moderator").length,
      newThisMonth: users.filter((u) => {
        const joinDate = new Date(u.joinedAt)
        const now = new Date()
        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
      }).length,
    }
  }, [users])

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800"
      case "moderator":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "banned":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4" />
      case "moderator":
        return <Shield className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const handleUserAction = (userId: string, action: string) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "activate":
              return { ...user, status: "active" as const }
            case "deactivate":
              return { ...user, status: "inactive" as const }
            case "ban":
              return { ...user, status: "banned" as const }
            case "unban":
              return { ...user, status: "active" as const }
            case "makeAdmin":
              return { ...user, role: "admin" as const }
            case "makeModerator":
              return { ...user, role: "moderator" as const }
            case "makeUser":
              return { ...user, role: "user" as const }
            default:
              return user
          }
        }
        return user
      }),
    )
  }

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-EG")
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("ar-EG")
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                <p className="text-2xl font-bold">{stats.total}</p>
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
                <p className="text-sm text-gray-600">نشط</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Ban className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">محظور</p>
                <p className="text-2xl font-bold">{stats.banned}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Crown className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مديرون</p>
                <p className="text-2xl font-bold">{stats.admins}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Shield className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">مشرفون</p>
                <p className="text-2xl font-bold">{stats.moderators}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">جديد هذا الشهر</p>
                <p className="text-2xl font-bold">{stats.newThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>إدارة المستخدمين المتقدمة</CardTitle>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <Button variant="outline">
                <Upload className="h-4 w-4 ml-2" />
                استيراد
              </Button>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="h-4 w-4 ml-2" />
                    مستخدم جديد
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>إضافة مستخدم جديد</DialogTitle>
                    <DialogDescription>أدخل بيانات المستخدم الجديد</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newUserName">الاسم</Label>
                      <Input id="newUserName" placeholder="أدخل الاسم الكامل" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newUserEmail">البريد الإلكتروني</Label>
                      <Input id="newUserEmail" type="email" placeholder="أدخل البريد الإلكتروني" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newUserRole">الدور</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الدور" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">مستخدم</SelectItem>
                          <SelectItem value="moderator">مشرف</SelectItem>
                          <SelectItem value="admin">مدير</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={() => setIsCreateDialogOpen(false)}>إضافة المستخدم</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="البحث بالاسم، البريد، أو الهاتف..."
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
              <Select value={selectedRole} onValueChange={setSelectedRole}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="الدور" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأدوار</SelectItem>
                  <SelectItem value="user">مستخدم</SelectItem>
                  <SelectItem value="moderator">مشرف</SelectItem>
                  <SelectItem value="admin">مدير</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                  <SelectItem value="banned">محظور</SelectItem>
                  <SelectItem value="pending">في انتظار التفعيل</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joinedAt">تاريخ التسجيل</SelectItem>
                  <SelectItem value="lastLogin">آخر دخول</SelectItem>
                  <SelectItem value="name">الاسم</SelectItem>
                  <SelectItem value="email">البريد</SelectItem>
                  <SelectItem value="points">النقاط</SelectItem>
                  <SelectItem value="level">المستوى</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-r from-trust to-aspiration text-white">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{user.name}</h4>
                        <Badge className={getRoleColor(user.role)}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1">{user.role}</span>
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                        {user.twoFactorEnabled && (
                          <Badge variant="outline" className="text-green-600">
                            <Shield className="h-3 w-3 ml-1" />
                            2FA
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {user.email}
                          {user.isEmailVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
                        </div>
                        {user.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                            {user.isPhoneVerified && <CheckCircle className="h-3 w-3 text-green-500" />}
                          </div>
                        )}
                        {user.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {user.location}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>انضم: {formatDate(user.joinedAt)}</span>
                        <span>آخر دخول: {formatDateTime(user.lastLoginAt)}</span>
                        <span>المستوى: {user.level}</span>
                        <span>النقاط: {user.points}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {user.status === "active" ? (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "deactivate")}>
                            <XCircle className="h-4 w-4 ml-2" />
                            إلغاء التفعيل
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "activate")}>
                            <CheckCircle className="h-4 w-4 ml-2" />
                            تفعيل
                          </DropdownMenuItem>
                        )}
                        {user.status === "banned" ? (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "unban")}>
                            <CheckCircle className="h-4 w-4 ml-2" />
                            إلغاء الحظر
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "ban")}>
                            <Ban className="h-4 w-4 ml-2" />
                            حظر
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, "makeAdmin")}>
                          <Crown className="h-4 w-4 ml-2" />
                          جعله مدير
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, "makeModerator")}>
                          <Shield className="h-4 w-4 ml-2" />
                          جعله مشرف
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleUserAction(user.id, "makeUser")}>
                          <Users className="h-4 w-4 ml-2" />
                          جعله مستخدم عادي
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 ml-2" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* User Stats */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-blue-50 rounded">
                    <p className="font-medium text-blue-600">{user.coursesCompleted}</p>
                    <p className="text-blue-500">دورات مكتملة</p>
                  </div>
                  <div className="text-center p-2 bg-green-50 rounded">
                    <p className="font-medium text-green-600">{user.goalsAchieved}</p>
                    <p className="text-green-500">أهداف محققة</p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded">
                    <p className="font-medium text-purple-600">{user.communityPosts}</p>
                    <p className="text-purple-500">منشورات</p>
                  </div>
                  <div className="text-center p-2 bg-orange-50 rounded">
                    <p className="font-medium text-orange-600">{user.loginCount}</p>
                    <p className="text-orange-500">مرات الدخول</p>
                  </div>
                </div>

                {user.notes && (
                  <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
                    <strong>ملاحظات:</strong> {user.notes}
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">لا توجد مستخدمين تطابق المعايير المحددة</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
            <DialogDescription>تعديل معلومات وإعدادات المستخدم</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">البيانات الأساسية</TabsTrigger>
                <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
                <TabsTrigger value="activity">النشاط</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editName">الاسم</Label>
                    <Input id="editName" defaultValue={selectedUser.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editEmail">البريد الإلكتروني</Label>
                    <Input id="editEmail" type="email" defaultValue={selectedUser.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editPhone">رقم الهاتف</Label>
                    <Input id="editPhone" defaultValue={selectedUser.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editLocation">الموقع</Label>
                    <Input id="editLocation" defaultValue={selectedUser.location} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editNotes">ملاحظات</Label>
                  <Textarea id="editNotes" defaultValue={selectedUser.notes} />
                </div>
              </TabsContent>

              <TabsContent value="permissions" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تفعيل الحساب</p>
                      <p className="text-sm text-gray-500">السماح للمستخدم بالدخول</p>
                    </div>
                    <Switch defaultChecked={selectedUser.status === "active"} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تأكيد البريد الإلكتروني</p>
                      <p className="text-sm text-gray-500">البريد الإلكتروني مؤكد</p>
                    </div>
                    <Switch defaultChecked={selectedUser.isEmailVerified} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">تأكيد رقم الهاتف</p>
                      <p className="text-sm text-gray-500">رقم الهاتف مؤكد</p>
                    </div>
                    <Switch defaultChecked={selectedUser.isPhoneVerified} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editRole">الدور</Label>
                    <Select defaultValue={selectedUser.role}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">مستخدم</SelectItem>
                        <SelectItem value="moderator">مشرف</SelectItem>
                        <SelectItem value="admin">مدير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>تاريخ التسجيل</Label>
                    <Input value={formatDate(selectedUser.joinedAt)} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>آخر دخول</Label>
                    <Input value={formatDateTime(selectedUser.lastLoginAt)} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>عدد مرات الدخول</Label>
                    <Input value={selectedUser.loginCount} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>المستوى الحالي</Label>
                    <Input value={selectedUser.level} disabled />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">إحصائيات التعلم</h4>
                    <p className="text-sm text-gray-600">الدورات المكتملة: {selectedUser.coursesCompleted}</p>
                    <p className="text-sm text-gray-600">النقاط المكتسبة: {selectedUser.points}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">النشاط المجتمعي</h4>
                    <p className="text-sm text-gray-600">المنشورات: {selectedUser.communityPosts}</p>
                    <p className="text-sm text-gray-600">الأهداف المحققة: {selectedUser.goalsAchieved}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={() => setIsEditDialogOpen(false)}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
