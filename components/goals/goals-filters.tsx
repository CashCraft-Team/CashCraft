"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from "lucide-react"
import type { GoalFilters } from "@/types/goals"

interface GoalsFiltersProps {
  filters: GoalFilters
  onFiltersChange: (filters: GoalFilters) => void
  className?: string
}

export const GoalsFilters = memo(function GoalsFilters({ filters, onFiltersChange, className }: GoalsFiltersProps) {
  const updateFilter = (key: keyof GoalFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const clearFilter = (key: keyof GoalFilters) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    onFiltersChange(newFilters)
  }

  const clearAllFilters = () => {
    onFiltersChange({})
  }

  const activeFiltersCount = Object.keys(filters).length

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.category || "all"}
          onValueChange={(value) => updateFilter("category", value || undefined)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="الفئة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفئات</SelectItem>
            <SelectItem value="emergency-fund">صندوق الطوارئ</SelectItem>
            <SelectItem value="vacation">إجازة</SelectItem>
            <SelectItem value="car">سيارة</SelectItem>
            <SelectItem value="house">منزل</SelectItem>
            <SelectItem value="education">تعليم</SelectItem>
            <SelectItem value="electronics">إلكترونيات</SelectItem>
            <SelectItem value="investment">استثمار</SelectItem>
            <SelectItem value="other">أخرى</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.priority || "all"}
          onValueChange={(value) => updateFilter("priority", value || undefined)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="الأولوية" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الأولويات</SelectItem>
            <SelectItem value="high">عالية</SelectItem>
            <SelectItem value="medium">متوسطة</SelectItem>
            <SelectItem value="low">منخفضة</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.status || "all"} onValueChange={(value) => updateFilter("status", value || undefined)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="الحالة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الحالات</SelectItem>
            <SelectItem value="active">نشط</SelectItem>
            <SelectItem value="completed">مكتمل</SelectItem>
            <SelectItem value="paused">متوقف</SelectItem>
            <SelectItem value="cancelled">ملغي</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.sortBy || "none"} onValueChange={(value) => updateFilter("sortBy", value || undefined)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="ترتيب حسب" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">بدون ترتيب</SelectItem>
            <SelectItem value="deadline">الموعد النهائي</SelectItem>
            <SelectItem value="progress">التقدم</SelectItem>
            <SelectItem value="amount">المبلغ</SelectItem>
            <SelectItem value="created">تاريخ الإنشاء</SelectItem>
          </SelectContent>
        </Select>

        {filters.sortBy && (
          <Select value={filters.sortOrder || "asc"} onValueChange={(value) => updateFilter("sortOrder", value)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">تصاعدي</SelectItem>
              <SelectItem value="desc">تنازلي</SelectItem>
            </SelectContent>
          </Select>
        )}

        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 ml-2" />
            مسح الكل ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.category && filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              فئة: {filters.category}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("category")} />
            </Badge>
          )}
          {filters.priority && filters.priority !== "all" && (
            <Badge variant="secondary" className="gap-1">
              أولوية: {filters.priority}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("priority")} />
            </Badge>
          )}
          {filters.status && filters.status !== "all" && (
            <Badge variant="secondary" className="gap-1">
              حالة: {filters.status}
              <X className="h-3 w-3 cursor-pointer" onClick={() => clearFilter("status")} />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
})
