"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronRight, ChevronLeft, Trophy, CheckCircle2 } from "lucide-react"

// Mock data for challenges
const challengesByDate = {
  "2023-08-15": [
    {
      id: "c1",
      title: "Connect with 3 new people",
      description: "Expand your network by connecting with people who share your interests",
      points: 50,
      progress: 1,
      maxProgress: 3,
      icon: "👥",
    },
    {
      id: "c2",
      title: "Complete a learning session",
      description: "Schedule and complete a learning session with one of your connections",
      points: 100,
      progress: 0,
      maxProgress: 1,
      icon: "📚",
    },
  ],
  "2023-08-16": [
    {
      id: "c3",
      title: "Share a resource",
      description: "Share a helpful resource with your community",
      points: 30,
      progress: 1,
      maxProgress: 1,
      icon: "📤",
      completed: true,
    },
  ],
  "2023-08-20": [
    {
      id: "c4",
      title: "Join a new community",
      description: "Discover and join a new community that aligns with your interests",
      points: 40,
      progress: 0,
      maxProgress: 1,
      icon: "🌐",
    },
  ],
  "2023-08-25": [
    {
      id: "c5",
      title: "Complete weekly quiz",
      description: "Test your knowledge with this week's challenge quiz",
      points: 75,
      progress: 0,
      maxProgress: 1,
      icon: "❓",
    },
  ],
}

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0]

// Add today's challenges if not already present
if (!challengesByDate[today]) {
  challengesByDate[today] = [
    {
      id: "today1",
      title: "Connect with 3 new people",
      description: "Expand your network by connecting with people who share your interests",
      points: 50,
      progress: 1,
      maxProgress: 3,
      icon: "👥",
    },
    {
      id: "today2",
      title: "Complete a learning session",
      description: "Schedule and complete a learning session with one of your connections",
      points: 100,
      progress: 0,
      maxProgress: 1,
      icon: "📚",
    },
  ]
}

export default function ChallengesCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [month, setMonth] = useState<Date>(new Date())

  // Format the selected date to match our challenge data keys
  const formattedDate = selectedDate ? selectedDate.toISOString().split("T")[0] : ""

  // Get challenges for the selected date
  const selectedDateChallenges = challengesByDate[formattedDate] || []

  // Calculate total points available for the selected date
  const totalPointsAvailable = selectedDateChallenges.reduce((sum, challenge) => sum + challenge.points, 0)

  // Calculate total points earned for the selected date
  const totalPointsEarned = selectedDateChallenges.reduce((sum, challenge) => {
    if (challenge.completed) return sum + challenge.points
    return sum + (challenge.progress / challenge.maxProgress) * challenge.points
  }, 0)

  // Function to check if a date has challenges
  const hasChallenge = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return !!challengesByDate[dateString]
  }

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg shadow-sm border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-sm font-medium">
            {month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </h3>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          month={month}
          onMonthChange={setMonth}
          className="rounded-md border"
          modifiers={{
            hasChallenge: (date) => hasChallenge(date),
          }}
          modifiersStyles={{
            hasChallenge: {
              backgroundColor: "rgba(var(--primary), 0.1)",
              color: "hsl(var(--primary))",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">
            Challenges for{" "}
            {selectedDate?.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </h3>
          {selectedDateChallenges.length > 0 && (
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Trophy className="h-3 w-3 mr-1" /> {Math.round(totalPointsEarned)}/{totalPointsAvailable} XP
            </Badge>
          )}
        </div>

        {selectedDateChallenges.length > 0 ? (
          <div className="space-y-3">
            {selectedDateChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`border rounded-lg p-3 ${
                  challenge.completed
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-border hover:border-primary/30 hover:bg-primary/5"
                } transition-all`}
              >
                <div className="flex items-start">
                  <div className="text-lg mr-2">{challenge.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        {challenge.completed && <CheckCircle2 className="h-4 w-4 text-green-500 ml-1" />}
                      </div>
                      <Badge variant="outline">{challenge.points} XP</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{challenge.description}</p>

                    {!challenge.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>
                            {challenge.progress}/{challenge.maxProgress}
                          </span>
                        </div>
                        <Progress value={(challenge.progress / challenge.maxProgress) * 100} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="bg-muted/50 p-3 rounded-full mb-3">
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>
            <h4 className="text-sm font-medium mb-1">No Challenges</h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              There are no challenges scheduled for this date. Check other dates or come back later.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
