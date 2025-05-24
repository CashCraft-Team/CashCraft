export interface Goal {
  id: string
  title: string
  description: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: GoalCategory
  priority: GoalPriority
  status: GoalStatus
  createdAt: string
  updatedAt: string
  userId: string
  icon?: string
  color?: string
  milestones?: Milestone[]
}

export interface Milestone {
  id: string
  title: string
  amount: number
  completed: boolean
  completedAt?: string
}

export type GoalCategory =
  | "emergency-fund"
  | "vacation"
  | "car"
  | "house"
  | "education"
  | "electronics"
  | "investment"
  | "other"

export type GoalPriority = "low" | "medium" | "high"

export type GoalStatus = "active" | "completed" | "paused" | "cancelled"

export interface GoalFilters {
  category?: GoalCategory
  priority?: GoalPriority
  status?: GoalStatus
  sortBy?: "deadline" | "progress" | "amount" | "created"
  sortOrder?: "asc" | "desc"
}

export interface GoalStats {
  totalGoals: number
  activeGoals: number
  completedGoals: number
  totalTargetAmount: number
  totalCurrentAmount: number
  averageProgress: number
}
