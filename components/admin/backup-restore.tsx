"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Database, Download, RefreshCw, Clock, Trash2, Calendar, HardDrive, Shield } from "lucide-react"
import { useI18n } from "@/hooks/use-i18n"

interface Backup {
  id: string
  name: string
  type: "full" | "partial" | "database"
  size: string
  createdAt: string
  status: "completed" | "in-progress" | "failed"
  description?: string
}

const mockBackups: Backup[] = [
  {
    id: "1",
    name: "نسخة احتياطية كاملة - يونيو 2024",
    type: "full",
    size: "2.4 GB",
    createdAt: "2024-06-15T10:30:00Z",
    status: "completed",
    description: "نسخة احتياطية شاملة تتضمن قاعدة البيانات والملفات",
  },
  {
    id: "2",
    name: "نسخة قاعدة البيانات - يونيو 2024",
    type: "database",
    size: "450 MB",
    createdAt: "2024-06-14T08:15:00Z",
    status: "completed",
    description: "نسخة احتياطية لقاعدة البيانات فقط",
  },
  {
    id: "3",
    name: "نسخة احتياطية جزئية - يونيو 2024",
    type: "partial",
    size: "1.1 GB",
    createdAt: "2024-06-13T14:45:00Z",
    status: "failed",
    description: "نسخة احتياطية للمحتوى التعليمي والمستخدمين",
  },
]

export function BackupRestore() {
  const { t } = useI18n()
  const [backups, setBackups] = useState<Backup[]>(mockBackups)
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [backupProgress, setBackupProgress] = useState(0)
  const [selectedBackupType, setSelectedBackupType] = useState("full")
  const [backupName, setBackupName] = useState("")
  const [backupDescription, setBackupDescription] = useState("")
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true)
  const [autoBackupFrequency, setAutoBackupFrequency] = useState("daily")

  const handleCreateBackup = async () => {
    setIsCreatingBackup(true)
    setBackupProgress(0)

    // Simulate backup creation progress
    const interval = setInterval(() => {
      setBackupProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCreatingBackup(false)

          // Add new backup to list
          const newBackup: Backup = {
            id: Date.now().toString(),
            name: backupName || `نسخة احتياطية ${selectedBackupType} - ${new Date().toLocaleDateString("ar-EG")}`,
            type: selectedBackupType as "full" | "partial" | "database",
            size: selectedBackupType === "full" ? "2.1 GB" : selectedBackupType === "database" ? "420 MB" : "980 MB",
            createdAt: new Date().toISOString(),
            status: "completed",
            description: backupDescription,
          }

          setBackups((prev) => [newBackup, ...prev])
          setBackupName("")
          setBackupDescription("")

          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handleDeleteBackup = (id: string) => {
    setBackups((prev) => prev.filter((backup) => backup.id !== id))
  }

  const handleDownloadBackup = (backup: Backup) => {
    console.log(`Downloading backup: ${backup.name}`)
    // Simulate download
  }

  const handleRestoreBackup = (backup: Backup) => {
    console.log(`Restoring backup: ${backup.name}`)
    // Simulate restore process
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "full":
        return <HardDrive className="h-4 w-4" />
      case "database":
        return <Database className="h-4 w-4" />
      case "partial":
        return <Shield className="h-4 w-4" />
      default:
        return <Database className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            النسخ الاحتياطي والاستعادة
          </CardTitle>
          <p className="text-gray-600">إدارة النسخ الاحتياطية واستعادة البيانات</p>
        </CardHeader>
      </Card>

      {/* Create Backup */}
      <Card>
        <CardHeader>
          <CardTitle>إنشاء نسخة احتياطية جديدة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="backupName">اسم النسخة الاحتياطية</Label>
              <Input
                id="backupName"
                value={backupName}
                onChange={(e) => setBackupName(e.target.value)}
                placeholder="أدخل اسم النسخة الاحتياطية"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupType">نوع النسخة الاحتياطية</Label>
              <Select value={selectedBackupType} onValueChange={setSelectedBackupType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">نسخة كاملة</SelectItem>
                  <SelectItem value="database">قاعدة البيانات فقط</SelectItem>
                  <SelectItem value="partial">نسخة جزئية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="backupDescription">الوصف (اختياري)</Label>
            <Textarea
              id="backupDescription"
              value={backupDescription}
              onChange={(e) => setBackupDescription(e.target.value)}
              placeholder="أدخل وصف للنسخة الاحتياطية"
            />
          </div>

          {isCreatingBackup && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>جاري إنشاء النسخة الاحتياطية...</span>
                <span>{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="h-2" />
            </div>
          )}

          <Button onClick={handleCreateBackup} disabled={isCreatingBackup} className="w-full sm:w-auto">
            {isCreatingBackup ? (
              <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
            ) : (
              <Database className="h-4 w-4 ml-2" />
            )}
            {isCreatingBackup ? "جاري الإنشاء..." : "إنشاء نسخة احتياطية"}
          </Button>
        </CardContent>
      </Card>

      {/* Auto Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle>إعدادات النسخ الاحتياطي التلقائي</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">تفعيل النسخ الاحتياطي التلقائي</p>
              <p className="text-sm text-gray-500">إنشاء نسخ احتياطية تلقائياً حسب الجدولة المحددة</p>
            </div>
            <Switch checked={autoBackupEnabled} onCheckedChange={setAutoBackupEnabled} />
          </div>

          {autoBackupEnabled && (
            <div className="space-y-4 p-4 border rounded-lg bg-blue-50">
              <div className="space-y-2">
                <Label htmlFor="frequency">تكرار النسخ الاحتياطي</Label>
                <Select value={autoBackupFrequency} onValueChange={setAutoBackupFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">كل ساعة</SelectItem>
                    <SelectItem value="daily">يومياً</SelectItem>
                    <SelectItem value="weekly">أسبوعياً</SelectItem>
                    <SelectItem value="monthly">شهرياً</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-blue-600">
                <Clock className="h-4 w-4 inline ml-1" />
                النسخة الاحتياطية التالية: غداً في الساعة 2:00 صباحاً
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Backup List */}
      <Card>
        <CardHeader>
          <CardTitle>النسخ الاحتياطية المتاحة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backups.map((backup) => (
              <div
                key={backup.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 rounded-lg bg-blue-100 text-blue-600">{getTypeIcon(backup.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm">{backup.name}</h3>
                    {backup.description && <p className="text-xs text-gray-500 mt-1">{backup.description}</p>}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(backup.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                      <span className="flex items-center gap-1">
                        <HardDrive className="h-3 w-3" />
                        {backup.size}
                      </span>
                      <Badge className={getStatusColor(backup.status)}>
                        {backup.status === "completed"
                          ? "مكتملة"
                          : backup.status === "in-progress"
                            ? "قيد التنفيذ"
                            : "فشلت"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  {backup.status === "completed" && (
                    <>
                      <Button variant="outline" size="sm" onClick={() => handleDownloadBackup(backup)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>تأكيد الاستعادة</AlertDialogTitle>
                            <AlertDialogDescription>
                              هل أنت متأكد من أنك تريد استعادة هذه النسخة الاحتياطية؟ سيتم استبدال البيانات الحالية.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleRestoreBackup(backup)}>استعادة</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                        <AlertDialogDescription>
                          هل أنت متأكد من أنك تريد حذف هذه النسخة الاحتياطية؟ لا يمكن التراجع عن هذا الإجراء.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteBackup(backup.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          حذف
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
