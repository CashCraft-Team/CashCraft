"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Mail,
  Shield,
  Globe,
  Palette,
  Server,
  Upload,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"

interface SystemConfig {
  general: {
    siteName: string
    siteDescription: string
    adminEmail: string
    timezone: string
    language: string
    currency: string
    dateFormat: string
  }
  security: {
    twoFactorRequired: boolean
    passwordMinLength: number
    sessionTimeout: number
    maxLoginAttempts: number
    enableCaptcha: boolean
    allowRegistration: boolean
  }
  email: {
    provider: string
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  features: {
    enableCommunity: boolean
    enableLearning: boolean
    enableGoals: boolean
    enableBudget: boolean
    enableNotifications: boolean
    enableAnalytics: boolean
  }
  appearance: {
    primaryColor: string
    secondaryColor: string
    logoUrl: string
    faviconUrl: string
    customCSS: string
  }
  maintenance: {
    maintenanceMode: boolean
    maintenanceMessage: string
    allowedIPs: string[]
  }
}

const defaultConfig: SystemConfig = {
  general: {
    siteName: "Cash Craft",
    siteDescription: "منصة التثقيف المالي للشباب المصري",
    adminEmail: "admin@cashcraft.com",
    timezone: "Africa/Cairo",
    language: "ar",
    currency: "EGP",
    dateFormat: "dd/mm/yyyy",
  },
  security: {
    twoFactorRequired: false,
    passwordMinLength: 8,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    enableCaptcha: true,
    allowRegistration: true,
  },
  email: {
    provider: "smtp",
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "",
    smtpPassword: "",
    fromEmail: "noreply@cashcraft.com",
    fromName: "Cash Craft",
  },
  features: {
    enableCommunity: true,
    enableLearning: true,
    enableGoals: true,
    enableBudget: true,
    enableNotifications: true,
    enableAnalytics: true,
  },
  appearance: {
    primaryColor: "#4A90E2",
    secondaryColor: "#F5A623",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    customCSS: "",
  },
  maintenance: {
    maintenanceMode: false,
    maintenanceMessage: "الموقع تحت الصيانة، سنعود قريباً",
    allowedIPs: ["127.0.0.1"],
  },
}

export function SystemConfiguration() {
  const { t } = useI18n()
  const [config, setConfig] = useState<SystemConfig>(defaultConfig)
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const updateConfig = (section: keyof SystemConfig, field: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLastSaved(new Date())
      console.log("Configuration saved:", config)
    } catch (error) {
      console.error("Failed to save configuration:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleExportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "system-config.json"
    link.click()
  }

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target?.result as string)
          setConfig(importedConfig)
        } catch (error) {
          console.error("Failed to import configuration:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  const systemStatus = {
    database: "connected",
    email: "configured",
    storage: "healthy",
    cache: "active",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                إعدادات النظام
              </CardTitle>
              <p className="text-gray-600 mt-1">إدارة إعدادات وتكوين النظام</p>
            </div>
            <div className="flex gap-2">
              <input type="file" accept=".json" onChange={handleImportConfig} className="hidden" id="import-config" />
              <Button variant="outline" onClick={() => document.getElementById("import-config")?.click()}>
                <Upload className="h-4 w-4 ml-2" />
                استيراد
              </Button>
              <Button variant="outline" onClick={handleExportConfig}>
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4 ml-2" />
                )}
                {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
              </Button>
            </div>
          </div>
          {lastSaved && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <CheckCircle className="h-4 w-4" />
              آخر حفظ: {lastSaved.toLocaleString("ar-EG")}
            </div>
          )}
        </CardHeader>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            حالة النظام
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(systemStatus).map(([key, status]) => (
              <div key={key} className="flex items-center gap-3 p-3 border rounded-lg">
                <div
                  className={`w-3 h-3 rounded-full ${
                    status === "connected" || status === "configured" || status === "healthy" || status === "active"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                />
                <div>
                  <p className="font-medium capitalize">{key}</p>
                  <p className="text-sm text-gray-600">{status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Configuration Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">عام</TabsTrigger>
          <TabsTrigger value="security">الأمان</TabsTrigger>
          <TabsTrigger value="email">البريد</TabsTrigger>
          <TabsTrigger value="features">الميزات</TabsTrigger>
          <TabsTrigger value="appearance">المظهر</TabsTrigger>
          <TabsTrigger value="maintenance">الصيانة</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                الإعدادات العامة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">اسم الموقع</Label>
                  <Input
                    id="siteName"
                    value={config.general.siteName}
                    onChange={(e) => updateConfig("general", "siteName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">بريد المدير</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    value={config.general.adminEmail}
                    onChange={(e) => updateConfig("general", "adminEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">المنطقة الزمنية</Label>
                  <Select
                    value={config.general.timezone}
                    onValueChange={(value) => updateConfig("general", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Africa/Cairo">القاهرة (GMT+2)</SelectItem>
                      <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                      <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">العملة الافتراضية</Label>
                  <Select
                    value={config.general.currency}
                    onValueChange={(value) => updateConfig("general", "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EGP">جنيه مصري (EGP)</SelectItem>
                      <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                      <SelectItem value="EUR">يورو (EUR)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">وصف الموقع</Label>
                <Textarea
                  id="siteDescription"
                  value={config.general.siteDescription}
                  onChange={(e) => updateConfig("general", "siteDescription", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                إعدادات الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">المصادقة الثنائية الإجبارية</p>
                  <p className="text-sm text-gray-500">إجبار جميع المستخدمين على تفعيل المصادقة الثنائية</p>
                </div>
                <Switch
                  checked={config.security.twoFactorRequired}
                  onCheckedChange={(value) => updateConfig("security", "twoFactorRequired", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">السماح بالتسجيل</p>
                  <p className="text-sm text-gray-500">السماح للمستخدمين الجدد بإنشاء حسابات</p>
                </div>
                <Switch
                  checked={config.security.allowRegistration}
                  onCheckedChange={(value) => updateConfig("security", "allowRegistration", value)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">تفعيل الكابتشا</p>
                  <p className="text-sm text-gray-500">إضافة حماية الكابتشا في النماذج</p>
                </div>
                <Switch
                  checked={config.security.enableCaptcha}
                  onCheckedChange={(value) => updateConfig("security", "enableCaptcha", value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passwordMinLength">الحد الأدنى لطول كلمة المرور</Label>
                  <Input
                    id="passwordMinLength"
                    type="number"
                    value={config.security.passwordMinLength}
                    onChange={(e) => updateConfig("security", "passwordMinLength", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">انتهاء الجلسة (دقيقة)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={config.security.sessionTimeout}
                    onChange={(e) => updateConfig("security", "sessionTimeout", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">الحد الأقصى لمحاولات تسجيل الدخول</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={config.security.maxLoginAttempts}
                    onChange={(e) => updateConfig("security", "maxLoginAttempts", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                إعدادات البريد الإلكتروني
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">خادم SMTP</Label>
                  <Input
                    id="smtpHost"
                    value={config.email.smtpHost}
                    onChange={(e) => updateConfig("email", "smtpHost", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">منفذ SMTP</Label>
                  <Input
                    id="smtpPort"
                    type="number"
                    value={config.email.smtpPort}
                    onChange={(e) => updateConfig("email", "smtpPort", Number.parseInt(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">اسم المستخدم</Label>
                  <Input
                    id="smtpUser"
                    value={config.email.smtpUser}
                    onChange={(e) => updateConfig("email", "smtpUser", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPassword">كلمة المرور</Label>
                  <Input
                    id="smtpPassword"
                    type="password"
                    value={config.email.smtpPassword}
                    onChange={(e) => updateConfig("email", "smtpPassword", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">البريد المرسل</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={config.email.fromEmail}
                    onChange={(e) => updateConfig("email", "fromEmail", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">اسم المرسل</Label>
                  <Input
                    id="fromName"
                    value={config.email.fromName}
                    onChange={(e) => updateConfig("email", "fromName", e.target.value)}
                  />
                </div>
              </div>
              <Button variant="outline">
                <Mail className="h-4 w-4 ml-2" />
                اختبار إعدادات البريد
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تفعيل/إلغاء الميزات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(config.features).map(([feature, enabled]) => (
                <div key={feature} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium capitalize">{feature.replace("enable", "").replace(/([A-Z])/g, " $1")}</p>
                    <p className="text-sm text-gray-500">تفعيل أو إلغاء هذه الميزة</p>
                  </div>
                  <Switch checked={enabled} onCheckedChange={(value) => updateConfig("features", feature, value)} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                إعدادات المظهر
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">اللون الأساسي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={config.appearance.primaryColor}
                      onChange={(e) => updateConfig("appearance", "primaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={config.appearance.primaryColor}
                      onChange={(e) => updateConfig("appearance", "primaryColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondaryColor"
                      type="color"
                      value={config.appearance.secondaryColor}
                      onChange={(e) => updateConfig("appearance", "secondaryColor", e.target.value)}
                      className="w-16 h-10"
                    />
                    <Input
                      value={config.appearance.secondaryColor}
                      onChange={(e) => updateConfig("appearance", "secondaryColor", e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">رابط الشعار</Label>
                  <Input
                    id="logoUrl"
                    value={config.appearance.logoUrl}
                    onChange={(e) => updateConfig("appearance", "logoUrl", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="faviconUrl">رابط الأيقونة المفضلة</Label>
                  <Input
                    id="faviconUrl"
                    value={config.appearance.faviconUrl}
                    onChange={(e) => updateConfig("appearance", "faviconUrl", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="customCSS">CSS مخصص</Label>
                <Textarea
                  id="customCSS"
                  value={config.appearance.customCSS}
                  onChange={(e) => updateConfig("appearance", "customCSS", e.target.value)}
                  placeholder="/* أضف CSS مخصص هنا */"
                  className="h-32 font-mono"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                وضع الصيانة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                <div>
                  <p className="font-medium">تفعيل وضع الصيانة</p>
                  <p className="text-sm text-gray-600">سيتم إخفاء الموقع عن المستخدمين العاديين</p>
                </div>
                <Switch
                  checked={config.maintenance.maintenanceMode}
                  onCheckedChange={(value) => updateConfig("maintenance", "maintenanceMode", value)}
                />
              </div>

              {config.maintenance.maintenanceMode && (
                <div className="space-y-4 p-4 border rounded-lg bg-red-50">
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">تحذير: وضع الصيانة مفعل</span>
                  </div>
                  <p className="text-sm text-red-600">الموقع حالياً في وضع الصيانة ولن يكون متاحاً للمستخدمين العاديين</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">رسالة الصيانة</Label>
                <Textarea
                  id="maintenanceMessage"
                  value={config.maintenance.maintenanceMessage}
                  onChange={(e) => updateConfig("maintenance", "maintenanceMessage", e.target.value)}
                  placeholder="أدخل الرسالة التي ستظهر للمستخدمين أثناء الصيانة"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowedIPs">عناوين IP المسموحة (مفصولة بفواصل)</Label>
                <Input
                  id="allowedIPs"
                  value={config.maintenance.allowedIPs.join(", ")}
                  onChange={(e) =>
                    updateConfig(
                      "maintenance",
                      "allowedIPs",
                      e.target.value.split(",").map((ip) => ip.trim()),
                    )
                  }
                  placeholder="127.0.0.1, 192.168.1.1"
                />
                <p className="text-xs text-gray-500">عناوين IP هذه ستتمكن من الوصول للموقع حتى أثناء الصيانة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
