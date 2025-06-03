"use client"

import { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"
import type { ReportReason } from "@/components/ReportDialog"

// Define types
type PostType = "post" | "event" | "poll"

interface Author {
  name: string
  avatar: string
}

interface Community {
  id: string
  name: string
  icon: string
  joined: boolean
}

interface Post {
  id: string
  type: PostType
  community: Community
  author: Author
  content: string
  likes: number
  comments: number
  time: string
  tags: string[]
  isLiked: boolean
  isSaved: boolean
  isFollowed: boolean
  isHidden: boolean
}

interface FeedContextType {
  posts: Post[]
  followPost: (postId: string) => void
  savePost: (postId: string) => void
  hidePost: (postId: string) => void
  showFewerLike: (postId: string) => void
  blockCommunity: (communityId: string) => void
  moreFromCommunity: (communityId: string) => void
  reportPost: (postId: string, reason: ReportReason, details?: string) => void
  likePost: (postId: string) => void
  joinCommunity: (communityId: string) => void
  savedPosts: Post[]
  refreshFeed: () => void
  isRefreshing: boolean
}

// Create context
const FeedContext = createContext<FeedContextType | undefined>(undefined)

// Large pool of mock posts to pull from when refreshing
const allPosts: Post[] = [
  // Original posts
  {
    id: "feed-1",
    type: "post",
    community: {
      id: "web-dev",
      name: "Web Developers",
      icon: "💻",
      joined: true,
    },
    author: {
      name: "Alex Chen",
      avatar: "AC",
    },
    content:
      "Just launched my new portfolio site built with Next.js and Tailwind CSS! Check it out and let me know what you think.",
    likes: 24,
    comments: 8,
    time: "2h ago",
    tags: ["Portfolio", "Next.js"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-2",
    type: "post",
    community: {
      id: "data-science",
      name: "Data Science Hub",
      icon: "📊",
      joined: false,
    },
    author: {
      name: "Sarah Johnson",
      avatar: "SJ",
    },
    content:
      "I've been working on a new machine learning model for predicting customer churn. Here's a visualization of the results so far.",
    likes: 42,
    comments: 15,
    time: "3h ago",
    tags: ["Machine Learning", "Data Visualization"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-3",
    type: "post",
    community: {
      id: "language-exchange",
      name: "Language Exchange",
      icon: "🌎",
      joined: true,
    },
    author: {
      name: "Maria Lopez",
      avatar: "ML",
    },
    content:
      "Looking for a Spanish conversation partner! I'm fluent in English and would like to practice my Spanish. Anyone interested?",
    likes: 12,
    comments: 15,
    time: "5h ago",
    tags: ["Spanish", "Language Practice"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-4",
    type: "post",
    community: {
      id: "photography",
      name: "Photography Enthusiasts",
      icon: "📷",
      joined: false,
    },
    author: {
      name: "James Wilson",
      avatar: "JW",
    },
    content: "Shot this sunset at the beach yesterday. No filters, just perfect natural lighting. What do you think?",
    likes: 89,
    comments: 27,
    time: "8h ago",
    tags: ["Sunset", "Beach", "Photography"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-5",
    type: "post",
    community: {
      id: "fitness",
      name: "Fitness Enthusiasts",
      icon: "💪",
      joined: false,
    },
    author: {
      name: "Ryan Patel",
      avatar: "RP",
    },
    content:
      "Just completed my first marathon! Training for 6 months really paid off. Happy to share my training plan with anyone interested.",
    likes: 56,
    comments: 23,
    time: "1d ago",
    tags: ["Marathon", "Training"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  // Additional posts for refresh
  {
    id: "feed-6",
    type: "post",
    community: {
      id: "cooking",
      name: "Cooking Enthusiasts",
      icon: "🍳",
      joined: true,
    },
    author: {
      name: "Emily Wong",
      avatar: "EW",
    },
    content:
      "Made this incredible sourdough bread from scratch! The starter took 7 days to develop but the results were worth it.",
    likes: 112,
    comments: 34,
    time: "4h ago",
    tags: ["Baking", "Sourdough", "Homemade"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-7",
    type: "post",
    community: {
      id: "ui-design",
      name: "UI/UX Design",
      icon: "🎨",
      joined: false,
    },
    author: {
      name: "Daniel Park",
      avatar: "DP",
    },
    content:
      "Just finished this mobile app redesign concept. Focused on improving navigation and reducing cognitive load. Thoughts?",
    likes: 78,
    comments: 19,
    time: "6h ago",
    tags: ["UI Design", "Mobile", "UX"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-8",
    type: "post",
    community: {
      id: "book-club",
      name: "Book Club",
      icon: "📚",
      joined: true,
    },
    author: {
      name: "Sophia Martinez",
      avatar: "SM",
    },
    content:
      "Just finished 'Project Hail Mary' by Andy Weir. Absolutely loved it! Anyone else read it? Let's discuss (no spoilers).",
    likes: 45,
    comments: 31,
    time: "1h ago",
    tags: ["Books", "Sci-Fi", "Reading"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-9",
    type: "post",
    community: {
      id: "gardening",
      name: "Urban Gardening",
      icon: "🌱",
      joined: false,
    },
    author: {
      name: "Thomas Green",
      avatar: "TG",
    },
    content:
      "My balcony garden is finally thriving! Started with just herbs and now growing tomatoes, peppers, and strawberries.",
    likes: 67,
    comments: 22,
    time: "7h ago",
    tags: ["Gardening", "Urban", "Vegetables"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-10",
    type: "post",
    community: {
      id: "music-production",
      name: "Music Producers",
      icon: "🎵",
      joined: false,
    },
    author: {
      name: "Alicia Keys",
      avatar: "AK",
    },
    content:
      "Just upgraded my home studio with some new monitors and acoustic treatment. The difference in sound quality is incredible!",
    likes: 93,
    comments: 41,
    time: "3h ago",
    tags: ["Music", "Production", "Studio"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-11",
    type: "post",
    community: {
      id: "travel",
      name: "Travel Adventures",
      icon: "✈️",
      joined: true,
    },
    author: {
      name: "Marco Polo",
      avatar: "MP",
    },
    content:
      "Just booked a last-minute trip to Iceland! Any recommendations for must-see spots or hidden gems? First time visiting!",
    likes: 104,
    comments: 53,
    time: "5h ago",
    tags: ["Travel", "Iceland", "Adventure"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-12",
    type: "post",
    community: {
      id: "crypto",
      name: "Cryptocurrency",
      icon: "💰",
      joined: false,
    },
    author: {
      name: "Satoshi N.",
      avatar: "SN",
    },
    content:
      "Interesting developments in the Ethereum ecosystem this week. Layer 2 solutions are really starting to gain traction.",
    likes: 76,
    comments: 29,
    time: "9h ago",
    tags: ["Crypto", "Ethereum", "Blockchain"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-13",
    type: "post",
    community: {
      id: "mental-health",
      name: "Mental Wellness",
      icon: "🧠",
      joined: true,
    },
    author: {
      name: "Dr. Emma Hayes",
      avatar: "EH",
    },
    content:
      "Remember that taking small breaks throughout your workday can significantly improve focus and reduce stress. Even 5 minutes helps!",
    likes: 128,
    comments: 17,
    time: "2h ago",
    tags: ["Mental Health", "Wellness", "Self-Care"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-14",
    type: "post",
    community: {
      id: "gaming",
      name: "Gaming Community",
      icon: "🎮",
      joined: false,
    },
    author: {
      name: "Player One",
      avatar: "P1",
    },
    content:
      "Finally beat that impossible boss after 20+ attempts! The key was timing the dodge perfectly with the attack animation.",
    likes: 87,
    comments: 36,
    time: "4h ago",
    tags: ["Gaming", "Achievement", "Strategy"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
  {
    id: "feed-15",
    type: "post",
    community: {
      id: "diy",
      name: "DIY Projects",
      icon: "🔨",
      joined: true,
    },
    author: {
      name: "Crafty Creator",
      avatar: "CC",
    },
    content:
      "Transformed this old dresser with just paint and new hardware! Total cost was under $50 and it looks brand new.",
    likes: 142,
    comments: 47,
    time: "10h ago",
    tags: ["DIY", "Furniture", "Upcycling"],
    isLiked: false,
    isSaved: false,
    isFollowed: false,
    isHidden: false,
  },
]

// Initial posts to show (first 5)
const initialPosts = allPosts.slice(0, 5)

// Provider component
export function FeedProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [savedPosts, setSavedPosts] = useState<Post[]>([])
  const [blockedCommunities, setBlockedCommunities] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [currentPostIndex, setCurrentPostIndex] = useState(5) // Start after the initial posts
  const { toast } = useToast()

  // Initialize posts on mount, not during render
  useEffect(() => {
    setPosts(initialPosts)
  }, [])

  // Refresh feed with new posts
  const refreshFeed = useCallback(() => {
    setIsRefreshing(true)

    // Simulate network delay
    setTimeout(() => {
      // Get next batch of posts
      const nextBatchSize = 5
      const nextBatch: Post[] = []

      // Get posts that aren't from blocked communities
      const availablePosts = allPosts.filter((post) => !blockedCommunities.includes(post.community.id))

      // Create a new batch of posts by taking some from the beginning and some from later in the array
      // This creates a mix of "new" and "popular" posts
      const startIndex = currentPostIndex % availablePosts.length

      for (let i = 0; i < nextBatchSize; i++) {
        const index = (startIndex + i) % availablePosts.length
        nextBatch.push({ ...availablePosts[index] })
      }

      // Update the current index for next refresh
      setCurrentPostIndex((prevIndex) => (prevIndex + nextBatchSize) % availablePosts.length)

      // Update posts with the new batch
      setPosts(nextBatch)
      setIsRefreshing(false)

      toast({
        title: "Feed refreshed",
        description: "New posts have been loaded",
        duration: 2000,
      })
    }, 800)
  }, [blockedCommunities, currentPostIndex, toast])

  // Follow post
  const followPost = useCallback(
    (postId: string) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const newState = !post.isFollowed
            toast({
              title: newState ? "Following post" : "Unfollowed post",
              description: newState
                ? "You'll receive notifications about this post"
                : "You'll no longer receive notifications about this post",
              duration: 2000,
            })
            return { ...post, isFollowed: newState }
          }
          return post
        }),
      )
    },
    [toast],
  )

  // Save post
  const savePost = useCallback(
    (postId: string) => {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.id === postId) {
            const newState = !post.isSaved

            // Update saved posts collection
            if (newState) {
              setSavedPosts((prev) => [...prev, { ...post, isSaved: true }])
              toast({
                title: "Post saved",
                description: "Post has been added to your saved items",
                duration: 2000,
              })
            } else {
              setSavedPosts((prev) => prev.filter((savedPost) => savedPost.id !== postId))
              toast({
                title: "Post unsaved",
                description: "Post has been removed from your saved items",
                duration: 2000,
              })
            }

            return { ...post, isSaved: newState }
          }
          return post
        })
        return updatedPosts
      })
    },
    [toast],
  )

  // Hide post
  const hidePost = useCallback(
    (postId: string) => {
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.map((post) => {
          if (post.id === postId) {
            toast({
              title: "Post hidden",
              description: "This post will no longer appear in your feed",
              duration: 2000,
            })
            return { ...post, isHidden: true }
          }
          return post
        })

        // Filter out hidden posts
        return updatedPosts.filter((post) => !post.isHidden)
      })
    },
    [toast],
  )

  // Show fewer posts like this
  const showFewerLike = useCallback(
    (postId: string) => {
      const post = posts.find((p) => p.id === postId)
      if (post) {
        toast({
          title: "Preference saved",
          description: `You'll see fewer posts about ${post.tags[0] || "this topic"}`,
          duration: 2000,
        })
      }
    },
    [posts, toast],
  )

  // Block community
  const blockCommunity = useCallback(
    (communityId: string) => {
      setBlockedCommunities((prev) => [...prev, communityId])

      // Remove posts from blocked community
      setPosts((prevPosts) => {
        const updatedPosts = prevPosts.filter((post) => post.community.id !== communityId)

        toast({
          title: "Community blocked",
          description: "You won't see posts from this community anymore",
          variant: "destructive",
          duration: 3000,
        })

        return updatedPosts
      })
    },
    [toast],
  )

  // More from community
  const moreFromCommunity = useCallback(
    (communityId: string) => {
      const community = posts.find((post) => post.community.id === communityId)?.community.name

      toast({
        title: "Preference saved",
        description: `You'll see more posts from ${community || "this community"}`,
        duration: 2000,
      })
    },
    [posts, toast],
  )

  // Report post
  const reportPost = useCallback(
    (postId: string, reason: ReportReason, details?: string) => {
      console.log(`Reporting post ${postId} for ${reason}`, details)

      // In a real app, this would send the report to the server
      toast({
        title: "Report submitted",
        description: "Thank you for helping keep our community safe",
        duration: 3000,
      })
    },
    [toast],
  )

  // Like post
  const likePost = useCallback((postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          const newLiked = !post.isLiked
          return {
            ...post,
            isLiked: newLiked,
            likes: newLiked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }, [])

  // Join community - FIXED to use useCallback and not update state during render
  const joinCommunity = useCallback(
    (communityId: string) => {
      // Use setTimeout to defer the state update to the next tick
      // This prevents the "Cannot update a component while rendering a different component" error
      setTimeout(() => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => {
            if (post.community.id === communityId) {
              const newJoined = !post.community.joined

              toast({
                title: newJoined ? "Joined community" : "Left community",
                description: newJoined
                  ? `You are now a member of ${post.community.name}`
                  : `You are no longer a member of ${post.community.name}`,
                duration: 2000,
              })

              return {
                ...post,
                community: {
                  ...post.community,
                  joined: newJoined,
                },
              }
            }
            return post
          }),
        )
      }, 0)
    },
    [toast],
  )

  return (
    <FeedContext.Provider
      value={{
        posts,
        followPost,
        savePost,
        hidePost,
        showFewerLike,
        blockCommunity,
        moreFromCommunity,
        reportPost,
        likePost,
        joinCommunity,
        savedPosts,
        refreshFeed,
        isRefreshing,
      }}
    >
      {children}
    </FeedContext.Provider>
  )
}

// Custom hook
export function useFeed() {
  const context = useContext(FeedContext)
  if (context === undefined) {
    throw new Error("useFeed must be used within a FeedProvider")
  }
  return context
}
