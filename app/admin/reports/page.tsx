import { Suspense } from "react"
import { ReportsAnalytics } from "@/components/admin/reports-analytics"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AdminReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<LoadingSpinner />}>
        <ReportsAnalytics />
      </Suspense>
    </div>
  )
}
