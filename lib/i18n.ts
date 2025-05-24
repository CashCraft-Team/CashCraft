export type Language = "ar" | "en"

export interface TranslationKeys {
  // Navigation
  "nav.home": string
  "nav.budget": string
  "nav.goals": string
  "nav.learn": string
  "nav.community": string
  "nav.settings": string
  "nav.admin": string
  "nav.logout": string

  // Common
  "common.save": string
  "common.cancel": string
  "common.delete": string
  "common.edit": string
  "common.add": string
  "common.search": string
  "common.filter": string
  "common.loading": string
  "common.error": string
  "common.success": string
  "common.warning": string
  "common.info": string
  "common.confirm": string
  "common.yes": string
  "common.no": string
  "common.close": string
  "common.back": string
  "common.next": string
  "common.previous": string
  "common.submit": string
  "common.reset": string
  "common.clear": string
  "common.view": string
  "common.download": string
  "common.upload": string
  "common.export": string
  "common.import": string

  // Auth
  "auth.login": string
  "auth.register": string
  "auth.logout": string
  "auth.email": string
  "auth.password": string
  "auth.confirmPassword": string
  "auth.name": string
  "auth.forgotPassword": string
  "auth.rememberMe": string
  "auth.loginSuccess": string
  "auth.loginError": string
  "auth.registerSuccess": string
  "auth.registerError": string
  "auth.passwordMismatch": string

  // Dashboard
  "dashboard.title": string
  "dashboard.welcome": string
  "dashboard.overview": string
  "dashboard.quickActions": string
  "dashboard.recentTransactions": string
  "dashboard.goalsProgress": string
  "dashboard.learningProgress": string

  // Budget
  "budget.title": string
  "budget.overview": string
  "budget.transactions": string
  "budget.analytics": string
  "budget.categories": string
  "budget.totalIncome": string
  "budget.totalExpenses": string
  "budget.remaining": string
  "budget.spentPercentage": string
  "budget.addTransaction": string
  "budget.editBudget": string
  "budget.newBudget": string

  // Goals
  "goals.title": string
  "goals.myGoals": string
  "goals.newGoal": string
  "goals.progress": string
  "goals.deadline": string
  "goals.amount": string
  "goals.addContribution": string
  "goals.completed": string
  "goals.active": string
  "goals.paused": string

  // Learning
  "learning.title": string
  "learning.dashboard": string
  "learning.catalog": string
  "learning.courses": string
  "learning.progress": string
  "learning.certificates": string
  "learning.achievements": string

  // Community
  "community.title": string
  "community.discussions": string
  "community.challenges": string
  "community.newPost": string
  "community.reply": string
  "community.like": string
  "community.share": string

  // Settings
  "settings.title": string
  "settings.profile": string
  "settings.security": string
  "settings.notifications": string
  "settings.preferences": string
  "settings.language": string
  "settings.currency": string
  "settings.theme": string
  "settings.timezone": string

  // Admin
  "admin.title": string
  "admin.overview": string
  "admin.users": string
  "admin.content": string
  "admin.analytics": string
  "admin.settings": string
  "admin.userManagement": string
  "admin.contentModeration": string
  "admin.systemConfig": string

  // Errors
  "error.general": string
  "error.network": string
  "error.unauthorized": string
  "error.forbidden": string
  "error.notFound": string
  "error.serverError": string
}

const translations: Record<Language, TranslationKeys> = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.budget": "الميزانية",
    "nav.goals": "الأهداف",
    "nav.learn": "التعلم",
    "nav.community": "المجتمع",
    "nav.settings": "الإعدادات",
    "nav.admin": "الإدارة",
    "nav.logout": "تسجيل الخروج",

    // Common
    "common.save": "حفظ",
    "common.cancel": "إلغاء",
    "common.delete": "حذف",
    "common.edit": "تعديل",
    "common.add": "إضافة",
    "common.search": "بحث",
    "common.filter": "تصفية",
    "common.loading": "جاري التحميل...",
    "common.error": "خطأ",
    "common.success": "نجح",
    "common.warning": "تحذير",
    "common.info": "معلومات",
    "common.confirm": "تأكيد",
    "common.yes": "نعم",
    "common.no": "لا",
    "common.close": "إغلاق",
    "common.back": "رجوع",
    "common.next": "التالي",
    "common.previous": "السابق",
    "common.submit": "إرسال",
    "common.reset": "إعادة تعيين",
    "common.clear": "مسح",
    "common.view": "عرض",
    "common.download": "تحميل",
    "common.upload": "رفع",
    "common.export": "تصدير",
    "common.import": "استيراد",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.register": "إنشاء حساب",
    "auth.logout": "تسجيل الخروج",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.name": "الاسم",
    "auth.forgotPassword": "نسيت كلمة المرور؟",
    "auth.rememberMe": "تذكرني",
    "auth.loginSuccess": "تم تسجيل الدخول بنجاح",
    "auth.loginError": "خطأ في تسجيل الدخول",
    "auth.registerSuccess": "تم إنشاء الحساب بنجاح",
    "auth.registerError": "خطأ في إنشاء الحساب",
    "auth.passwordMismatch": "كلمة المرور غير متطابقة",

    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.welcome": "مرحباً",
    "dashboard.overview": "نظرة عامة على وضعك المالي اليوم",
    "dashboard.quickActions": "إجراءات سريعة",
    "dashboard.recentTransactions": "المعاملات الأخيرة",
    "dashboard.goalsProgress": "تقدم الأهداف",
    "dashboard.learningProgress": "التقدم التعليمي",

    // Budget
    "budget.title": "إدارة الميزانية",
    "budget.overview": "نظرة عامة",
    "budget.transactions": "المعاملات",
    "budget.analytics": "التحليلات",
    "budget.categories": "الفئات",
    "budget.totalIncome": "إجمالي الدخل",
    "budget.totalExpenses": "إجمالي المصروفات",
    "budget.remaining": "المتبقي",
    "budget.spentPercentage": "نسبة الإنفاق",
    "budget.addTransaction": "إضافة معاملة",
    "budget.editBudget": "تعديل الميزانية",
    "budget.newBudget": "ميزانية جديدة",

    // Goals
    "goals.title": "أهدافي المالية",
    "goals.myGoals": "أهدافي",
    "goals.newGoal": "هدف جديد",
    "goals.progress": "التقدم",
    "goals.deadline": "الموعد النهائي",
    "goals.amount": "المبلغ",
    "goals.addContribution": "إضافة مساهمة",
    "goals.completed": "مكتمل",
    "goals.active": "نشط",
    "goals.paused": "متوقف",

    // Learning
    "learning.title": "التعلم والتطوير",
    "learning.dashboard": "لوحة التعلم",
    "learning.catalog": "كتالوج الدورات",
    "learning.courses": "الدورات",
    "learning.progress": "التقدم",
    "learning.certificates": "الشهادات",
    "learning.achievements": "الإنجازات",

    // Community
    "community.title": "المجتمع",
    "community.discussions": "المناقشات",
    "community.challenges": "التحديات",
    "community.newPost": "موضوع جديد",
    "community.reply": "رد",
    "community.like": "إعجاب",
    "community.share": "مشاركة",

    // Settings
    "settings.title": "إعدادات الحساب",
    "settings.profile": "الملف الشخصي",
    "settings.security": "الأمان",
    "settings.notifications": "الإشعارات",
    "settings.preferences": "التفضيلات",
    "settings.language": "اللغة",
    "settings.currency": "العملة",
    "settings.theme": "المظهر",
    "settings.timezone": "المنطقة الزمنية",

    // Admin
    "admin.title": "لوحة تحكم المدير",
    "admin.overview": "نظرة عامة",
    "admin.users": "المستخدمون",
    "admin.content": "المحتوى",
    "admin.analytics": "التحليلات",
    "admin.settings": "الإعدادات",
    "admin.userManagement": "إدارة المستخدمين",
    "admin.contentModeration": "إدارة المحتوى",
    "admin.systemConfig": "إعدادات النظام",

    // Errors
    "error.general": "حدث خطأ غير متوقع",
    "error.network": "خطأ في الاتصال",
    "error.unauthorized": "غير مخول",
    "error.forbidden": "ممنوع",
    "error.notFound": "غير موجود",
    "error.serverError": "خطأ في الخادم",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.budget": "Budget",
    "nav.goals": "Goals",
    "nav.learn": "Learn",
    "nav.community": "Community",
    "nav.settings": "Settings",
    "nav.admin": "Admin",
    "nav.logout": "Logout",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.add": "Add",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.warning": "Warning",
    "common.info": "Info",
    "common.confirm": "Confirm",
    "common.yes": "Yes",
    "common.no": "No",
    "common.close": "Close",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.submit": "Submit",
    "common.reset": "Reset",
    "common.clear": "Clear",
    "common.view": "View",
    "common.download": "Download",
    "common.upload": "Upload",
    "common.export": "Export",
    "common.import": "Import",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register",
    "auth.logout": "Logout",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.name": "Name",
    "auth.forgotPassword": "Forgot Password?",
    "auth.rememberMe": "Remember Me",
    "auth.loginSuccess": "Login successful",
    "auth.loginError": "Login failed",
    "auth.registerSuccess": "Account created successfully",
    "auth.registerError": "Registration failed",
    "auth.passwordMismatch": "Passwords do not match",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome",
    "dashboard.overview": "Here's an overview of your financial status today",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.recentTransactions": "Recent Transactions",
    "dashboard.goalsProgress": "Goals Progress",
    "dashboard.learningProgress": "Learning Progress",

    // Budget
    "budget.title": "Budget Management",
    "budget.overview": "Overview",
    "budget.transactions": "Transactions",
    "budget.analytics": "Analytics",
    "budget.categories": "Categories",
    "budget.totalIncome": "Total Income",
    "budget.totalExpenses": "Total Expenses",
    "budget.remaining": "Remaining",
    "budget.spentPercentage": "Spent Percentage",
    "budget.addTransaction": "Add Transaction",
    "budget.editBudget": "Edit Budget",
    "budget.newBudget": "New Budget",

    // Goals
    "goals.title": "My Financial Goals",
    "goals.myGoals": "My Goals",
    "goals.newGoal": "New Goal",
    "goals.progress": "Progress",
    "goals.deadline": "Deadline",
    "goals.amount": "Amount",
    "goals.addContribution": "Add Contribution",
    "goals.completed": "Completed",
    "goals.active": "Active",
    "goals.paused": "Paused",

    // Learning
    "learning.title": "Learning & Development",
    "learning.dashboard": "Learning Dashboard",
    "learning.catalog": "Course Catalog",
    "learning.courses": "Courses",
    "learning.progress": "Progress",
    "learning.certificates": "Certificates",
    "learning.achievements": "Achievements",

    // Community
    "community.title": "Community",
    "community.discussions": "Discussions",
    "community.challenges": "Challenges",
    "community.newPost": "New Post",
    "community.reply": "Reply",
    "community.like": "Like",
    "community.share": "Share",

    // Settings
    "settings.title": "Account Settings",
    "settings.profile": "Profile",
    "settings.security": "Security",
    "settings.notifications": "Notifications",
    "settings.preferences": "Preferences",
    "settings.language": "Language",
    "settings.currency": "Currency",
    "settings.theme": "Theme",
    "settings.timezone": "Timezone",

    // Admin
    "admin.title": "Admin Dashboard",
    "admin.overview": "Overview",
    "admin.users": "Users",
    "admin.content": "Content",
    "admin.analytics": "Analytics",
    "admin.settings": "Settings",
    "admin.userManagement": "User Management",
    "admin.contentModeration": "Content Moderation",
    "admin.systemConfig": "System Configuration",

    // Errors
    "error.general": "An unexpected error occurred",
    "error.network": "Network error",
    "error.unauthorized": "Unauthorized",
    "error.forbidden": "Forbidden",
    "error.notFound": "Not found",
    "error.serverError": "Server error",
  },
}

export function getTranslation(language: Language, key: keyof TranslationKeys): string {
  return translations[language][key] || key
}

export function getCurrentLanguage(): Language {
  if (typeof window !== "undefined") {
    return (localStorage.getItem("cash-craft-language") as Language) || "ar"
  }
  return "ar"
}

export function setCurrentLanguage(language: Language): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("cash-craft-language", language)
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }
}

export function formatCurrency(amount: number, language: Language = getCurrentLanguage()): string {
  const currency = language === "ar" ? "EGP" : "USD"
  const locale = language === "ar" ? "ar-EG" : "en-US"

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatDate(date: string | Date, language: Language = getCurrentLanguage()): string {
  const locale = language === "ar" ? "ar-EG" : "en-US"
  return new Date(date).toLocaleDateString(locale)
}

export function formatNumber(number: number, language: Language = getCurrentLanguage()): string {
  const locale = language === "ar" ? "ar-EG" : "en-US"
  return new Intl.NumberFormat(locale).format(number)
}
