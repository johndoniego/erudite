"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Star, Calendar, Award, Zap, BookOpen, Users, Target } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { LevelProgressBar } from "@/app/components/LevelProgressBar"
import { calculateAchievementProgress, calculateActivityXp } from "@/app/utils/calculations"

// User data - in a real app this would come from a database
const userData = {
  xp: 1250,
  streak: 12,
  achievements: [
    {
      id: "skill_master",
      name: "Skill Master",
      description: "Share 5 different skills with others",
      progress: 3,
      target: 5,
      icon: BookOpen,
    },
    {
      id: "community_builder",
      name: "Community Builder",
      description: "Create or join 3 communities",
      progress: 2,
      target: 3,
      icon: Users,
    },
    {
      id: "feedback_guru",
      name: "Feedback Guru",
      description: "Give feedback on 10 skill sessions",
      progress: 7,
      target: 10,
      icon: Star,
    },
    {
      id: "consistent_learner",
      name: "Consistent Learner",
      description: "Maintain a 7-day learning streak",
      progress: 12,
      target: 7,
      icon: Calendar,
      completed: true,
    },
    {
      id: "goal_setter",
      name: "Goal Setter",
      description: "Complete 5 learning goals",
      progress: 2,
      target: 5,
      icon: Target,
    },
  ],
  recentActivities: [
    {
      type: "session_completed",
      description: "Completed a JavaScript tutoring session",
      xp: calculateActivityXp("session_completed", 12, 4),
      timestamp: "2 hours ago",
    },
    {
      type: "skill_shared",
      description: "Shared UI Design knowledge with Emma",
      xp: calculateActivityXp("skill_shared", 11, 5),
      timestamp: "Yesterday",
    },
    {
      type: "comment_posted",
      description: "Commented on Web Development community post",
      xp: calculateActivityXp("comment_posted", 10),
      timestamp: "2 days ago",
    },
    {
      type: "challenge_completed",
      description: "Completed the 'Build a Portfolio' challenge",
      xp: calculateActivityXp("challenge_completed", 9, 3),
      timestamp: "3 days ago",
    },
  ],
}

export function GamificationProgress() {
  const [activeTab, setActiveTab] = useState<"achievements" | "activities">("achievements")

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Your Progress</h3>
          <Badge variant="outline" className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-yellow-500" />
            <span>{userData.streak}-Day Streak</span>
          </Badge>
        </div>
        <LevelProgressBar xp={userData.xp} />
      </div>

      <div className="flex space-x-2 border-b">
        <button
          className={`pb-2 text-sm font-medium ${
            activeTab === "achievements" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("achievements")}
        >
          Achievements
        </button>
        <button
          className={`pb-2 text-sm font-medium ${
            activeTab === "activities" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"
          }`}
          onClick={() => setActiveTab("activities")}
        >
          Recent Activities
        </button>
      </div>

      {activeTab === "achievements" && (
        <div className="space-y-4">
          {userData.achievements.map((achievement) => {
            const progressPercent = calculateAchievementProgress(achievement.progress, achievement.target)
            const isCompleted = achievement.completed || progressPercent >= 100

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start space-x-3"
              >
                <div
                  className={`p-2 rounded-full ${
                    isCompleted ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <achievement.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">{achievement.name}</h4>
                    {isCompleted && <Trophy className="h-4 w-4 text-yellow-500" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <Progress value={progressPercent} className="h-1 flex-1" />
                    <span className="ml-2 text-xs text-muted-foreground">
                      {achievement.progress}/{achievement.target}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {activeTab === "activities" && (
        <div className="space-y-4">
          {userData.recentActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                <Award className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm">{activity.description}</p>
                  <Badge variant="secondary" className="ml-2">
                    +{activity.xp} XP
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
