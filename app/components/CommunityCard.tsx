"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, MessageSquare, ChevronRight, UserPlus, UserMinus, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"

interface CommunityCardProps {
  community: {
    id: string
    name: string
    members: number
    icon: string
    topics: string[]
    description: string
    events: number
    posts: number
  }
  onCardClick: () => void
}

// Maximum number of communities a user can join
const MAX_COMMUNITIES = 7

export default function CommunityCard({ community, onCardClick }: CommunityCardProps) {
  const [isJoined, setIsJoined] = useState(false)
  const [showJoinConfirm, setShowJoinConfirm] = useState(false)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const [showLimitDialog, setShowLimitDialog] = useState(false)

  // Check if joined on mount and when localStorage changes
  useEffect(() => {
    const checkIfJoined = () => {
      try {
        const saved = localStorage.getItem("erudite-joined-communities")
        const joinedCommunities = saved ? JSON.parse(saved) : []
        setIsJoined(joinedCommunities.includes(community.id))
      } catch (error) {
        console.error("Error checking if joined:", error)
      }
    }

    checkIfJoined()

    // Listen for storage events
    window.addEventListener("storage", checkIfJoined)

    // Check periodically as a fallback
    const interval = setInterval(checkIfJoined, 1000)

    return () => {
      window.removeEventListener("storage", checkIfJoined)
      clearInterval(interval)
    }
  }, [community.id])

  // Handle joining a community
  const handleJoin = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click

    try {
      // Get current joined communities
      const saved = localStorage.getItem("erudite-joined-communities")
      const currentJoined = saved ? JSON.parse(saved) : []

      // Check community limit
      if (currentJoined.length >= MAX_COMMUNITIES) {
        setShowLimitDialog(true)
        return
      }

      // Show join confirmation
      setShowJoinConfirm(true)
    } catch (error) {
      console.error("Error handling join:", error)
    }
  }

  // Confirm joining
  const confirmJoin = () => {
    try {
      // Get current joined communities
      const saved = localStorage.getItem("erudite-joined-communities")
      const currentJoined = saved ? JSON.parse(saved) : []

      // Add to joined communities
      const newJoinedList = [...currentJoined, community.id]
      localStorage.setItem("erudite-joined-communities", JSON.stringify(newJoinedList))

      // Update state
      setIsJoined(true)
      setShowJoinConfirm(false)

      // Show toast
      toast({
        title: "Joined Community",
        description: `You have joined ${community.name}`,
      })

      // Dispatch storage event to notify other components
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "erudite-joined-communities",
          newValue: JSON.stringify(newJoinedList),
        }),
      )
    } catch (error) {
      console.error("Error confirming join:", error)
    }
  }

  // Handle leaving a community
  const handleLeave = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    e.preventDefault() // Add this to be extra safe

    console.log("Leave button clicked for community:", community.id)

    try {
      // Show leave confirmation
      setShowLeaveConfirm(true)
    } catch (error) {
      console.error("Error handling leave:", error)
    }
  }

  // Confirm leaving
  const confirmLeave = () => {
    try {
      console.log("Confirming leave for community:", community.id)

      // Get current joined communities
      const saved = localStorage.getItem("erudite-joined-communities")
      const currentJoined = saved ? JSON.parse(saved) : []
      console.log("Current joined communities:", currentJoined)

      // Remove from joined communities
      const newJoinedList = currentJoined.filter((id: string) => id !== community.id)
      console.log("New joined list:", newJoinedList)

      localStorage.setItem("erudite-joined-communities", JSON.stringify(newJoinedList))

      // Update state
      setIsJoined(false)
      setShowLeaveConfirm(false)

      // Show toast
      toast({
        title: "Left Community",
        description: `You have successfully left ${community.name}`,
        variant: "default",
        duration: 3000,
      })

      // Dispatch storage event to notify other components
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "erudite-joined-communities",
          newValue: JSON.stringify(newJoinedList),
        }),
      )
    } catch (error) {
      console.error("Error confirming leave:", error)
    }
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="h-full"
      >
        <Card className="h-full overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group">
          <div className="relative">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary)/0.2)] via-[hsl(var(--primary)/0.15)] to-[hsl(var(--secondary)/0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Header */}
            <CardHeader className="relative z-10 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="text-3xl bg-gradient-to-br from-white to-gray-100 h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300">
                      {community.icon}
                    </div>
                    {community.posts > 100 && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <TrendingUp className="h-3 w-3" />
                        Hot
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {community.name}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-2">
                      <Users className="h-4 w-4 mr-2 text-primary" />
                      <span className="font-medium">{community.members.toLocaleString()}</span>
                      <span className="ml-1">members</span>
                    </div>
                  </div>
                </div>

                {/* Join/Leave Button */}
                {isJoined ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLeave}
                    className="flex items-center gap-2 bg-white/80 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300 shadow-md"
                  >
                    <UserMinus className="h-4 w-4" />
                    Leave
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={handleJoin}
                    className="flex items-center gap-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <UserPlus className="h-4 w-4" />
                    Join
                  </Button>
                )}
              </div>
            </CardHeader>
          </div>

          {/* Content */}
          <div className="px-6 pb-6" onClick={onCardClick}>
            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{community.description}</p>

            {/* Topics */}
            <div className="flex flex-wrap gap-2 mb-4">
              {community.topics.slice(0, 3).map((topic) => (
                <Badge
                  key={topic}
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0 px-3 py-1 text-xs font-medium"
                >
                  {topic}
                </Badge>
              ))}
              {community.topics.length > 3 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-0 px-3 py-1 text-xs">
                  +{community.topics.length - 3} more
                </Badge>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">{community.events}</span>
                  <span>events</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="font-medium">{community.posts}</span>
                  <span>posts</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary/80 hover:bg-primary/10 p-0 h-auto font-medium group-hover:translate-x-1 transition-transform duration-300"
              >
                View
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Join Confirmation Dialog */}
      {showJoinConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Join Community</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Are you sure you want to join {community.name}? You'll receive updates and can participate in discussions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowJoinConfirm(false)}
                className="sm:w-auto w-full bg-white/80 border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmJoin}
                className="sm:w-auto w-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-white shadow-lg"
              >
                Join Community
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Leave Confirmation Dialog */}
      {showLeaveConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-8 border border-white/20"
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
          >
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Leave Community</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Are you sure you want to leave {community.name}? You can always rejoin later.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setShowLeaveConfirm(false)
                }}
                className="sm:w-auto w-full bg-white/80 border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  confirmLeave()
                }}
                className="sm:w-auto w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
              >
                Leave Community
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Community Limit Dialog */}
      {showLimitDialog && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl max-w-md w-full p-8 border border-white/20"
          >
            <h2 className="text-2xl font-bold mb-3 flex items-center text-gray-900">
              <span className="text-orange-500 mr-3 text-3xl">⚠️</span>
              Community Limit Reached
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You can only join a maximum of {MAX_COMMUNITIES} communities to prevent multitasking overload.
            </p>
            <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200 mb-6">
              <p className="text-sm text-orange-800 leading-relaxed">
                Research shows that focusing on too many skills or communities at once can reduce your effectiveness in
                learning and participation. We recommend leaving a community you're less active in before joining a new
                one.
              </p>
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowLimitDialog(false)}
                className="bg-white/80 border-gray-200 hover:bg-gray-50"
              >
                Got it
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
