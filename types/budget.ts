export interface Budget {
  id: string
  name: string
  period: "weekly" | "monthly" | "yearly"
  startDate: string
  endDate: string
  totalIncome: number
  totalExpenses: number
  categories: BudgetCategory[]
  status: "active" | "completed" | "draft"
  createdAt: string
  updatedAt: string
}

export interface BudgetCategory {
  id: string
  name: string
  budgetedAmount: number
  spentAmount: number
  icon: string
  color: string
  subcategories: BudgetSubcategory[]
}

export interface BudgetSubcategory {
  id: string
  name: string
  budgetedAmount: number
  spentAmount: number
}

export interface Transaction {
  id: string
  description: string
  amount: number
  type: "income" | "expense"
  categoryId: string
  subcategoryId?: string
  date: string
  paymentMethod: PaymentMethod
  location?: string
  notes?: string
  receipt?: string
  tags: string[]
  isRecurring: boolean
  recurringPattern?: RecurringPattern
}

export interface PaymentMethod {
  id: string
  name: string
  type: "cash" | "card" | "bank" | "digital"
  icon: string
}

export interface RecurringPattern {
  frequency: "daily" | "weekly" | "monthly" | "yearly"
  interval: number
  endDate?: string
}

export interface FinancialReport {
  id: string
  type: "monthly" | "quarterly" | "yearly"
  period: string
  totalIncome: number
  totalExpenses: number
  netIncome: number
  categoryBreakdown: CategoryBreakdown[]
  trends: Trend[]
  insights: Insight[]
}

export interface CategoryBreakdown {
  categoryId: string
  categoryName: string
  amount: number
  percentage: number
  change: number
}

export interface Trend {
  period: string
  income: number
  expenses: number
  savings: number
}

export interface Insight {
  type: "warning" | "tip" | "achievement"
  title: string
  description: string
  action?: string
}
