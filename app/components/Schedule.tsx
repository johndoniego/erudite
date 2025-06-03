"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Clock, Plus, Settings, CalendarIcon, List } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ScheduleProps {
  onViewChange: (view: "calendar" | "sessions" | "manage") => void
}

export default function Schedule({ onViewChange }: ScheduleProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"calendar" | "sessions">("calendar")
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("")
  const [selectedUser, setSelectedUser] = useState("")

  // Update the parent component's view state
  const handleViewChange = (newView: "calendar" | "sessions") => {
    setView(newView)
  }

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      name: "Alice Smith",
      avatar: "AS",
      skill: "Spanish",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      status: "upcoming",
    },
    {
      id: 2,
      name: "Bob Johnson",
      avatar: "BJ",
      skill: "Guitar",
      date: "Tomorrow",
      time: "6:30 PM - 7:30 PM",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Carol Williams",
      avatar: "CW",
      skill: "Photography",
      date: "Aug 25",
      time: "10:00 AM - 11:30 AM",
      status: "upcoming",
    },
  ]

  // Mock past sessions
  const pastSessions = [
    {
      id: 4,
      name: "David Lee",
      avatar: "DL",
      skill: "Python",
      date: "Aug 15",
      time: "4:00 PM - 5:00 PM",
      status: "completed",
    },
    {
      id: 5,
      name: "Emma Garcia",
      avatar: "EG",
      skill: "Yoga",
      date: "Aug 10",
      time: "9:00 AM - 10:00 AM",
      status: "completed",
    },
  ]

  // Time slots for the selected date
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

  // Mock skills for the new session dialog
  const mySkills = ["JavaScript", "React", "Node.js", "Spanish", "Guitar", "Photography"]

  // Mock connections for the new session dialog
  const myConnections = [
    { id: "conn1", name: "Alice Smith", avatar: "AS" },
    { id: "conn2", name: "Bob Johnson", avatar: "BJ" },
    { id: "conn3", name: "Carol Williams", avatar: "CW" },
    { id: "conn4", name: "David Lee", avatar: "DL" },
  ]

  // Handle creating a new session
  const handleCreateSession = () => {
    // In a real app, this would create a new session
    alert(`New session created: ${selectedSkill} with ${selectedUser} at ${selectedTime} for ${selectedDuration}`)
    setShowNewSessionDialog(false)

    // Reset form
    setSelectedSkill("")
    setSelectedTime("")
    setSelectedDuration("")
    setSelectedUser("")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="section-title">Schedule</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={() => onViewChange("manage")}>
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="icon" onClick={() => setShowNewSessionDialog(true)}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <Button
          variant={view === "calendar" ? "default" : "outline"}
          onClick={() => handleViewChange("calendar")}
          className="flex-1 mr-2"
        >
          <CalendarIcon className="h-4 w-4 mr-2" />
          Calendar
        </Button>
        <Button
          variant={view === "sessions" ? "default" : "outline"}
          onClick={() => handleViewChange("sessions")}
          className="flex-1"
        >
          <List className="h-4 w-4 mr-2" />
          Sessions
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {view === "calendar" && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="text-center">
                  {date ? date.toLocaleString("default", { month: "long", year: "numeric" }) : "Select a date"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border mx-auto"
                  classNames={{
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  }}
                />

                {date && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 overflow-hidden"
                  >
                    <h3 className="font-semibold mb-2">Available Times for {date.toLocaleDateString()}</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          className="text-xs"
                          size="sm"
                          onClick={() => {
                            setSelectedTime(time)
                            setShowNewSessionDialog(true)
                          }}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {view === "sessions" && (
          <motion.div
            key="sessions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${session.avatar}`}
                              alt={session.name}
                            />
                            <AvatarFallback>{session.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">{session.name}</p>
                            <Badge variant="secondary" className="text-xs">
                              {session.skill}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>
                                {session.date}, {session.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="text-xs">
                          Join
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No upcoming sessions</p>
                )}
              </CardContent>
            </Card>

            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle>Past Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                {pastSessions.length > 0 ? (
                  <div className="space-y-3">
                    {pastSessions.map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10 border border-border">
                            <AvatarImage
                              src={`/placeholder.svg?height=40&width=40&text=${session.avatar}`}
                              alt={session.name}
                            />
                            <AvatarFallback>{session.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-semibold">{session.name}</p>
                            <Badge variant="secondary" className="text-xs">
                              {session.skill}
                            </Badge>
                            <div className="flex items-center text-xs text-muted-foreground mt-1">
                              <Clock className="h-3 w-3 mr-1" />
                              <span>
                                {session.date}, {session.time}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          Review
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No past sessions</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Session Dialog */}
      <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle>Schedule New Session</DialogTitle>
            <DialogDescription>
              Create a new learning or teaching session with one of your connections.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="skill">Skill</Label>
              <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                <SelectTrigger id="skill">
                  <SelectValue placeholder="Select a skill" />
                </SelectTrigger>
                <SelectContent>
                  {mySkills.map((skill) => (
                    <SelectItem key={skill} value={skill}>
                      {skill}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="connection">Connection</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger id="connection">
                  <SelectValue placeholder="Select a connection" />
                </SelectTrigger>
                <SelectContent>
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
                <Label htmlFor="time">Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="1.5hours">1.5 hours</SelectItem>
                    <SelectItem value="2hours">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewSessionDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSession}>Create Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
