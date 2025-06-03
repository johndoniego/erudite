"use client"

import { Progress } from "@/components/ui/progress"
import { calculateUserLevel, calculateLevelProgress, calculateRequiredXp } from "@/app/utils/calculations"

interface LevelProgressBarProps {
  xp: number
  showDetails?: boolean
}

export function LevelProgressBar({ xp, showDetails = true }: LevelProgressBarProps) {
  const currentLevel = calculateUserLevel(xp)
  const nextLevel = currentLevel + 1
  const progressPercent = calculateLevelProgress(xp)
  const currentLevelXp = calculateRequiredXp(currentLevel)
  const nextLevelXp = calculateRequiredXp(nextLevel)
  const xpForNextLevel = nextLevelXp - currentLevelXp
  const xpProgress = xp - currentLevelXp

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-medium">Level {currentLevel}</div>
        {showDetails && (
          <div className="text-xs text-muted-foreground">
            {xpProgress}/{xpForNextLevel} XP to Level {nextLevel}
          </div>
        )}
      </div>
      <Progress value={progressPercent} className="h-2" />
      {showDetails && (
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Total XP: {xp}</span>
          <span className="text-xs text-muted-foreground">Next: {nextLevelXp} XP</span>
        </div>
      )}
    </div>
  )
}
