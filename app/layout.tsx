import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionRecovery } from "@/components/auth/session-recovery"
import { SessionDebug } from "@/components/auth/session-debug"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cash Craft - Financial Literacy for Egyptian Youth",
  description: "Enhance your financial literacy with AI-powered insights, gamification, and community support",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const lang = localStorage.getItem('cash-craft-language') || 'ar';
                document.documentElement.lang = lang;
                document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} font-noto-arabic`}>
        <AuthProvider>
          <SessionRecovery />
          {children}
          <Toaster />
          <SessionDebug />
        </AuthProvider>
      </body>
    </html>
  )
}
