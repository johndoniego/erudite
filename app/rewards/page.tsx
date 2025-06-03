"use client"

import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useGamification } from "@/app/context/gamification-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Award, Trophy, Star, Flame, Lock, Zap, Gift } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Header from "@/app/components/Header"

export default function RewardsPage() {
  const {
    points,
    level,
    streak,
    achievements,
    rewards,
    claimReward,
    addPoints,
    triggerFirstConnection,
    triggerSkillExchange,
    triggerFirstReview,
    triggerLearningSession,
  } = useGamification()
  const [selectedTab, setSelectedTab] = useState("achievements")

  // Calculate progress to next level
  const pointsForCurrentLevel = (level - 1) * 500
  const pointsForNextLevel = level * 500
  const progressToNextLevel = ((points - pointsForCurrentLevel) / (pointsForNextLevel - pointsForCurrentLevel)) * 100

  // Count unlocked achievements
  const unlockedAchievements = achievements.filter((a) => a.unlocked).length
  const totalAchievements = achievements.length

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        {/* Level Progress Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="mb-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Level {level}</h3>
                    <p className="text-sm text-muted-foreground">
                      {points} / {pointsForNextLevel} XP to Level {level + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end space-x-4">
                    <div className="flex items-center space-x-1">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <span className="text-2xl font-bold">{points}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span className="text-lg font-semibold">{streak}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to next level</span>
                  <span>{Math.round(progressToNextLevel)}%</span>
                </div>
                <Progress value={progressToNextLevel} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Test Buttons for Demo */}
        <Card className="mb-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-green-500" />
              <span>Test Achievement System</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button onClick={() => addPoints(50)} variant="outline" size="sm">
                <Award className="h-4 w-4 mr-2" />
                Add 50 Points
              </Button>
              <Button onClick={triggerFirstConnection} variant="outline" size="sm">
                👋 First Connection
              </Button>
              <Button onClick={triggerSkillExchange} variant="outline" size="sm">
                🔄 Skill Exchange
              </Button>
              <Button onClick={triggerFirstReview} variant="outline" size="sm">
                ⭐ First Review
              </Button>
              <Button onClick={triggerLearningSession} variant="outline" size="sm">
                📚 Learning Session
              </Button>
              <Button onClick={() => addPoints(100)} variant="outline" size="sm">
                <Gift className="h-4 w-4 mr-2" />
                Bonus Points
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="achievements" className="relative">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
              <Badge variant="secondary" className="ml-2">
                {unlockedAchievements}/{totalAchievements}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="relative">
              <Gift className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-4">
            <AnimatePresence>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card
                    className={`transition-all duration-300 ${
                      achievement.unlocked
                        ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-200/50 shadow-lg"
                        : "bg-card hover:shadow-md"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`text-3xl transition-transform duration-300 ${
                            achievement.unlocked ? "scale-110" : "group-hover:scale-105"
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-lg">{achievement.name}</h3>
                            {achievement.unlocked && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                              </motion.div>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-3">{achievement.description}</p>

                          {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span className="font-medium">
                                  {achievement.progress}/{achievement.maxProgress}
                                </span>
                              </div>
                              <Progress
                                value={(achievement.progress / achievement.maxProgress) * 100}
                                className="h-2"
                              />
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-lg font-bold ${
                              achievement.unlocked ? "text-green-600" : "text-muted-foreground"
                            }`}
                          >
                            +{achievement.points}
                          </div>
                          <div className="text-xs text-muted-foreground">points</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-4">
            <AnimatePresence>
              {rewards.map((reward, index) => {
                const canClaim = !reward.unlocked && reward.available && points >= reward.cost

                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="group"
                  >
                    <Card
                      className={`transition-all duration-300 ${
                        reward.unlocked
                          ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 shadow-lg"
                          : canClaim
                            ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-200/50 hover:shadow-md"
                            : "bg-card opacity-75"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`text-3xl transition-transform duration-300 ${
                              reward.unlocked ? "scale-110" : canClaim ? "group-hover:scale-105" : "grayscale"
                            }`}
                          >
                            {reward.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-lg">{reward.name}</h3>
                              {reward.unlocked && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Star className="h-5 w-5 fill-blue-500 text-blue-500" />
                                </motion.div>
                              )}
                            </div>
                            <p className="text-muted-foreground">{reward.description}</p>
                          </div>
                          <div className="text-right">
                            {reward.unlocked ? (
                              <Badge className="bg-green-500/20 text-green-700 border-green-500/30">
                                <Star className="h-3 w-3 mr-1" />
                                Unlocked
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                disabled={!canClaim}
                                onClick={() => claimReward(reward.id)}
                                className={
                                  canClaim
                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                                    : ""
                                }
                              >
                                {points < reward.cost && <Lock className="h-3 w-3 mr-1" />}
                                {reward.cost} Points
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
