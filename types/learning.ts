export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  duration: number // in minutes
  difficulty: "beginner" | "intermediate" | "advanced"
  category: CourseCategory
  thumbnail: string
  rating: number
  studentsCount: number
  lessonsCount: number
  price: number
  isFree: boolean
  isEnrolled: boolean
  progress: number
  completedAt?: string
  tags: string[]
  prerequisites: string[]
  learningOutcomes: string[]
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration: number
  type: "video" | "article" | "quiz" | "interactive"
  content: string
  isCompleted: boolean
  completedAt?: string
  resources: Resource[]
}

export interface Resource {
  id: string
  title: string
  type: "pdf" | "link" | "download"
  url: string
  size?: string
}

export interface Quiz {
  id: string
  title: string
  questions: Question[]
  passingScore: number
  timeLimit?: number
}

export interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Certificate {
  id: string
  courseId: string
  courseName: string
  issuedAt: string
  certificateUrl: string
}

export type CourseCategory =
  | "budgeting"
  | "investing"
  | "saving"
  | "debt-management"
  | "financial-planning"
  | "entrepreneurship"
  | "insurance"
  | "taxes"
