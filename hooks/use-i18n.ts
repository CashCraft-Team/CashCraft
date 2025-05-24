"use client"

import { useState, useEffect, useCallback } from "react"
import { type Language, type TranslationKeys, getTranslation, getCurrentLanguage, setCurrentLanguage } from "@/lib/i18n"

export function useI18n() {
  const [language, setLanguage] = useState<Language>("ar")

  useEffect(() => {
    const currentLang = getCurrentLanguage()
    setLanguage(currentLang)
    document.documentElement.lang = currentLang
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr"
  }, [])

  const changeLanguage = useCallback((newLanguage: Language) => {
    setCurrentLanguage(newLanguage)
    setLanguage(newLanguage)

    // Reload the page to apply language changes
    window.location.reload()
  }, [])

  const t = useCallback(
    (key: keyof TranslationKeys): string => {
      return getTranslation(language, key)
    },
    [language],
  )

  const isRTL = language === "ar"

  return {
    language,
    changeLanguage,
    t,
    isRTL,
  }
}
