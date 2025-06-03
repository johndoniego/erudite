"use client"

import { useState, useEffect } from "react"
import { CustomCalendar } from "@/app/components/CustomCalendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { CalendarIcon, Clock, MapPin, Users, Plus, ArrowRight } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

// Function to get sessions from localStorage
const getScheduledSessions = () => {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("erudite_scheduled_sessions") || "[]")
  } catch (error) {
    console.error("Error loading sessions:", error)
    return []
  }
}

// Session type definition
interface Session {
  id: string
  title: string
  date: string
  duration: string
  participants: number
  location: string
  type: "teaching" | "learning"
  completed?: boolean
  dateObj?: Date
}

export default function SchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [activeTab, setActiveTab] = useState("calendar")
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [selectedUser, setSelectedUser] = useState("")
  const [selectedType, setSelectedType] = useState<"teaching" | "learning">("learning")
  const [selectedLocation, setSelectedLocation] = useState("Online")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // State for sessions
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([
    {
      id: "session1",
      title: "Spanish Conversation Practice",
      date: "Today, 3:00 PM",
      duration: "60 min",
      participants: 3,
      location: "Online",
      type: "learning",
      dateObj: new Date(),
    },
    {
      id: "session2",
      title: "Web Development Workshop",
      date: "Tomorrow, 5:30 PM",
      duration: "90 min",
      participants: 8,
      location: "Online",
      type: "teaching",
      dateObj: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  ])

  useEffect(() => {
    // Get the date from URL query parameter if it exists
    const urlParams = new URLSearchParams(window.location.search)
    const dateParam = urlParams.get("date")

    if (dateParam) {
      const selectedDate = new Date(dateParam)
      setDate(selectedDate)
      setActiveTab("calendar") // Switch to calendar tab
    }

    // Load sessions from localStorage
    const savedSessions = getScheduledSessions()
    if (savedSessions.length > 0) {
      // Convert string dates back to Date objects
      const processedSessions = savedSessions.map((session) => ({
        ...session,
        dateObj: session.dateObj ? new Date(session.dateObj) : undefined,
      }))

      // Merge with default sessions
      setUpcomingSessions((prev) => [...processedSessions, ...prev])
    }
  }, [])

  // Mock data for past sessions
  const [pastSessions] = useState<Session[]>([
    {
      id: "past1",
      title: "Python for Beginners",
      date: "May 20, 2:00 PM",
      duration: "60 min",
      participants: 5,
      location: "Online",
      type: "learning",
      completed: true,
    },
    {
      id: "past2",
      title: "Yoga Fundamentals",
      date: "May 18, 7:00 AM",
      duration: "45 min",
      participants: 4,
      location: "Central Park",
      type: "learning",
      completed: true,
    },
  ])

  // Get sessions for the selected date
  const getSessionsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return []

    return upcomingSessions.filter((session) => {
      if (session.dateObj) {
        return (
          session.dateObj.getDate() === selectedDate.getDate() &&
          session.dateObj.getMonth() === selectedDate.getMonth() &&
          session.dateObj.getFullYear() === selectedDate.getFullYear()
        )
      }
      return false
    })
  }

  const sessionsForSelectedDate = getSessionsForDate(date)

  // Mock skills and connections
  const mySkills = ["JavaScript", "React", "Node.js", "Spanish", "Guitar", "Photography"]
  const myConnections = [
    { id: "conn1", name: "Alice Smith", avatar: "AS" },
    { id: "conn2", name: "Bob Johnson", avatar: "BJ" },
    { id: "conn3", name: "Carol Williams", avatar: "CW" },
    { id: "conn4", name: "David Lee", avatar: "DL" },
  ]

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
  ]

  const locationOptions = ["Online", "Coffee Shop", "Library", "Park", "Office", "School"]
  const durationOptions = [
    { value: "30min", label: "30 minutes" },
    { value: "45min", label: "45 minutes" },
    { value: "1hour", label: "1 hour" },
    { value: "1.5hours", label: "1.5 hours" },
    { value: "2hours", label: "2 hours" },
  ]

  // Handle creating a new session
  const handleCreateSession = () => {
    if (!selectedSkill || !selectedTime || !selectedDuration || !selectedUser) {
      alert("Please fill out all fields")
      return
    }

    const sessionDate = date || new Date()
    const newSession: Session = {
      id: uuidv4(),
      title: `${selectedSkill} ${selectedType === "teaching" ? "Teaching" : "Learning"}`,
      date: `${sessionDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}, ${selectedTime}`,
      duration:
        selectedDuration === "30min"
          ? "30 min"
          : selectedDuration === "45min"
            ? "45 min"
            : selectedDuration === "1hour"
              ? "60 min"
              : selectedDuration === "1.5hours"
                ? "90 min"
                : "120 min",
      participants: Math.floor(Math.random() * 5) + 1,
      location: selectedLocation,
      type: selectedType,
      dateObj: sessionDate,
    }

    setUpcomingSessions((prev) => [newSession, ...prev])
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
    setShowNewSessionDialog(false)

    // Reset form
    setSelectedSkill("")
    setSelectedTime("")
    setSelectedDuration("")
    setSelectedUser("")
    setSelectedType("learning")
    setSelectedLocation("Online")

    // Save sessions to localStorage
    localStorage.setItem("erudite_scheduled_sessions", JSON.stringify(upcomingSessions))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-950 dark:via-blue-950 dark:to-indigo-950">
      <main className="p-4">
        {/* Header with gradient text */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-2">
            Schedule
          </h1>
          <p className="text-muted-foreground">Manage your learning sessions and appointments</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-white transition-all duration-300"
            >
              Upcoming
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-white transition-all duration-300"
            >
              Calendar
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary data-[state=active]:text-white transition-all duration-300"
            >
              Past
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4 mt-2">
            <div className="mb-6">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                Your Sessions
              </h2>
            </div>

            {upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="group transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <Card className="overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/20 hover:border-primary/30 dark:hover:border-primary/60 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div
                            className={`w-1 ${
                              session.type === "teaching"
                                ? "bg-gradient-to-b from-blue-400 to-blue-600"
                                : "bg-gradient-to-b from-green-400 to-green-600"
                            }`}
                          ></div>
                          <div className="p-6 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors">
                                  {session.title}
                                </h3>
                                <Badge
                                  variant="outline"
                                  className={`mt-2 text-xs font-medium ${
                                    session.type === "teaching"
                                      ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 dark:from-blue-900 dark:to-blue-800 dark:text-blue-300 dark:border-blue-600"
                                      : "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 dark:from-green-900 dark:to-green-800 dark:text-green-300 dark:border-green-600"
                                  }`}
                                >
                                  {session.type === "teaching" ? "Teaching" : "Learning"}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-10 w-10 p-0 rounded-full hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                              >
                                <ArrowRight className="h-5 w-5 text-primary" />
                              </Button>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center bg-purple-100 dark:bg-purple-900 rounded-full px-3 py-1 mr-4">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-purple-600 dark:text-purple-400" />
                                  <span className="font-medium">{session.date}</span>
                                </div>
                                <div className="flex items-center bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1">
                                  <Clock className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                  <span className="font-medium">{session.duration}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center bg-green-100 dark:bg-green-900 rounded-full px-3 py-1 mr-4">
                                  <MapPin className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                  <span className="font-medium">{session.location}</span>
                                </div>
                                <div className="flex items-center bg-orange-100 dark:bg-orange-900 rounded-full px-3 py-1">
                                  <Users className="h-4 w-4 mr-2 text-orange-600 dark:text-orange-400" />
                                  <span className="font-medium">{session.participants} participants</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">No upcoming sessions</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    Go to the Calendar tab to schedule a new session
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("calendar")}
                    className="bg-gradient-to-r from-primary to-primary text-white border-0 hover:from-primary hover:to-primary transition-all duration-300"
                  >
                    Go to Calendar
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="calendar" className="mt-2">
            <Card className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/20">
              <CardHeader className="pb-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                    Session Calendar
                  </CardTitle>
                  <Button
                    size="sm"
                    className="gap-2 bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-white border-0 transition-all duration-300 hover:scale-105"
                    onClick={() => setShowNewSessionDialog(true)}
                  >
                    <Plus className="h-4 w-4" /> New Session
                  </Button>
                </div>
              </CardHeader>

              {showSuccessMessage && (
                <div className="absolute top-20 left-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg z-10 flex justify-between items-center shadow-lg animate-in slide-in-from-top duration-300">
                  <span className="font-medium">Session created successfully!</span>
                  <button
                    onClick={() => setShowSuccessMessage(false)}
                    className="text-white hover:text-gray-200 transition-colors"
                  >
                    ×
                  </button>
                </div>
              )}

              <CardContent className="p-6">
                <div className="border border-white/20 rounded-xl overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
                  <CustomCalendar selected={date} onSelect={setDate} />
                </div>

                {date && (
                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                        Sessions on {date.toLocaleDateString("en-US", { month: "long", day: "numeric" })}
                      </h3>
                      {sessionsForSelectedDate.length === 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 bg-gradient-to-r from-primary to-primary text-white border-0 hover:from-primary hover:to-primary transition-all duration-300"
                          onClick={() => setShowNewSessionDialog(true)}
                        >
                          <Plus className="h-4 w-4 mr-1" /> Add
                        </Button>
                      )}
                    </div>

                    {sessionsForSelectedDate.length > 0 ? (
                      <div className="space-y-3">
                        {sessionsForSelectedDate.map((session, index) => (
                          <div
                            key={session.id}
                            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:border-primary/30 dark:hover:border-primary/60 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                            style={{
                              animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                            }}
                          >
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-gray-900 dark:text-white">{session.title}</h4>
                              <Badge
                                variant="outline"
                                className={
                                  session.type === "teaching"
                                    ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300 dark:from-blue-900 dark:to-blue-800 dark:text-blue-300 dark:border-blue-600"
                                    : "bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300 dark:from-green-900 dark:to-green-800 dark:text-green-300 dark:border-green-600"
                                }
                              >
                                {session.type === "teaching" ? "Teaching" : "Learning"}
                              </Badge>
                            </div>
                            <div className="mt-3 flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center bg-purple-100 dark:bg-purple-900 rounded-full px-3 py-1 mr-3">
                                <Clock className="h-3.5 w-3.5 mr-1.5 text-purple-600 dark:text-purple-400" />
                                <span className="font-medium">{session.date.split(", ")[1] || session.date}</span>
                              </div>
                              <div className="flex items-center bg-blue-100 dark:bg-blue-900 rounded-full px-3 py-1">
                                <span className="font-medium">{session.duration}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-dashed border-purple-300 dark:border-purple-600">
                          <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
                            <CalendarIcon className="h-6 w-6 text-white" />
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 mb-3">No sessions scheduled for this day</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-gradient-to-r from-primary to-primary text-white border-0 hover:from-primary hover:to-primary transition-all duration-300"
                            onClick={() => setShowNewSessionDialog(true)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Add Session
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-4 mt-2">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent mb-6">
              Past Sessions
            </h2>
            {pastSessions.length > 0 ? (
              <div className="space-y-4">
                {pastSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="transform transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <Card className="overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20 opacity-80 hover:opacity-100 transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div
                            className={`w-1 ${
                              session.type === "teaching"
                                ? "bg-gradient-to-b from-blue-400/70 to-blue-600/70"
                                : "bg-gradient-to-b from-green-400/70 to-green-600/70"
                            }`}
                          ></div>
                          <div className="p-6 flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{session.title}</h3>
                                <Badge
                                  variant="outline"
                                  className={`mt-2 text-xs ${
                                    session.type === "teaching"
                                      ? "bg-blue-100/70 text-blue-700/80 border-blue-300/70 dark:bg-blue-900/70 dark:text-blue-300/80 dark:border-blue-600/70"
                                      : "bg-green-100/70 text-green-700/80 border-green-300/70 dark:bg-green-900/70 dark:text-green-300/80 dark:border-green-600/70"
                                  }`}
                                >
                                  {session.type === "teaching" ? "Teaching" : "Learning"}
                                </Badge>
                              </div>
                              <Badge
                                variant="outline"
                                className="bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                              >
                                Completed
                              </Badge>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 mr-4">
                                  <CalendarIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                  <span>{session.date}</span>
                                </div>
                                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                                  <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                  <span>{session.duration}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 mr-4">
                                  <MapPin className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                  <span>{session.location}</span>
                                </div>
                                <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                                  <Users className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                                  <span>{session.participants} participants</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">No past sessions</p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Enhanced New Session Dialog */}
      <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
        <DialogContent className="sm:max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20">
          <DialogHeader>
            <DialogTitle className="text-xl bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
              Schedule New Session
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="sessionType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Session Type
              </Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={selectedType === "learning" ? "default" : "outline"}
                  className={`justify-start px-3 transition-all duration-300 ${
                    selectedType === "learning"
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600"
                      : "hover:bg-green-50 dark:hover:bg-green-950"
                  }`}
                  onClick={() => setSelectedType("learning")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Learning
                </Button>
                <Button
                  type="button"
                  variant={selectedType === "teaching" ? "default" : "outline"}
                  className={`justify-start px-3 transition-all duration-300 ${
                    selectedType === "teaching"
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600"
                      : "hover:bg-blue-50 dark:hover:bg-blue-950"
                  }`}
                  onClick={() => setSelectedType("teaching")}
                >
                  <CalendarIcon className="h-4 w-4 mr-2" />
                  Teaching
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skill" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Skill
              </Label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger
                  id="skill"
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20"
                >
                  <SelectValue placeholder="Select a skill" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20">
                  {mySkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="connection" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Connection
              </Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger
                  id="connection"
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20"
                >
                  <SelectValue placeholder="Select a connection" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20">
                  {myConnections.map((conn) => (
                    <SelectItem key={conn.id} value={conn.name}>
                      {conn.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Time
                </Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger
                    id="time"
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20"
                  >
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Duration
                </Label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger
                    id="duration"
                    className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20"
                  >
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20">
                    {durationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger
                  id="location"
                  className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-white/20"
                >
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-white/20">
                  {locationOptions.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewSessionDialog(false)}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateSession}
              className="bg-gradient-to-r from-primary to-primary hover:from-primary hover:to-primary text-white border-0 transition-all duration-300"
            >
              Create Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
