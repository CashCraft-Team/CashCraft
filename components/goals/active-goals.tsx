"use client"

import { memo, useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { GoalCard } from "./goal-card"
import { GoalsFilters } from "./goals-filters"
import { useGoals } from "@/hooks/use-goals"
import { useDebounce } from "@/hooks/use-debounce"
import { useTranslation } from "react-i18next"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  AlertCircle,
  Target,
  TrendingUp,
  Filter,
  Grid,
  MoreHorizontal,
  Download,
  Archive,
} from "lucide-react"
import type { GoalFilters } from "@/types/goals"

interface ActiveGoalsProps {
  viewMode?: "grid" | "list"
  setViewMode?: (viewMode: "grid" | "list") => void
  className?: string
  showFilters?: boolean
  showStats?: boolean
  maxItems?: number
}

export const ActiveGoals = memo(function ActiveGoals({
  className,
  showFilters = true,
  showStats = true,
  maxItems,
}: ActiveGoalsProps) {
  const { t } = useTranslation()
  const [filters, setFilters] = useState<GoalFilters>({ status: "active" })
  const [searchQuery, setSearchQuery] = useState("")

  const debouncedSearch = useDebounce(searchQuery, 300)

  const { goals, stats, isLoading, error, refetch, updateGoal, deleteGoal, addContribution } = useGoals(filters)

  // Filter goals by search query
  const filteredGoals = useMemo(() => {
    let filtered = goals

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      filtered = filtered.filter(
        (goal) => goal.title.toLowerCase().includes(query) || goal.description.toLowerCase().includes(query),
      )
    }

    if (maxItems) {
      filtered = filtered.slice(0, maxItems)
    }

    return filtered
  }, [goals, debouncedSearch, maxItems])

  const handleFiltersChange = useCallback((newFilters: GoalFilters) => {
    setFilters(newFilters)
  }, [])

  const handleUpdateGoal = useCallback(
    (id: string, updates: any) => {
      updateGoal(id, updates)
    },
    [updateGoal],
  )

  const handleDeleteGoal = useCallback(
    (id: string) => {
      if (window.confirm(t("goals.confirmDelete"))) {
        deleteGoal(id)
      }
    },
    [deleteGoal, t],
  )

  const handleAddContribution = useCallback(
    (id: string, amount: number) => {
      addContribution(id, amount)
    },
    [addContribution],
  )

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t("common.error")}</h3>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <Button onClick={refetch}>{t("common.retry")}</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Stats Section */}
      {showStats && !isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("goals.activeGoals")}</p>
                  <p className="text-2xl font-bold">{stats.activeGoals}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("goals.averageProgress")}</p>
                  <p className="text-2xl font-bold">{Math.round(stats.averageProgress)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Target className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("goals.totalSaved")}</p>
                  <p className="text-lg font-bold">
                    {stats.totalCurrentAmount.toLocaleString()} {t("common.currency")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Target className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t("goals.totalTarget")}</p>
                  <p className="text-lg font-bold">
                    {stats.totalTargetAmount.toLocaleString()} {t("common.currency")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header and Controls */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {t("goals.myFinancialGoals")}
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <div className="flex flex-1 gap-2">
                <Button className="flex-1 sm:flex-none bg-gradient-to-r from-trust to-aspiration hover:from-trust/90 hover:to-aspiration/90">
                  <Plus className="h-4 w-4 ml-2" />
                  {t("goals.newGoal")}
                </Button>
                <Button variant="outline" className="flex-1 sm:flex-none">
                  <Filter className="h-4 w-4 ml-2" />
                  {t("common.filter")}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Grid className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 ml-2" />
                      {t("common.export")}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Archive className="h-4 w-4 ml-2" />
                      {t("goals.archive")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t("goals.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters */}
          {showFilters && <GoalsFilters filters={filters} onFiltersChange={handleFiltersChange} />}
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredGoals.length === 0 ? (
            <div className="text-center py-8">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t("goals.noGoals")}</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? t("goals.noSearchResults") : t("goals.createFirstGoal")}
              </p>
              <Button>
                <Plus className="h-4 w-4 ml-2" />
                {t("goals.createNew")}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onUpdate={handleUpdateGoal}
                  onDelete={handleDeleteGoal}
                  onAddContribution={handleAddContribution}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
})
