"use client"

import { ActiveGoals } from "@/components/goals/active-goals"
import { ErrorBoundary } from "@/components/error-boundary"

export function GoalsProgress() {
  return (
    <ErrorBoundary>
      <ActiveGoals showFilters={false} showStats={false} maxItems={3} className="h-full" />
    </ErrorBoundary>
  )
}
