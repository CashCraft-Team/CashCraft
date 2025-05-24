"use client"

import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // Redirect based on user role
        const destination = user.role === "admin" ? "/admin" : "/dashboard"
        router.replace(destination)
      } else {
        router.replace("/auth/login")
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-trust/10 to-aspiration/10 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center">
            <LoadingSpinner size="lg" className="mb-4" />
            <h2 className="text-xl font-bold text-trust mb-2">Cash Craft</h2>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
