"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Clock, Users, Trash2, Edit, Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Switch } from "@/components/ui/switch"

interface SessionManagementProps {
  onBack: () => void
}

export default function SessionManagement({ onBack }: SessionManagementProps) {
  const [showCombineDialog, setShowCombineDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedSessions, setSelectedSessions] = useState<string[]>([])
  const [editingSession, setEditingSession] = useState<any>(null)
  const [recurringEnabled, setRecurringEnabled] = useState(false)
  const [reminderEnabled, setReminderEnabled] = useState(true)

  // Mock session requests
  const sessionRequests = [
    {
      id: "req1",
      name: "Emma Garcia",
      avatar: "EG",
      skill: "Yoga",
      date: "Aug 28",
      time: "9:00 AM - 10:00 AM",
      status: "pending",
      type: "teaching", // You're teaching them
    },
    {
      id: "req2",
      name: "Frank Miller",
      avatar: "FM",
      skill: "Marketing",
      date: "Aug 30",
      time: "2:00 PM - 3:00 PM",
      status: "pending",
      type: "learning", // You're learning from them
    },
  ]

  // Mock upcoming sessions
  const upcomingSessions = [
    {
      id: "sess1",
      name: "Alice Smith",
      avatar: "AS",
      skill: "Spanish",
      date: "Today",
      time: "2:00 PM - 3:00 PM",
      status: "confirmed",
      type: "learning",
    },
    {
      id: "sess2",
      name: "Bob Johnson",
      avatar: "BJ",
      skill: "Guitar",
      date: "Tomorrow",
      time: "6:30 PM - 7:30 PM",
      status: "confirmed",
      type: "learning",
    },
    {
      id: "sess3",
      name: "Carol Williams",
      avatar: "CW",
      skill: "Photography",
      date: "Aug 25",
      time: "10:00 AM - 11:30 AM",
      status: "confirmed",
      type: "teaching",
    },
  ]

  // Handle accepting a session request
  const handleAcceptRequest = (requestId: string) => {
    alert(`Session request ${requestId} accepted`)
  }

  // Handle rejecting a session request
  const handleRejectRequest = (requestId: string) => {
    alert(`Session request ${requestId} rejected`)
  }

  // Handle editing a session
  const handleEditSession = (session: any) => {
    setEditingSession(session)
    setShowEditDialog(true)
  }

  // Handle saving edited session
  const handleSaveEdit = () => {
    alert(`Session ${editingSession.id} updated`)
    setShowEditDialog(false)
    setEditingSession(null)
  }

  // Handle deleting a session
  const handleDeleteSession = (sessionId: string) => {
    alert(`Session ${sessionId} deleted`)
  }

  // Handle toggling session selection for combining
  const toggleSessionSelection = (sessionId: string) => {
    if (selectedSessions.includes(sessionId)) {
      setSelectedSessions(selectedSessions.filter((id) => id !== sessionId))
    } else {
      setSelectedSessions([...selectedSessions, sessionId])
    }
  }

  // Handle combining sessions
  const handleCombineSessions = () => {
    alert(`Sessions combined: ${selectedSessions.join(", ")}`)
    setShowCombineDialog(false)
    setSelectedSessions([])
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-xl font-bold">Session Management</h2>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="requests" className="relative">
            Requests
            {sessionRequests.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {sessionRequests.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="animate-in">
          <div className="space-y-3">
            {sessionRequests.length > 0 ? (
              sessionRequests.map((request) => (
                <Card key={request.id} className="card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${request.avatar}`}
                            alt={request.name}
                          />
                          <AvatarFallback>{request.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{request.name}</p>
                          <div className="flex items-center">
                            <Badge variant="secondary" className="text-xs mr-2">
                              {request.skill}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {request.type === "teaching" ? "You teach" : "You learn"}
                            </Badge>
                          </div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span className="mr-2">{request.date}</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{request.time}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => handleRejectRequest(request.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 w-8 p-0 rounded-full"
                          onClick={() => handleAcceptRequest(request.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pending session requests.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="animate-in">
          <div className="flex justify-between mb-4">
            <Button variant="outline" className="text-sm" onClick={() => setShowCombineDialog(true)}>
              <Users className="h-4 w-4 mr-2" />
              Combine Sessions
            </Button>
            <Button variant="outline" className="text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              Recurring Sessions
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="card-hover">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        {selectedSessions.includes(session.id) && (
                          <div className="absolute -top-1 -left-1 bg-primary rounded-full h-4 w-4 flex items-center justify-center">
                            <Check className="h-3 w-3 text-primary-foreground" />
                          </div>
                        )}
                        <Avatar
                          className={`h-10 w-10 border ${
                            selectedSessions.includes(session.id) ? "border-primary" : "border-border"
                          }`}
                          onClick={() => toggleSessionSelection(session.id)}
                        >
                          <AvatarImage
                            src={`/placeholder.svg?height=40&width=40&text=${session.avatar}`}
                            alt={session.name}
                          />
                          <AvatarFallback>{session.avatar}</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <p className="font-semibold">{session.name}</p>
                        <div className="flex items-center">
                          <Badge variant="secondary" className="text-xs mr-2">
                            {session.skill}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {session.type === "teaching" ? "You teach" : "You learn"}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span className="mr-2">{session.date}</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{session.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 rounded-full"
                        onClick={() => handleEditSession(session)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Combine Sessions Dialog */}
      <Dialog open={showCombineDialog} onOpenChange={setShowCombineDialog}>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle>Combine Sessions</DialogTitle>
            <DialogDescription>Select multiple sessions to combine into a group session.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm font-medium">Selected Sessions: {selectedSessions.length}</p>

            <div className="space-y-3 max-h-60 overflow-y-auto">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    selectedSessions.includes(session.id)
                      ? "bg-primary/10 border border-primary/20"
                      : "border border-border hover:bg-muted/50"
                  }`}
                  onClick={() => toggleSessionSelection(session.id)}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&text=${session.avatar}`}
                        alt={session.name}
                      />
                      <AvatarFallback>{session.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{session.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <span className="mr-2">{session.skill}</span>
                        <span>•</span>
                        <span className="mx-2">{session.date}</span>
                        <span>•</span>
                        <span className="ml-2">{session.time}</span>
                      </div>
                    </div>
                  </div>

                  {selectedSessions.includes(session.id) && <Check className="h-4 w-4 text-primary" />}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label>Group Session Name</Label>
              <input
                type="text"
                placeholder="e.g., Language Exchange Group"
                className="w-full border rounded-md p-2 bg-background"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowCombineDialog(false)
                setSelectedSessions([])
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCombineSessions} disabled={selectedSessions.length < 2}>
              Combine {selectedSessions.length > 0 && `(${selectedSessions.length})`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Session Dialog */}
      {editingSession && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="glass-effect">
            <DialogHeader>
              <DialogTitle>Edit Session</DialogTitle>
              <DialogDescription>Make changes to your session with {editingSession.name}.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40&text=${editingSession.avatar}`}
                    alt={editingSession.name}
                  />
                  <AvatarFallback>{editingSession.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{editingSession.name}</p>
                  <Badge variant="secondary" className="text-xs">
                    {editingSession.skill}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Select defaultValue={editingSession.date}>
                    <SelectTrigger>
                      <SelectValue placeholder={editingSession.date} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Today">Today</SelectItem>
                      <SelectItem value="Tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="Aug 25">Aug 25</SelectItem>
                      <SelectItem value="Aug 26">Aug 26</SelectItem>
                      <SelectItem value="Aug 27">Aug 27</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <Select defaultValue={editingSession.time}>
                    <SelectTrigger>
                      <SelectValue placeholder={editingSession.time} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</SelectItem>
                      <SelectItem value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</SelectItem>
                      <SelectItem value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</SelectItem>
                      <SelectItem value="6:30 PM - 7:30 PM">6:30 PM - 7:30 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recurring">Make recurring</Label>
                  <Switch id="recurring" checked={recurringEnabled} onCheckedChange={setRecurringEnabled} />
                </div>

                {recurringEnabled && (
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="reminder">Send reminder</Label>
                <Switch id="reminder" checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
              </div>

              {reminderEnabled && (
                <Select defaultValue="1hour">
                  <SelectTrigger>
                    <SelectValue placeholder="Reminder time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes before</SelectItem>
                    <SelectItem value="30min">30 minutes before</SelectItem>
                    <SelectItem value="1hour">1 hour before</SelectItem>
                    <SelectItem value="1day">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditDialog(false)
                  setEditingSession(null)
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
