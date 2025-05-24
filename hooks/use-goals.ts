"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import type { Goal, GoalFilters, GoalStats } from "@/types/goals"

interface UseGoalsReturn {
  goals: Goal[]
  stats: GoalStats
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
  updateGoal: (id: string, updates: Partial<Goal>) => Promise<void>
  deleteGoal: (id: string) => Promise<void>
  addContribution: (id: string, amount: number) => Promise<void>
}

// Mock data for demonstration
const mockGoals: Goal[] = [
  {
    id: "1",
    title: "صندوق الطوارئ",
    description: "ادخار 6 أشهر من المصروفات للطوارئ",
    targetAmount: 50000,
    currentAmount: 32000,
    deadline: "2024-12-31",
    category: "emergency-fund",
    priority: "high",
    status: "active",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-20",
    userId: "1",
    icon: "🛡️",
    color: "#4A90E2",
    milestones: [
      { id: "m1", title: "25% من الهدف", amount: 12500, completed: true, completedAt: "2024-01-10" },
      { id: "m2", title: "50% من الهدف", amount: 25000, completed: true, completedAt: "2024-01-15" },
      { id: "m3", title: "75% من الهدف", amount: 37500, completed: false },
    ],
  },
  {
    id: "2",
    title: "إجازة صيفية",
    description: "رحلة إلى تركيا مع العائلة",
    targetAmount: 25000,
    currentAmount: 8500,
    deadline: "2024-07-01",
    category: "vacation",
    priority: "medium",
    status: "active",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-18",
    userId: "1",
    icon: "✈️",
    color: "#F5A623",
  },
  {
    id: "3",
    title: "لابتوب جديد",
    description: "لابتوب للعمل والدراسة",
    targetAmount: 15000,
    currentAmount: 12000,
    deadline: "2024-03-15",
    category: "electronics",
    priority: "medium",
    status: "active",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-19",
    userId: "1",
    icon: "💻",
    color: "#34C759",
  },
  {
    id: "4",
    title: "دورة تدريبية",
    description: "دورة في التسويق الرقمي",
    targetAmount: 5000,
    currentAmount: 5000,
    deadline: "2024-02-01",
    category: "education",
    priority: "high",
    status: "completed",
    createdAt: "2023-12-01",
    updatedAt: "2024-01-25",
    userId: "1",
    icon: "📚",
    color: "#8E44AD",
  },
]

export function useGoals(filters?: GoalFilters): UseGoalsReturn {
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate API call
  const fetchGoals = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate potential error
      if (Math.random() < 0.1) {
        throw new Error("فشل في تحميل الأهداف")
      }

      setGoals(mockGoals)
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع")
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Filter and sort goals
  const filteredGoals = useMemo(() => {
    let filtered = [...goals]

    if (filters?.category) {
      filtered = filtered.filter((goal) => goal.category === filters.category)
    }

    if (filters?.priority) {
      filtered = filtered.filter((goal) => goal.priority === filters.priority)
    }

    if (filters?.status) {
      filtered = filtered.filter((goal) => goal.status === filters.status)
    }

    // Sort goals
    if (filters?.sortBy) {
      filtered.sort((a, b) => {
        let aValue: any, bValue: any

        switch (filters.sortBy) {
          case "deadline":
            aValue = new Date(a.deadline)
            bValue = new Date(b.deadline)
            break
          case "progress":
            aValue = (a.currentAmount / a.targetAmount) * 100
            bValue = (b.currentAmount / b.targetAmount) * 100
            break
          case "amount":
            aValue = a.targetAmount
            bValue = b.targetAmount
            break
          case "created":
            aValue = new Date(a.createdAt)
            bValue = new Date(b.createdAt)
            break
          default:
            return 0
        }

        if (filters.sortOrder === "desc") {
          return bValue > aValue ? 1 : -1
        }
        return aValue > bValue ? 1 : -1
      })
    }

    return filtered
  }, [goals, filters])

  // Calculate stats
  const stats = useMemo((): GoalStats => {
    const activeGoals = goals.filter((goal) => goal.status === "active")
    const completedGoals = goals.filter((goal) => goal.status === "completed")

    return {
      totalGoals: goals.length,
      activeGoals: activeGoals.length,
      completedGoals: completedGoals.length,
      totalTargetAmount: goals.reduce((sum, goal) => sum + goal.targetAmount, 0),
      totalCurrentAmount: goals.reduce((sum, goal) => sum + goal.currentAmount, 0),
      averageProgress:
        goals.length > 0
          ? (goals.reduce((sum, goal) => sum + goal.currentAmount / goal.targetAmount, 0) / goals.length) * 100
          : 0,
    }
  }, [goals])

  // Update goal
  const updateGoal = useCallback(async (id: string, updates: Partial<Goal>) => {
    try {
      setGoals((prev) =>
        prev.map((goal) => (goal.id === id ? { ...goal, ...updates, updatedAt: new Date().toISOString() } : goal)),
      )
    } catch (err) {
      setError("فشل في تحديث الهدف")
    }
  }, [])

  // Delete goal
  const deleteGoal = useCallback(async (id: string) => {
    try {
      setGoals((prev) => prev.filter((goal) => goal.id !== id))
    } catch (err) {
      setError("فشل في حذف الهدف")
    }
  }, [])

  // Add contribution
  const addContribution = useCallback(async (id: string, amount: number) => {
    try {
      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id === id) {
            const newAmount = Math.min(goal.currentAmount + amount, goal.targetAmount)
            const newStatus = newAmount >= goal.targetAmount ? "completed" : goal.status

            return {
              ...goal,
              currentAmount: newAmount,
              status: newStatus,
              updatedAt: new Date().toISOString(),
            }
          }
          return goal
        }),
      )
    } catch (err) {
      setError("فشل في إضافة المساهمة")
    }
  }, [])

  useEffect(() => {
    fetchGoals()
  }, [fetchGoals])

  return {
    goals: filteredGoals,
    stats,
    isLoading,
    error,
    refetch: fetchGoals,
    updateGoal,
    deleteGoal,
    addContribution,
  }
}
