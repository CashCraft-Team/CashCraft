import { Suspense } from "react"
import { BackupRestore } from "@/components/admin/backup-restore"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function AdminBackupPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<LoadingSpinner />}>
        <BackupRestore />
      </Suspense>
    </div>
  )
}
