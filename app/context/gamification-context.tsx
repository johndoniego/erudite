"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

export type Achievement = {
  id: string
  name: string
  description: string
  icon: string
  points: number
  unlocked: boolean
  progress?: number
  maxProgress?: number
}

export type Reward = {
  id: string
  name: string
  description: string
  icon: string
  cost: number
  unlocked: boolean
  available: boolean
}

type GamificationContextType = {
  points: number
  level: number
  streak: number
  achievements: Achievement[]
  rewards: Reward[]
  addPoints: (amount: number) => void
  unlockAchievement: (id: string) => void
  updateAchievementProgress: (id: string, progress: number) => void
  claimReward: (id: string) => void
  incrementStreak: () => void
  resetStreak: () => void
  triggerFirstConnection: () => void
  triggerSkillExchange: () => void
  triggerFirstReview: () => void
  triggerLearningSession: () => void
}

const initialAchievements: Achievement[] = [
  {
    id: "first-connection",
    name: "First Connection",
    description: "Connect with your first skill partner",
    icon: "👋",
    points: 50,
    unlocked: false,
  },
  {
    id: "profile-complete",
    name: "Profile Master",
    description: "Complete your profile with all details",
    icon: "📝",
    points: 100,
    unlocked: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: "skill-exchange",
    name: "Skill Exchange",
    description: "Complete your first skill exchange session",
    icon: "🔄",
    points: 150,
    unlocked: false,
  },
  {
    id: "five-connections",
    name: "Networking Pro",
    description: "Connect with 5 different skill partners",
    icon: "🌐",
    points: 200,
    unlocked: false,
    progress: 2,
    maxProgress: 5,
  },
  {
    id: "first-review",
    name: "First Review",
    description: "Receive your first positive review",
    icon: "⭐",
    points: 100,
    unlocked: false,
  },
  {
    id: "three-sessions",
    name: "Learning Journey",
    description: "Complete 3 learning sessions",
    icon: "📚",
    points: 150,
    unlocked: false,
    progress: 1,
    maxProgress: 3,
  },
  {
    id: "week-streak",
    name: "Weekly Warrior",
    description: "Maintain a 7-day login streak",
    icon: "🔥",
    points: 200,
    unlocked: false,
    progress: 3,
    maxProgress: 7,
  },
]

const initialRewards: Reward[] = [
  {
    id: "theme-unlock",
    name: "Custom Theme",
    description: "Unlock custom theme colors",
    icon: "🎨",
    cost: 500,
    unlocked: false,
    available: true,
  },
  {
    id: "premium-badge",
    name: "Premium Badge",
    description: "Show a premium badge on your profile",
    icon: "🏆",
    cost: 1000,
    unlocked: false,
    available: true,
  },
  {
    id: "featured-profile",
    name: "Featured Profile",
    description: "Get your profile featured for 1 week",
    icon: "🌟",
    cost: 2000,
    unlocked: false,
    available: true,
  },
  {
    id: "verified-status",
    name: "Verified Status",
    description: "Get a verified status on your profile",
    icon: "✅",
    cost: 3000,
    unlocked: false,
    available: true,
  },
]

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState(250)
  const [level, setLevel] = useState(1)
  const [streak, setStreak] = useState(3)
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements)
  const [rewards, setRewards] = useState<Reward[]>(initialRewards)
  const [lastLogin, setLastLogin] = useState<string | null>(null)
  const { toast } = useToast()

  // Calculate level based on points
  useEffect(() => {
    const newLevel = Math.floor(points / 500) + 1
    if (newLevel !== level) {
      setLevel(newLevel)
      toast({
        title: "Level Up! 🎉",
        description: `You've reached Level ${newLevel}!`,
      })
    }
  }, [points, level, toast])

  // Load data from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPoints = localStorage.getItem("erudite-points")
      const savedAchievements = localStorage.getItem("erudite-achievements")
      const savedRewards = localStorage.getItem("erudite-rewards")
      const savedStreak = localStorage.getItem("erudite-streak")
      const savedLastLogin = localStorage.getItem("erudite-last-login")

      if (savedPoints) setPoints(Number.parseInt(savedPoints))
      if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
      if (savedRewards) setRewards(JSON.parse(savedRewards))
      if (savedStreak) setStreak(Number.parseInt(savedStreak))
      if (savedLastLogin) setLastLogin(savedLastLogin)
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("erudite-points", points.toString())
      localStorage.setItem("erudite-achievements", JSON.stringify(achievements))
      localStorage.setItem("erudite-rewards", JSON.stringify(rewards))
      localStorage.setItem("erudite-streak", streak.toString())
    }
  }, [points, achievements, rewards, streak])

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount)
    toast({
      title: `+${amount} Points! 🎯`,
      description: "Keep up the great work!",
    })
  }

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === id && !achievement.unlocked) {
          addPoints(achievement.points)
          toast({
            title: "Achievement Unlocked! 🏆",
            description: `${achievement.name} - ${achievement.description}`,
          })
          return { ...achievement, unlocked: true }
        }
        return achievement
      }),
    )
  }

  const updateAchievementProgress = (id: string, progress: number) => {
    setAchievements((prev) =>
      prev.map((achievement) => {
        if (achievement.id === id) {
          const newProgress = Math.min(progress, achievement.maxProgress || progress)
          const isComplete = newProgress >= (achievement.maxProgress || 0)

          if (isComplete && !achievement.unlocked) {
            setTimeout(() => unlockAchievement(id), 500)
          }

          return { ...achievement, progress: newProgress }
        }
        return achievement
      }),
    )
  }

  const claimReward = (id: string) => {
    const reward = rewards.find((r) => r.id === id)
    if (reward && !reward.unlocked && reward.available && points >= reward.cost) {
      setPoints((prev) => prev - reward.cost)
      setRewards((prev) => prev.map((r) => (r.id === id ? { ...r, unlocked: true } : r)))
      toast({
        title: "Reward Claimed! 🎁",
        description: `${reward.name} has been unlocked!`,
      })
    } else if (reward && points < reward.cost) {
      toast({
        title: "Not enough points",
        description: `You need ${reward.cost - points} more points to claim this reward.`,
        variant: "destructive",
      })
    }
  }

  const incrementStreak = () => {
    setStreak((prev) => {
      const newStreak = prev + 1
      if (newStreak === 7) {
        unlockAchievement("week-streak")
      }
      return newStreak
    })
  }

  const resetStreak = () => {
    setStreak(1)
  }

  // Trigger functions for specific achievements
  const triggerFirstConnection = () => {
    unlockAchievement("first-connection")
    updateAchievementProgress("five-connections", 3)
  }

  const triggerSkillExchange = () => {
    unlockAchievement("skill-exchange")
  }

  const triggerFirstReview = () => {
    unlockAchievement("first-review")
  }

  const triggerLearningSession = () => {
    updateAchievementProgress("three-sessions", 2)
  }

  return (
    <GamificationContext.Provider
      value={{
        points,
        level,
        streak,
        achievements,
        rewards,
        addPoints,
        unlockAchievement,
        updateAchievementProgress,
        claimReward,
        incrementStreak,
        resetStreak,
        triggerFirstConnection,
        triggerSkillExchange,
        triggerFirstReview,
        triggerLearningSession,
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export const useGamification = () => {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
