export interface Post {
  id: string
  title: string
  content: string
  author: User
  category: PostCategory
  tags: string[]
  createdAt: string
  updatedAt: string
  likesCount: number
  commentsCount: number
  viewsCount: number
  isLiked: boolean
  isBookmarked: boolean
  isPinned: boolean
  status: "published" | "draft" | "archived"
  attachments: Attachment[]
}

export interface Comment {
  id: string
  postId: string
  content: string
  author: User
  createdAt: string
  updatedAt: string
  likesCount: number
  isLiked: boolean
  replies: Comment[]
  parentId?: string
}

export interface User {
  id: string
  name: string
  avatar?: string
  title?: string
  level: number
  points: number
  badges: Badge[]
  joinedAt: string
  isOnline: boolean
  reputation: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  color: string
  earnedAt: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  points: number
  participants: number
  startDate: string
  endDate: string
  status: "upcoming" | "active" | "completed"
  requirements: string[]
  rewards: Reward[]
}

export interface Reward {
  type: "points" | "badge" | "certificate"
  value: string | number
  description: string
}

export interface Attachment {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export type PostCategory =
  | "general"
  | "budgeting"
  | "investing"
  | "saving"
  | "debt"
  | "career"
  | "success-stories"
  | "questions"
