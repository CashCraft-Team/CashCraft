"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Shield, Bell, Palette, Download, Trash2, Camera, Key, Smartphone, Mail, Moon, Sun } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useI18n } from "@/hooks/use-i18n"

export function AccountSettings() {
  const { user } = useAuth()
  const { t, language, changeLanguage } = useI18n()
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    location: "",
    website: "",
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: "30",
    passwordExpiry: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    budget: true,
    goals: true,
    learning: true,
    community: true,
    marketing: false,
  })

  const [preferences, setPreferences] = useState({
    language: "ar",
    currency: "EGP",
    timezone: "Africa/Cairo",
    theme: "light",
    dateFormat: "dd/mm/yyyy",
    numberFormat: "1,234.56",
  })

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSecurityUpdate = (field: string, value: boolean | string) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handlePreferenceUpdate = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>إعدادات الحساب</CardTitle>
          <p className="text-gray-600">إدارة معلومات حسابك وتفضيلاتك</p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            الملف الشخصي
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            الأمان
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            الإشعارات
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            التفضيلات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>المعلومات الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-trust text-white text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Camera className="h-4 w-4 ml-2" />
                    تغيير الصورة
                  </Button>
                  <p className="text-xs text-gray-500">JPG, PNG أو GIF (الحد الأقصى 5MB)</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">المستوى {user?.level}</Badge>
                    <Badge variant="outline">{user?.points} نقطة</Badge>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleProfileUpdate("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleProfileUpdate("email", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleProfileUpdate("phone", e.target.value)}
                    placeholder="+20 1xxxxxxxxx"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">الموقع</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleProfileUpdate("location", e.target.value)}
                    placeholder="القاهرة، مصر"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website">الموقع الإلكتروني</Label>
                  <Input
                    id="website"
                    value={profileData.website}
                    onChange={(e) => handleProfileUpdate("website", e.target.value)}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">نبذة شخصية</Label>
                  <textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                    placeholder="اكتب نبذة مختصرة عنك..."
                    className="w-full p-3 border rounded-md resize-none h-24"
                  />
                </div>
              </div>

              <Button className="w-full">حفظ التغييرات</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>كلمة المرور</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">كلمة المرور الحالية</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">كلمة المرور الجديدة</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">تأكيد كلمة المرور</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <Button>
                <Key className="h-4 w-4 ml-2" />
                تحديث كلمة المرور
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المصادقة الثنائية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تفعيل المصادقة الثنائية</p>
                  <p className="text-sm text-gray-500">حماية إضافية لحسابك</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorEnabled}
                  onCheckedChange={(value) => handleSecurityUpdate("twoFactorEnabled", value)}
                />
              </div>
              {securitySettings.twoFactorEnabled && (
                <Button variant="outline">
                  <Smartphone className="h-4 w-4 ml-2" />
                  إعداد التطبيق المصدق
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>إعدادات الجلسة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تنبيهات تسجيل الدخول</p>
                  <p className="text-sm text-gray-500">إشعار عند تسجيل الدخول من جهاز جديد</p>
                </div>
                <Switch
                  checked={securitySettings.loginAlerts}
                  onCheckedChange={(value) => handleSecurityUpdate("loginAlerts", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">انتهاء صلاحية كلمة المرور</p>
                  <p className="text-sm text-gray-500">طلب تغيير كلمة المرور كل 90 يوم</p>
                </div>
                <Switch
                  checked={securitySettings.passwordExpiry}
                  onCheckedChange={(value) => handleSecurityUpdate("passwordExpiry", value)}
                />
              </div>

              <Button variant="outline" className="w-full">
                عرض الجلسات النشطة
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>طرق الإشعار</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">البريد الإلكتروني</p>
                    <p className="text-sm text-gray-500">إشعارات عبر البريد الإلكتروني</p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings.email}
                  onCheckedChange={(value) => handleNotificationUpdate("email", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">إشعارات الهاتف</p>
                    <p className="text-sm text-gray-500">إشعارات فورية على الهاتف</p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings.push}
                  onCheckedChange={(value) => handleNotificationUpdate("push", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="font-medium">الرسائل النصية</p>
                    <p className="text-sm text-gray-500">إشعارات عبر SMS</p>
                  </div>
                </div>
                <Switch
                  checked={notificationSettings.sms}
                  onCheckedChange={(value) => handleNotificationUpdate("sms", value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>أنواع الإشعارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "budget", label: "تنبيهات الميزانية", desc: "عند تجاوز حدود الإنفاق" },
                { key: "goals", label: "تحديثات الأهداف", desc: "تقدم الأهداف والإنجازات" },
                { key: "learning", label: "محتوى تعليمي جديد", desc: "دورات ومقالات جديدة" },
                { key: "community", label: "نشاط المجتمع", desc: "ردود ومناقشات جديدة" },
                { key: "marketing", label: "العروض والتسويق", desc: "عروض خاصة ونصائح مالية" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notificationSettings[item.key as keyof typeof notificationSettings] as boolean}
                    onCheckedChange={(value) => handleNotificationUpdate(item.key, value)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>اللغة والمنطقة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>اللغة</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value as "ar" | "en")}
                  >
                    <option value="ar">العربية</option>
                    <option value="en">English</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>العملة</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={preferences.currency}
                    onChange={(e) => handlePreferenceUpdate("currency", e.target.value)}
                  >
                    <option value="EGP">جنيه مصري (ج.م)</option>
                    <option value="USD">دولار أمريكي ($)</option>
                    <option value="EUR">يورو (€)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>المنطقة الزمنية</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={preferences.timezone}
                    onChange={(e) => handlePreferenceUpdate("timezone", e.target.value)}
                  >
                    <option value="Africa/Cairo">القاهرة (GMT+2)</option>
                    <option value="Asia/Dubai">دبي (GMT+4)</option>
                    <option value="Asia/Riyadh">الرياض (GMT+3)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>تنسيق التاريخ</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={preferences.dateFormat}
                    onChange={(e) => handlePreferenceUpdate("dateFormat", e.target.value)}
                  >
                    <option value="dd/mm/yyyy">يوم/شهر/سنة</option>
                    <option value="mm/dd/yyyy">شهر/يوم/سنة</option>
                    <option value="yyyy-mm-dd">سنة-شهر-يوم</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>المظهر</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {preferences.theme === "light" ? (
                    <Sun className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-gray-500" />
                  )}
                  <div>
                    <p className="font-medium">المظهر</p>
                    <p className="text-sm text-gray-500">اختر المظهر المفضل</p>
                  </div>
                </div>
                <select
                  className="p-2 border rounded-md"
                  value={preferences.theme}
                  onChange={(e) => handlePreferenceUpdate("theme", e.target.value)}
                >
                  <option value="light">فاتح</option>
                  <option value="dark">داكن</option>
                  <option value="auto">تلقائي</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>البيانات والخصوصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 ml-2" />
                تصدير بياناتي
              </Button>

              <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                <Trash2 className="h-4 w-4 ml-2" />
                حذف الحساب نهائياً
              </Button>

              <p className="text-xs text-gray-500">
                حذف الحساب سيؤدي إلى فقدان جميع البيانات نهائياً ولا يمكن التراجع عن هذا الإجراء.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
