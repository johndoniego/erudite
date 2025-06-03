"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, CalendarDays, MessageSquare, Plus, Heart, Bookmark, X, ImageIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { useRef } from "react"

import { toast } from "@/components/ui/use-toast"
import { savePost, unsavePost, type SavedPost, getSavedPosts } from "@/app/utils/saved-posts"

export default function CommunityPage() {
  const router = useRouter()
  const params = useParams()
  const communityId = params.id as string
  const [community, setCommunity] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("posts")
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostTags, setNewPostTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("")
  const [communityPosts, setCommunityPosts] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [postLikes, setPostLikes] = useState<Record<string, number>>({})
  const [userLikes, setUserLikes] = useState<Record<string, boolean>>({})
  const [postComments, setPostComments] = useState<Record<string, any[]>>({})
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const [newComment, setNewComment] = useState<Record<string, string>>({})
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set())

  // Event functionality
  const [eventRSVPs, setEventRSVPs] = useState<Record<string, boolean>>({})
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [newEventTitle, setNewEventTitle] = useState("")
  const [newEventDescription, setNewEventDescription] = useState("")
  const [newEventDate, setNewEventDate] = useState("")
  const [newEventTime, setNewEventTime] = useState("")
  const [newEventLocation, setNewEventLocation] = useState("")
  const [newEventMaxAttendees, setNewEventMaxAttendees] = useState("")

  // Member profile functionality
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [showMemberProfile, setShowMemberProfile] = useState(false)
  const [memberConnections, setMemberConnections] = useState<Record<string, "none" | "pending" | "connected">>({})
  const [showScheduleDialog, setShowScheduleDialog] = useState(false)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleNotes, setScheduleNotes] = useState("")
  const [memberFollowing, setMemberFollowing] = useState<Record<string, boolean>>({})
  const [showRatingDialog, setShowRatingDialog] = useState(false)
  const [memberRating, setMemberRating] = useState(5)
  const [ratingComment, setRatingComment] = useState("")

  const [communitiesData, setCommunitiesData] = useState<any>({})
  const [showLimitDialog, setShowLimitDialog] = useState(false)
  const [showJoinConfirm, setShowJoinConfirm] = useState(false)
  const [isJoined, setIsJoined] = useState(false)
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    // Load community data from localStorage
    const loadCommunity = () => {
      try {
        setLoading(true)

        // First check custom communities
        const customCommunitiesStr = localStorage.getItem("erudite-communities")
        const customCommunities = customCommunitiesStr ? JSON.parse(customCommunitiesStr) : []

        let foundCommunity = customCommunities.find((c: any) => c.id === communityId)

        // If not found in custom, check predefined communities
        if (!foundCommunity) {
          // These are the predefined communities from the communities page
          const predefinedCommunities = [
            {
              id: "web-dev",
              name: "Web Developers",
              members: 1243,
              icon: "💻",
              topics: ["JavaScript", "React", "CSS"],
              description:
                "A community for web developers to share knowledge, ask questions, and collaborate on projects.",
              events: 3,
              posts: 127,
              createdAt: "2023-01-15",
              category: "Programming",
            },
            {
              id: "language-exchange",
              name: "Language Exchange",
              members: 856,
              icon: "🌎",
              topics: ["Spanish", "French", "ESL"],
              description: "Practice languages with native speakers and fellow learners in a supportive environment.",
              events: 5,
              posts: 89,
              createdAt: "2023-02-20",
              category: "Languages",
            },
            {
              id: "music-arts",
              name: "Music & Arts",
              members: 721,
              icon: "🎵",
              topics: ["Guitar", "Piano", "Drawing"],
              description: "Share your creative work, get feedback, and learn new artistic skills from others.",
              events: 2,
              posts: 64,
              createdAt: "2023-03-10",
              category: "Arts",
            },
            {
              id: "fitness",
              name: "Fitness Enthusiasts",
              members: 932,
              icon: "💪",
              topics: ["Yoga", "Running", "Nutrition"],
              description:
                "Connect with others passionate about fitness, share workout routines, and motivate each other.",
              events: 4,
              posts: 103,
              createdAt: "2023-01-05",
              category: "Fitness",
            },
            {
              id: "book-club",
              name: "Book Club",
              members: 543,
              icon: "📚",
              topics: ["Fiction", "Non-Fiction", "Poetry"],
              description: "Discuss books, share recommendations, and participate in monthly reading challenges.",
              events: 1,
              posts: 78,
              createdAt: "2023-04-12",
              category: "Education",
            },
            {
              id: "tech-startups",
              name: "Tech Startups",
              members: 689,
              icon: "🚀",
              topics: ["Entrepreneurship", "Funding", "Product Development"],
              description:
                "Network with founders, share startup experiences, and discuss the latest in tech innovation.",
              events: 2,
              posts: 91,
              createdAt: "2023-02-28",
              category: "Business",
            },
            {
              id: "photography",
              name: "Photography",
              members: 812,
              icon: "📷",
              topics: ["Landscape", "Portrait", "Editing"],
              description:
                "Share your photos, get feedback, and learn new photography techniques from fellow enthusiasts.",
              events: 3,
              posts: 115,
              createdAt: "2023-03-22",
              category: "Arts",
            },
            {
              id: "cooking",
              name: "Cooking & Recipes",
              members: 1105,
              icon: "🍳",
              topics: ["Baking", "Vegan", "International Cuisine"],
              description: "Exchange recipes, cooking tips, and food photography in this culinary community.",
              events: 4,
              posts: 132,
              createdAt: "2023-01-30",
              category: "Lifestyle",
            },
          ]

          foundCommunity = predefinedCommunities.find((c) => c.id === communityId)
        }

        if (foundCommunity) {
          setCommunity(foundCommunity)

          // Load posts for this community from localStorage
          const communityPostsKey = `erudite-community-posts-${communityId}`
          const savedPosts = localStorage.getItem(communityPostsKey)
          if (savedPosts) {
            setCommunityPosts(JSON.parse(savedPosts))
          }
        } else {
          console.error("Community not found:", communityId)
        }
      } catch (error) {
        console.error("Error loading community:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCommunity()
  }, [communityId])

  useEffect(() => {
    // Load saved posts from localStorage
    const savedPosts = getSavedPosts()
    setSavedPostIds(new Set(savedPosts.map((post) => post.id)))
  }, [])

  const handleJoin = () => {
    if (Object.keys(communitiesData).filter((key) => communitiesData[key].joined).length >= 7) {
      setShowLimitDialog(true)
    } else {
      setShowJoinConfirm(true)
    }
  }

  const confirmJoin = () => {
    setIsJoined(true)
    setCommunity((prevCommunity: any) => ({ ...prevCommunity, joined: true }))
    setShowJoinConfirm(false)
    toast({
      title: "Community Joined",
      description: `You've successfully joined ${community?.name}!`,
    })
  }

  const confirmLeave = () => {
    setIsJoined(false)
    setCommunity((prevCommunity: any) => ({ ...prevCommunity, joined: false }))
    setShowLeaveConfirm(false)
    toast({
      title: "Community Left",
      description: `You've left ${community?.name}. You can rejoin anytime.`,
    })
  }

  const toggleNotifications = () => {
    setIsNotificationsEnabled(!isNotificationsEnabled)
    toast({
      title: isNotificationsEnabled ? "Notifications Muted" : "Notifications Enabled",
      description: isNotificationsEnabled
        ? "You will no longer receive notifications from this community."
        : "You will now receive notifications from this community.",
    })
  }

  const handleCreatePost = () => {
    console.log("Creating post with content:", newPostContent)

    if (!newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty.",
        variant: "destructive",
      })
      return
    }

    const newPost = {
      id: `post-${Date.now()}`,
      author: "You",
      authorAvatar: "ME",
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      image: selectedImage || null,
      tags: newPostTags,
    }

    console.log("New post created:", newPost)

    const updatedPosts = [newPost, ...communityPosts]
    setCommunityPosts(updatedPosts)

    // Save posts to localStorage for this specific community
    const communityPostsKey = `erudite-community-posts-${communityId}`
    localStorage.setItem(communityPostsKey, JSON.stringify(updatedPosts))
    console.log("Posts saved to localStorage:", communityPostsKey)

    // Reset form
    setNewPostContent("")
    setNewPostTags([])
    setCurrentTag("")
    setSelectedImage(null)
    setImageFile(null)
    setShowCreatePost(false)

    toast({
      title: "Post Created",
      description: "Your post has been successfully created and shared.",
    })
  }

  const handleAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentTag.trim() !== "") {
      event.preventDefault()
      setNewPostTags([...newPostTags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setNewPostTags(newPostTags.filter((tag) => tag !== tagToRemove))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB.",
          variant: "destructive",
        })
        return
      }

      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImageFile(null)
  }

  const handleLikePost = (postId: string) => {
    setUserLikes((prevUserLikes) => ({
      ...prevUserLikes,
      [postId]: !prevUserLikes[postId],
    }))

    setPostLikes((prevPostLikes) => ({
      ...prevPostLikes,
      [postId]:
        (prevPostLikes[postId] || communityPosts.find((post) => post.id === postId)?.likes || 0) +
        (userLikes[postId] ? -1 : 1),
    }))
  }

  const toggleComments = (postId: string) => {
    setShowComments((prevShowComments) => ({
      ...prevShowComments,
      [postId]: !prevShowComments[postId],
    }))
  }

  const handleAddComment = (postId: string) => {
    if (!newComment[postId]?.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty.",
        variant: "destructive",
      })
      return
    }

    const comment = {
      id: `comment-${Date.now()}`,
      author: "You",
      authorAvatar: "ME",
      content: newComment[postId],
      timestamp: "Just now",
    }

    setPostComments((prevPostComments) => ({
      ...prevPostComments,
      [postId]: [...(prevPostComments[postId] || []), comment],
    }))

    setNewComment((prevNewComment) => ({
      ...prevNewComment,
      [postId]: "",
    }))
  }

  const handleDeletePost = (postId: string) => {
    setCommunityPosts(communityPosts.filter((post) => post.id !== postId))
    setShowDeleteConfirm(null)

    toast({
      title: "Post Deleted",
      description: "Your post has been successfully deleted.",
    })
  }

  const handleRSVP = (eventId: string) => {
    setEventRSVPs((prevEventRSVPs) => ({
      ...prevEventRSVPs,
      [eventId]: !prevEventRSVPs[eventId],
    }))

    toast({
      title: eventRSVPs[eventId] ? "RSVP Cancelled" : "RSVP Confirmed",
      description: eventRSVPs[eventId]
        ? "You have cancelled your RSVP for this event."
        : "You have successfully RSVP'd for this event.",
    })
  }

  const handleCreateEvent = () => {
    if (!newEventTitle.trim() || !newEventDate || !newEventTime) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newEvent = {
      id: `event-${Date.now()}`,
      title: newEventTitle,
      description: newEventDescription,
      date: newEventDate,
      time: newEventTime,
      location: newEventLocation,
      attendees: 0,
      maxAttendees: Number.parseInt(newEventMaxAttendees || "50"),
      organizer: "You",
      organizerAvatar: "ME",
    }

    // Add the new event to the community's events array (mock data)
    communitiesData[communityId].events = [newEvent, ...communitiesData[communityId].events]

    // Reset form
    setShowCreateEvent(false)
    setNewEventTitle("")
    setNewEventDescription("")
    setNewEventDate("")
    setNewEventTime("")
    setNewEventLocation("")
    setNewEventMaxAttendees("")

    toast({
      title: "Event Created",
      description: "Your event has been successfully created.",
    })
  }

  // Member profile functionality
  const handleViewMember = (member: any) => {
    setSelectedMember(member)
    setShowMemberProfile(true)
  }

  const handleConnectMember = (memberId: string) => {
    const currentStatus = memberConnections[memberId] || "none"

    if (currentStatus === "none") {
      setMemberConnections((prev) => ({
        ...prev,
        [memberId]: "pending",
      }))
      toast({
        title: "Connection Request Sent",
        description: `Your request to connect with ${selectedMember?.name} has been sent.`,
        duration: 3000,
      })
    } else if (currentStatus === "pending") {
      setMemberConnections((prev) => ({
        ...prev,
        [memberId]: "none",
      }))
      toast({
        title: "Request Cancelled",
        description: "Connection request has been cancelled.",
        duration: 2000,
      })
    } else if (currentStatus === "connected") {
      setMemberConnections((prev) => ({
        ...prev,
        [memberId]: "none",
      }))
      toast({
        title: "Connection Removed",
        description: `You are no longer connected with ${selectedMember?.name}.`,
        duration: 2000,
      })
    }
  }

  const handleMessageMember = (memberId: string) => {
    // Close the profile dialog
    setShowMemberProfile(false)

    // Create a chat ID based on the member's name (convert to lowercase, remove spaces)
    const chatId = selectedMember?.name
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "")

    // Navigate to chat with this specific member
    router.push(`/chat?member=${chatId}&name=${encodeURIComponent(selectedMember?.name)}`)

    toast({
      title: "Opening Chat",
      description: `Starting a conversation with ${selectedMember?.name}.`,
      duration: 2000,
    })
  }

  const handleScheduleWithMember = (memberId: string) => {
    setShowScheduleDialog(true)
  }

  const handleBookTimeSlot = (slot: string) => {
    setSelectedTimeSlot(slot)
    setShowScheduleDialog(true)
  }

  const handleConfirmSchedule = () => {
    if (!scheduleDate || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a date and time slot.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would create a calendar event
    toast({
      title: "Session Scheduled",
      description: `Session with ${selectedMember?.name} scheduled for ${scheduleDate} at ${selectedTimeSlot}.`,
      duration: 4000,
    })

    // Reset form
    setShowScheduleDialog(false)
    setSelectedTimeSlot("")
    setScheduleDate("")
    setScheduleNotes("")
  }

  const handleFollowMember = (memberId: string) => {
    setMemberFollowing((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }))

    toast({
      title: memberFollowing[memberId] ? "Unfollowed" : "Following",
      description: memberFollowing[memberId]
        ? `You unfollowed ${selectedMember?.name}`
        : `You are now following ${selectedMember?.name}`,
      duration: 2000,
    })
  }

  const handleRateMember = () => {
    setShowRatingDialog(true)
  }

  const handleSubmitRating = () => {
    if (memberRating < 1 || memberRating > 5) {
      toast({
        title: "Invalid Rating",
        description: "Please select a rating between 1 and 5 stars.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Rating Submitted",
      description: `Thank you for rating ${selectedMember?.name}!`,
      duration: 3000,
    })

    setShowRatingDialog(false)
    setMemberRating(5)
    setRatingComment("")
  }

  const getConnectionButtonText = (memberId: string) => {
    const status = memberConnections[memberId] || "none"
    switch (status) {
      case "pending":
        return "Pending"
      case "connected":
        return "Connected"
      default:
        return "Connect"
    }
  }

  const getConnectionButtonVariant = (memberId: string) => {
    const status = memberConnections[memberId] || "none"
    switch (status) {
      case "pending":
        return "outline"
      case "connected":
        return "secondary"
      default:
        return "default"
    }
  }

  // Handle saving posts
  const handleSavePost = (post: any) => {
    if (!community) return

    const savedPost: SavedPost = {
      id: post.id,
      title: post.title || post.content.substring(0, 50) + "...",
      content: post.content,
      author: post.author,
      authorAvatar: post.authorAvatar || "?",
      timestamp: post.timestamp,
      likes: post.likes,
      comments: post.comments?.length || 0,
      type: "community",
      sourceId: communityId,
      sourceName: community.name,
    }

    if (savedPostIds.has(post.id)) {
      unsavePost(post.id)
      setSavedPostIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(post.id)
        return newSet
      })
      toast({
        title: "Post Unsaved",
        description: "Post removed from your saved items",
        duration: 2000,
      })
    } else {
      savePost(savedPost)
      setSavedPostIds((prev) => new Set(prev).add(post.id))
      toast({
        title: "Post Saved",
        description: "Post added to your saved items",
        duration: 2000,
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
          <div className="h-4 w-64 bg-gray-200 rounded mx-auto"></div>
        </div>
      </div>
    )
  }

  if (!community) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Community Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The community you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => router.push("/communities")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Communities
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[hsl(var(--primary)/0.05)] to-[hsl(var(--secondary)/0.05)]">
      {/* Back button and header */}
      <div className="bg-background border-b border-border/40 p-4 flex items-center">
        <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/communities")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold truncate">{community.name}</h1>
      </div>

      {/* Community header */}
      <div className="relative">
        <div className="h-48 w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.2)] to-[hsl(var(--secondary)/0.2)] mix-blend-multiply z-10"></div>
          <div className="w-full h-full bg-gray-200"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20"></div>
        </div>

        <div className="absolute -bottom-12 left-4 border-4 border-background rounded-full shadow-lg z-30">
          <Avatar className="h-24 w-24">
            <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white text-xl">
              {community.icon || community.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Community info */}
      <div className="mt-16 px-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
              {community.name}
            </h2>
            <div className="flex items-center text-muted-foreground mt-2">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <span className="font-medium">{community.members || 1} members</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-muted-foreground leading-relaxed">{community.description}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {community.topics &&
            community.topics.map((topic: string) => (
              <Badge
                key={topic}
                variant="outline"
                className="bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] hover:from-[hsl(var(--primary)/0.2)] hover:to-[hsl(var(--secondary)/0.2)] text-foreground border-0 px-3 py-1 rounded-full transition-all duration-300"
              >
                {topic}
              </Badge>
            ))}
        </div>
      </div>

      {/* Tabs for different sections */}
      <div className="mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mx-4 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl p-1">
            <TabsTrigger
              value="posts"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--secondary))] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--secondary))] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
            >
              <CalendarDays className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger
              value="members"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--secondary))] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-300"
            >
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="p-4 space-y-4">
            <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
              <DialogTrigger asChild>
                <Button
                  className="w-full gap-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-white shadow-lg"
                  onClick={() => setShowCreatePost(true)}
                >
                  <Plus className="h-4 w-4" /> Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Post in {community.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="content">What's on your mind?</Label>
                    <Textarea
                      id="content"
                      placeholder="Share your thoughts, questions, or insights..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  {/* Image Upload Section */}
                  <div>
                    <Label>Add Image (Optional)</Label>
                    <div className="mt-2">
                      {selectedImage ? (
                        <div className="relative">
                          <img
                            src={selectedImage || "/placeholder.svg"}
                            alt="Selected"
                            className="w-full h-48 object-cover rounded-md border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-8 w-8"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div
                          className="border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload an image</p>
                          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input
                      id="tags"
                      placeholder="Add tags (press Enter to add)"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyDown={handleAddTag}
                    />
                    {newPostTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {newPostTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                            onClick={() => removeTag(tag)}
                          >
                            {tag} ×
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreatePost(false)
                        setNewPostContent("")
                        setNewPostTags([])
                        setCurrentTag("")
                        setSelectedImage(null)
                        setImageFile(null)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreatePost}
                      disabled={!newPostContent.trim()}
                      className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)]"
                    >
                      Create Post
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {communityPosts.length === 0 ? (
              <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">Be the first to start a conversation in this community!</p>
                </CardContent>
              </Card>
            ) : (
              communityPosts.map((post) => (
                <Card
                  key={post.id}
                  className="overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                        <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--primary)/0.8)] to-[hsl(var(--secondary)/0.8)] text-white">
                          {post.authorAvatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{post.author}</h3>
                            <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                          </div>
                        </div>
                        <p className="mt-3 leading-relaxed text-foreground/90">{post.content}</p>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {post.tags.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {post.image && (
                          <div className="mt-4 rounded-xl overflow-hidden border border-white/20 shadow-md group-hover:shadow-lg transition-all duration-300">
                            <img
                              src={post.image || "/placeholder.svg"}
                              alt="Post attachment"
                              className="w-full h-auto object-cover max-h-96 transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                          </div>
                        )}

                        <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground border-t border-border/30 pt-4">
                          <button
                            className={`flex items-center gap-2 hover:text-primary transition-all duration-300 ${
                              userLikes[post.id] ? "text-red-500" : ""
                            } group/like`}
                            onClick={() => handleLikePost(post.id)}
                          >
                            <div
                              className={`p-1.5 rounded-full ${userLikes[post.id] ? "bg-red-100" : "bg-muted group-hover/like:bg-primary/10"} transition-colors duration-300`}
                            >
                              <Heart
                                className={`h-4 w-4 ${userLikes[post.id] ? "fill-current" : ""} transition-transform duration-300 group-hover/like:scale-110`}
                              />
                            </div>
                            <span className="font-medium">{postLikes[post.id] || post.likes || 0}</span>
                          </button>

                          <button
                            className="flex items-center gap-2 hover:text-primary transition-all duration-300 group/comment"
                            onClick={() => toggleComments(post.id)}
                          >
                            <div
                              className={`p-1.5 rounded-full ${showComments[post.id] ? "bg-primary/10" : "bg-muted group-hover/comment:bg-primary/10"} transition-colors duration-300`}
                            >
                              <MessageSquare className="h-4 w-4 transition-transform duration-300 group-hover/comment:scale-110" />
                            </div>
                            <span className="font-medium">
                              {(postComments[post.id]?.length || 0) + (post.comments || 0)}
                            </span>
                          </button>

                          <button
                            className={`flex items-center gap-2 hover:text-primary transition-all duration-300 ${
                              savedPostIds.has(post.id) ? "text-primary" : ""
                            } group/save ml-auto`}
                            onClick={() => handleSavePost(post)}
                          >
                            <div
                              className={`p-1.5 rounded-full ${savedPostIds.has(post.id) ? "bg-primary/10" : "bg-muted group-hover/save:bg-primary/10"} transition-colors duration-300`}
                            >
                              <Bookmark
                                className={`h-4 w-4 ${savedPostIds.has(post.id) ? "fill-current" : ""} transition-transform duration-300 group-hover/save:scale-110`}
                              />
                            </div>
                            <span className="font-medium">{savedPostIds.has(post.id) ? "Saved" : "Save"}</span>
                          </button>
                        </div>

                        {/* Comments Section */}
                        {showComments[post.id] && (
                          <div className="mt-4 space-y-3">
                            {/* Add Comment */}
                            <div className="flex gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarFallback className="text-xs">ME</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex gap-2">
                                <Input
                                  placeholder="Write a comment..."
                                  value={newComment[post.id] || ""}
                                  onChange={(e) =>
                                    setNewComment((prev) => ({
                                      ...prev,
                                      [post.id]: e.target.value,
                                    }))
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                      e.preventDefault()
                                      handleAddComment(post.id)
                                    }
                                  }}
                                  className="text-sm"
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!newComment[post.id]?.trim()}
                                >
                                  Post
                                </Button>
                              </div>
                            </div>

                            {/* Comments List */}
                            {postComments[post.id]?.map((comment: any) => (
                              <div key={comment.id} className="flex gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">{comment.authorAvatar}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-muted/30 rounded-lg p-2">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs font-medium">{comment.author}</span>
                                      <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                                    </div>
                                    <p className="text-xs">{comment.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="events" className="p-4">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-medium mb-2">No upcoming events</h3>
                <p className="text-muted-foreground">Create an event to bring community members together!</p>
                <Button className="mt-4">Create Event</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="p-4">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 py-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--primary)/0.8)] to-[hsl(var(--secondary)/0.8)] text-white">
                      ME
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">You</div>
                    <div className="text-xs text-muted-foreground">Creator</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
