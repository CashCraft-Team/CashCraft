"use client"

import { memo, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { MoreHorizontal, Plus, Calendar, Target, Edit, Trash2, CheckCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Goal } from "@/types/goals"

interface GoalCardProps {
  goal: Goal
  onUpdate?: (id: string, updates: Partial<Goal>) => void
  onDelete?: (id: string) => void
  onAddContribution?: (id: string, amount: number) => void
  className?: string
}

export const GoalCard = memo(function GoalCard({
  goal,
  onUpdate,
  onDelete,
  onAddContribution,
  className,
}: GoalCardProps) {
  const [contributionAmount, setContributionAmount] = useState("")
  const [isContributionOpen, setIsContributionOpen] = useState(false)

  const progress = (goal.currentAmount / goal.targetAmount) * 100
  const remainingAmount = goal.targetAmount - goal.currentAmount
  const daysRemaining = Math.ceil((new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const handleAddContribution = () => {
    const amount = Number.parseFloat(contributionAmount)
    if (amount > 0 && onAddContribution) {
      onAddContribution(goal.id, amount)
      setContributionAmount("")
      setIsContributionOpen(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${goal.color}20` }}
            >
              {goal.icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg">{goal.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{goal.description}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onUpdate?.(goal.id, {})}>
                <Edit className="h-4 w-4 ml-2" />
                تعديل
              </DropdownMenuItem>
              {goal.status === "completed" && (
                <DropdownMenuItem onClick={() => onUpdate?.(goal.id, { status: "active" })}>
                  <Target className="h-4 w-4 ml-2" />
                  إعادة تفعيل
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onDelete?.(goal.id)} className="text-red-600">
                <Trash2 className="h-4 w-4 ml-2" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <Badge className={getPriorityColor(goal.priority)}>
            {goal.priority === "high" ? "عالية" : goal.priority === "medium" ? "متوسطة" : "منخفضة"}
          </Badge>
          <Badge className={getStatusColor(goal.status)}>
            {goal.status === "completed"
              ? "مكتمل"
              : goal.status === "active"
                ? "نشط"
                : goal.status === "paused"
                  ? "متوقف"
                  : "ملغي"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">التقدم</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{goal.currentAmount.toLocaleString()} ج.م</span>
            <span>{goal.targetAmount.toLocaleString()} ج.م</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-gray-600">المتبقي</p>
              <p className="font-medium">{remainingAmount.toLocaleString()} ج.م</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-gray-600">الموعد النهائي</p>
              <p className={`font-medium ${daysRemaining < 30 ? "text-red-600" : ""}`}>
                {daysRemaining > 0 ? `${daysRemaining} يوم` : "منتهي"}
              </p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        {goal.milestones && goal.milestones.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">المعالم</h4>
            <div className="space-y-1">
              {goal.milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center gap-2 text-xs">
                  <CheckCircle className={`h-3 w-3 ${milestone.completed ? "text-green-500" : "text-gray-300"}`} />
                  <span className={milestone.completed ? "line-through text-gray-500" : ""}>{milestone.title}</span>
                  <span className="text-gray-400">({milestone.amount.toLocaleString()} ج.م)</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {goal.status === "active" && (
          <div className="flex gap-2 pt-2">
            <Dialog open={isContributionOpen} onOpenChange={setIsContributionOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="flex-1">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة مبلغ
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>إضافة مساهمة</DialogTitle>
                  <DialogDescription>أضف مبلغاً إلى هدف "{goal.title}"</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">المبلغ (ج.م)</label>
                    <Input
                      type="number"
                      value={contributionAmount}
                      onChange={(e) => setContributionAmount(e.target.value)}
                      placeholder="أدخل المبلغ"
                      min="0"
                      max={remainingAmount}
                    />
                  </div>
                  <div className="text-xs text-gray-500">المبلغ المتبقي: {remainingAmount.toLocaleString()} ج.م</div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsContributionOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleAddContribution}>إضافة</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" size="sm" onClick={() => onUpdate?.(goal.id, { status: "paused" })}>
              إيقاف مؤقت
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
})
