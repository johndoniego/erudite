"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, UserPlus, Check, X, MapPin, Star, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
  DialogTrigger,
} from "@/components/ui/dialog"

interface ConnectProps {
  onViewProfile: (name: string) => void
}

export default function Connect({ onViewProfile }: ConnectProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [connectionRequests, setConnectionRequests] = useState([
    { id: "req1", name: "Emma Garcia", avatar: "EG", skill: "Yoga", status: "pending" },
    { id: "req2", name: "Frank Miller", avatar: "FM", skill: "Marketing", status: "pending" },
  ])

  // Mock data for potential connections
  const allUsers = [
    {
      id: "user1",
      name: "David Lee",
      avatar: "DL",
      skills: ["Python", "Data Science", "Machine Learning"],
      matchScore: 85,
      distance: "2 miles away",
      lastActive: "Just now",
    },
    {
      id: "user2",
      name: "Emma Garcia",
      avatar: "EG",
      skills: ["Yoga", "Meditation", "Nutrition"],
      matchScore: 78,
      distance: "5 miles away",
      lastActive: "2 hours ago",
    },
    {
      id: "user3",
      name: "Frank Miller",
      avatar: "FM",
      skills: ["Marketing", "Public Speaking", "Leadership"],
      matchScore: 92,
      distance: "1 mile away",
      lastActive: "3 hours ago",
    },
    {
      id: "user4",
      name: "Grace Wilson",
      avatar: "GW",
      skills: ["Spanish", "French", "Italian"],
      matchScore: 65,
      distance: "8 miles away",
      lastActive: "Yesterday",
    },
    {
      id: "user5",
      name: "Henry Taylor",
      avatar: "HT",
      skills: ["Guitar", "Piano", "Music Theory"],
      matchScore: 73,
      distance: "3 miles away",
      lastActive: "2 days ago",
    },
  ]

  // Filter users based on search term and active filter
  const filteredUsers = allUsers.filter((user) => {
    // Search filter
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    // Apply active filter if any
    if (activeFilter === "Nearby") {
      return matchesSearch && Number.parseInt(user.distance) <= 3
    } else if (activeFilter === "High Match") {
      return matchesSearch && user.matchScore >= 80
    } else if (activeFilter === "Recently Active") {
      return matchesSearch && (user.lastActive === "Just now" || user.lastActive === "2 hours ago")
    }

    return matchesSearch
  })

  // Handle connection request
  const handleConnect = (userId: string) => {
    const user = allUsers.find((u) => u.id === userId)
    if (user) {
      // Add to connection requests for the target user
      setConnectionRequests([
        ...connectionRequests,
        {
          id: `req_${Date.now()}`,
          name: user.name,
          avatar: user.avatar,
          skill: user.skills[0],
          status: "pending",
        },
      ])

      // Show success message
      alert(`Connection request sent to ${user.name}`)
    }
  }

  // Handle accepting a connection request
  const handleAcceptRequest = (requestId: string) => {
    setConnectionRequests(
      connectionRequests.map((req) => (req.id === requestId ? { ...req, status: "accepted" } : req)),
    )
  }

  // Handle rejecting a connection request
  const handleRejectRequest = (requestId: string) => {
    setConnectionRequests(connectionRequests.filter((req) => req.id !== requestId))
  }

  // Filter options
  const filters = ["Nearby", "High Match", "Teaching", "Learning", "Recently Active"]

  return (
    <div className="space-y-4">
      <h2 className="section-title">Connect</h2>

      {/* Search and Filter */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-10 bg-card/50"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 mt-2">
                {filters.map((filter) => (
                  <Badge
                    key={filter}
                    variant={activeFilter === filter ? "default" : "outline"}
                    className="cursor-pointer transition-all"
                    onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Tabs defaultValue="discover" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="discover">Discover</TabsTrigger>
          <TabsTrigger value="requests" className="relative">
            Requests
            {connectionRequests.filter((r) => r.status === "pending").length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {connectionRequests.filter((r) => r.status === "pending").length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover" className="animate-in">
          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="glass-card card-hover">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => onViewProfile(user.name)}
                    >
                      <Avatar className="avatar-md gradient-border">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48&text=${user.avatar}`} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary">{user.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <div className="flex items-center text-sm text-muted-foreground space-x-2">
                          <span className="flex items-center text-primary">
                            <Star className="h-3 w-3 mr-1 fill-primary" />
                            <span className="font-medium">{user.matchScore}%</span>
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {user.distance}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {user.lastActive}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                          {user.skills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{user.skills.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="flex items-center" onClick={() => handleConnect(user.id)}>
                      <UserPlus className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No users found matching your search.</p>
                <Button
                  variant="link"
                  onClick={() => {
                    setSearchTerm("")
                    setActiveFilter(null)
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="animate-in">
          <div className="space-y-3">
            {connectionRequests.length > 0 ? (
              connectionRequests.map((request) => (
                <Card key={request.id} className="glass-card card-hover">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => onViewProfile(request.name)}
                      >
                        <Avatar className="avatar-md gradient-border">
                          <AvatarImage
                            src={`/placeholder.svg?height=48&width=48&text=${request.avatar}`}
                            alt={request.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">{request.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{request.name}</p>
                          <Badge variant="secondary" className="text-xs">
                            {request.skill}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">Wants to connect with you</p>
                        </div>
                      </div>

                      {request.status === "pending" ? (
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
                      ) : (
                        <Badge>Connected</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pending connection requests.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Connection Tips Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full mt-4">
            Connection Tips
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-effect">
          <DialogHeader>
            <DialogTitle>Tips for Making Connections</DialogTitle>
            <DialogDescription>Here are some tips to help you connect with other users effectively.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Complete Your Profile</h4>
              <p className="text-sm text-muted-foreground">Users with complete profiles get 3x more connections.</p>
            </div>
            <div>
              <h4 className="font-semibold">Be Specific About Skills</h4>
              <p className="text-sm text-muted-foreground">List specific skills rather than general categories.</p>
            </div>
            <div>
              <h4 className="font-semibold">Respond Promptly</h4>
              <p className="text-sm text-muted-foreground">Respond to connection requests within 48 hours.</p>
            </div>
            <div>
              <h4 className="font-semibold">Start with a Message</h4>
              <p className="text-sm text-muted-foreground">Send a personalized message when connecting.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
