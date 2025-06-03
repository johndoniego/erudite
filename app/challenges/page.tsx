"use client"
import { useState, useEffect } from "react"
import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Brain,
  CheckCircle,
  Clock,
  Code,
  Dumbbell,
  Calendar,
  Target,
  Trophy,
  Flame,
  Users,
  Share2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useGamification } from "@/app/context/gamification-context"

// Challenge types
type Challenge = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  xp: number
  completed: boolean
  difficulty: "easy" | "medium" | "hard"
  category: "learning" | "social" | "fitness" | "creative"
  timeLimit?: string
  requirements?: string[]
}

// Initial challenge data with more variety
const initialChallenges: Challenge[] = [
  {
    id: "daily-1",
    title: "Complete a coding exercise",
    description: "Solve a programming challenge to improve your problem-solving skills.",
    icon: <Code className="h-5 w-5" />,
    xp: 50,
    completed: false,
    difficulty: "medium",
    category: "learning",
    timeLimit: "24 hours",
    requirements: ["Complete 1 coding challenge", "Submit solution"],
  },
  {
    id: "daily-2",
    title: "Read an article",
    description: "Expand your knowledge by reading an article on a topic you're learning.",
    icon: <BookOpen className="h-5 w-5" />,
    xp: 30,
    completed: false,
    difficulty: "easy",
    category: "learning",
    timeLimit: "24 hours",
    requirements: ["Read for 15+ minutes", "Take notes"],
  },
  {
    id: "daily-3",
    title: "Practice a new skill",
    description: "Spend at least 20 minutes practicing a skill you're developing.",
    icon: <Brain className="h-5 w-5" />,
    xp: 40,
    completed: false,
    difficulty: "medium",
    category: "learning",
    timeLimit: "24 hours",
    requirements: ["Practice for 20+ minutes", "Track progress"],
  },
  {
    id: "daily-4",
    title: "Connect with someone new",
    description: "Reach out and connect with a new skill partner in your field.",
    icon: <Users className="h-5 w-5" />,
    xp: 35,
    completed: false,
    difficulty: "easy",
    category: "social",
    timeLimit: "24 hours",
    requirements: ["Send connection request", "Start conversation"],
  },
  {
    id: "daily-5",
    title: "Share knowledge",
    description: "Help someone by answering a question or sharing a helpful resource.",
    icon: <Share2 className="h-5 w-5" />,
    xp: 45,
    completed: false,
    difficulty: "medium",
    category: "social",
    timeLimit: "24 hours",
    requirements: ["Answer 1 question", "Share 1 resource"],
  },
  {
    id: "daily-6",
    title: "Exercise your body",
    description: "Take a break and do some physical activity to refresh your mind.",
    icon: <Dumbbell className="h-5 w-5" />,
    xp: 25,
    completed: false,
    difficulty: "easy",
    category: "fitness",
    timeLimit: "24 hours",
    requirements: ["Exercise for 15+ minutes", "Track activity"],
  },
]

// Weekly challenges
const weeklyChallenge = {
  id: "weekly-1",
  title: "Master a New Technology",
  description: "Choose a new technology or framework and complete a project with it",
  icon: <Trophy className="h-6 w-6" />,
  xp: 500,
  progress: 2,
  maxProgress: 5,
  difficulty: "hard" as const,
  category: "learning" as const,
  timeLimit: "7 days",
  requirements: [
    "Choose a technology you've never used",
    "Complete online tutorial or course",
    "Build a small project",
    "Share your project with the community",
    "Write a reflection on what you learned",
  ],
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges)
  const [activeTab, setActiveTab] = useState("daily")
  const [streak, setStreak] = useState(5)
  const { toast } = useToast()
  const { addPoints, points } = useGamification()

  // Calculate stats
  const completedToday = challenges.filter((c) => c.completed).length
  const totalXPToday = challenges.reduce((sum, c) => sum + (c.completed ? c.xp : 0), 0)
  const totalPossibleXP = challenges.reduce((sum, c) => sum + c.xp, 0)
  const completionPercentage = Math.round((totalXPToday / totalPossibleXP) * 100)

  // Load challenges from localStorage
  useEffect(() => {
    try {
      const savedChallenges = localStorage.getItem("erudite-challenges")
      const savedStreak = localStorage.getItem("erudite-challenge-streak")

      if (savedChallenges) {
        const parsed = JSON.parse(savedChallenges)
        // Reconstruct with React icons
        const reconstructed = parsed.map((challenge: any) => {
          const initial = initialChallenges.find((c) => c.id === challenge.id)
          return {
            ...challenge,
            icon: initial?.icon || <Target className="h-5 w-5" />,
          }
        })
        setChallenges(reconstructed)
      }

      if (savedStreak) {
        setStreak(Number.parseInt(savedStreak))
      }
    } catch (e) {
      console.error("Could not load challenges from localStorage:", e)
    }
  }, [])

  // Save challenges to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("erudite-challenges", JSON.stringify(challenges))
      localStorage.setItem("erudite-challenge-streak", streak.toString())
    } catch (e) {
      console.error("Could not save challenges to localStorage:", e)
    }
  }, [challenges, streak])

  // Toggle challenge completion
  const toggleChallenge = (id: string) => {
    setChallenges((prev) => {
      const updatedChallenges = prev.map((challenge) => {
        if (challenge.id === id) {
          const newCompleted = !challenge.completed

          if (newCompleted) {
            // Award points for completing the challenge
            setTimeout(() => {
              addPoints(challenge.xp)
              toast({
                title: "Challenge Completed! 🎉",
                description: `You earned ${challenge.xp} XP for completing "${challenge.title}"`,
              })
            }, 0)

            // Check if all challenges will be completed
            const allWillBeCompleted = prev.every((c) => (c.id === id ? true : c.completed))
            if (allWillBeCompleted) {
              setTimeout(() => {
                const bonusXP = 100
                addPoints(bonusXP)
                toast({
                  title: "Perfect Day! 🌟",
                  description: `Bonus ${bonusXP} XP for completing all daily challenges!`,
                })
              }, 500)
            }
          } else {
            setTimeout(() => {
              toast({
                title: "Challenge marked incomplete",
                description: `"${challenge.title}" has been unmarked`,
              })
            }, 0)
          }

          return { ...challenge, completed: newCompleted }
        }
        return challenge
      })

      return updatedChallenges
    })
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "text-green-500 bg-green-500/10 border-green-500/20"
      case "medium":
        return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20"
      case "hard":
        return "text-red-500 bg-red-500/10 border-red-500/20"
      default:
        return "text-gray-500 bg-gray-500/10 border-gray-500/20"
    }
  }

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "learning":
        return "text-blue-500 bg-blue-500/10"
      case "social":
        return "text-purple-500 bg-purple-500/10"
      case "fitness":
        return "text-green-500 bg-green-500/10"
      case "creative":
        return "text-pink-500 bg-pink-500/10"
      default:
        return "text-gray-500 bg-gray-500/10"
    }
  }

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Header Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Daily Challenges
            </h1>
            <p className="text-muted-foreground">Complete challenges to earn XP and build your streak</p>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-2xl font-bold text-orange-500">{streak}</span>
            <span className="text-sm text-muted-foreground">day streak</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{completedToday}</div>
            <div className="text-xs text-muted-foreground">Completed Today</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{totalXPToday}</div>
            <div className="text-xs text-muted-foreground">XP Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{completionPercentage}%</div>
            <div className="text-xs text-muted-foreground">Completion</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">{points}</div>
            <div className="text-xs text-muted-foreground">Total Points</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Progress</span>
            <span>
              {completedToday}/{challenges.length}
            </span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="daily" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Daily
          </TabsTrigger>
          <TabsTrigger value="weekly" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Weekly
          </TabsTrigger>
        </TabsList>

        {/* Daily Challenges */}
        <TabsContent value="daily" className="space-y-4">
          <AnimatePresence>
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                layout
              >
                <Card
                  className={`transition-all duration-300 hover:shadow-lg ${
                    challenge.completed
                      ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 dark:from-green-950/20 dark:to-emerald-950/20 dark:border-green-800"
                      : "hover:shadow-md hover:border-primary/30"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-3 rounded-full transition-colors ${
                          challenge.completed ? "bg-green-500/20 text-green-600" : getCategoryColor(challenge.category)
                        }`}
                      >
                        {challenge.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={`font-semibold transition-all ${
                              challenge.completed ? "text-green-700 dark:text-green-400" : ""
                            }`}
                          >
                            {challenge.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                            <Badge variant="outline" className="font-medium">
                              {challenge.xp} XP
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                        {challenge.requirements && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Requirements:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {challenge.requirements.map((req, i) => (
                                <li key={i} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                                  {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {challenge.timeLimit}
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              {challenge.category}
                            </div>
                          </div>

                          <Button
                            variant={challenge.completed ? "outline" : "default"}
                            size="sm"
                            onClick={() => toggleChallenge(challenge.id)}
                            className={`transition-all ${
                              challenge.completed
                                ? "border-green-200 text-green-600 hover:text-green-700 hover:border-green-300 dark:border-green-800 dark:text-green-400"
                                : ""
                            }`}
                          >
                            {challenge.completed ? (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Completed
                              </>
                            ) : (
                              "Mark Complete"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </TabsContent>

        {/* Weekly Challenge */}
        <TabsContent value="weekly" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 dark:from-purple-950/20 dark:to-indigo-950/20 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-400">
                  <Trophy className="h-5 w-5" />
                  Weekly Challenge
                </CardTitle>
                <CardDescription>Complete this week's major challenge for bonus rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-purple-500/20 text-purple-600">{weeklyChallenge.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{weeklyChallenge.title}</h3>
                    <p className="text-muted-foreground mb-4">{weeklyChallenge.description}</p>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {weeklyChallenge.progress}/{weeklyChallenge.maxProgress}
                        </span>
                      </div>
                      <Progress
                        value={(weeklyChallenge.progress / weeklyChallenge.maxProgress) * 100}
                        className="h-3"
                      />

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Requirements:</p>
                        {weeklyChallenge.requirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle
                              className={`h-4 w-4 ${
                                i < weeklyChallenge.progress ? "text-green-500" : "text-muted-foreground"
                              }`}
                            />
                            <span className={i < weeklyChallenge.progress ? "line-through text-muted-foreground" : ""}>
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {weeklyChallenge.timeLimit} remaining
                </div>
                <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">{weeklyChallenge.xp} XP</Badge>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
