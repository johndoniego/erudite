"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, Share2, Bookmark, MoreVertical, Send, ThumbsUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useFeed } from "@/app/context/feed-context"
import { useSidebar } from "@/app/context/sidebar-context"
import type { Post } from "@/app/context/feed-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PostDetailProps {
  post: Post | null
  isOpen: boolean
  onClose: () => void
}

type ReactionType = "like" | "love" | "care" | "haha" | "wow" | "sad" | "angry" | null

interface Reply {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  time: string
  likes: number
  reaction: ReactionType
}

interface CommentWithReaction {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  time: string
  likes: number
  reaction: ReactionType
  replies: Reply[]
  showReplies: boolean
  showReplyInput: boolean
}

export function PostDetail({ post, isOpen, onClose }: PostDetailProps) {
  const [comment, setComment] = useState("")
  const [replyText, setReplyText] = useState<Record<string, string>>({})
  const [postReaction, setPostReaction] = useState<ReactionType>(post?.isLiked ? "like" : null)
  const [showPostReactions, setShowPostReactions] = useState(false)
  const { toggleSidebar } = useSidebar()
  const [comments, setComments] = useState<CommentWithReaction[]>([
    {
      id: "comment-1",
      author: {
        name: "Jessica Taylor",
        avatar: "JT",
      },
      content: "This is really impressive! Would love to see how you structured the project.",
      time: "45m ago",
      likes: 8,
      reaction: null,
      replies: [
        {
          id: "reply-1-1",
          author: {
            name: "Alex Johnson",
            avatar: "AJ",
          },
          content: "@Jessica Taylor I used a modular architecture with separate components for each feature.",
          time: "30m ago",
          likes: 3,
          reaction: null,
        },
        {
          id: "reply-1-2",
          author: {
            name: "Ryan Park",
            avatar: "RP",
          },
          content: "@Jessica Taylor The project structure is available on my GitHub if you want to check it out!",
          time: "15m ago",
          likes: 2,
          reaction: null,
        },
      ],
      showReplies: false,
      showReplyInput: false,
    },
    {
      id: "comment-2",
      author: {
        name: "Michael Brown",
        avatar: "MB",
      },
      content: "Great work! What technologies did you use for the backend?",
      time: "1h ago",
      likes: 5,
      reaction: null,
      replies: [
        {
          id: "reply-2-1",
          author: {
            name: "Alex Johnson",
            avatar: "AJ",
          },
          content: "@Michael Brown I used Node.js with Express and MongoDB for the database.",
          time: "45m ago",
          likes: 1,
          reaction: null,
        },
      ],
      showReplies: false,
      showReplyInput: false,
    },
    {
      id: "comment-3",
      author: {
        name: "Sophia Chen",
        avatar: "SC",
      },
      content: "The design looks clean and modern. Did you use any specific design system?",
      time: "2h ago",
      likes: 12,
      reaction: null,
      replies: [],
      showReplies: false,
      showReplyInput: false,
    },
  ])

  const [activeCommentId, setActiveCommentId] = useState<string | null>(null)
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null)
  const { likePost, savePost } = useFeed()
  const postReactionRef = useRef<HTMLDivElement>(null)
  const commentReactionRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const replyReactionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close post reactions if clicking outside
      if (showPostReactions && postReactionRef.current && !postReactionRef.current.contains(event.target as Node)) {
        setShowPostReactions(false)
      }

      // Close comment reactions if clicking outside
      if (
        activeCommentId &&
        commentReactionRefs.current[activeCommentId] &&
        !commentReactionRefs.current[activeCommentId]?.contains(event.target as Node)
      ) {
        setActiveCommentId(null)
      }

      // Close reply reactions if clicking outside
      if (
        activeReplyId &&
        replyReactionRefs.current[activeReplyId] &&
        !replyReactionRefs.current[activeReplyId]?.contains(event.target as Node)
      ) {
        setActiveReplyId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showPostReactions, activeCommentId, activeReplyId])

  if (!post) return null

  const handleSubmitComment = () => {
    if (comment.trim()) {
      // In a real app, this would send the comment to the server
      console.log(`Submitting comment on post ${post.id}: ${comment}`)
      setComment("")
    }
  }

  const handleSubmitReply = (commentId: string) => {
    if (replyText[commentId]?.trim()) {
      // Find the comment to reply to
      const updatedComments = comments.map((c) => {
        if (c.id === commentId) {
          // Create a new reply
          const newReply: Reply = {
            id: `reply-${commentId}-${Date.now()}`,
            author: {
              name: "You",
              avatar: "ME",
            },
            content: `@${c.author.name} ${replyText[commentId]}`,
            time: "Just now",
            likes: 0,
            reaction: null,
          }

          // Add the reply and show all replies
          return {
            ...c,
            replies: [...c.replies, newReply],
            showReplies: true,
            showReplyInput: false,
          }
        }
        return c
      })

      setComments(updatedComments)

      // Clear the reply text for this comment
      setReplyText({
        ...replyText,
        [commentId]: "",
      })
    }
  }

  const toggleReplyInput = (commentId: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return { ...c, showReplyInput: !c.showReplyInput }
        }
        // Close other reply inputs
        return { ...c, showReplyInput: false }
      }),
    )

    // Initialize reply text if needed
    if (!replyText[commentId]) {
      setReplyText({
        ...replyText,
        [commentId]: "",
      })
    }
  }

  const toggleReplies = (commentId: string) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return { ...c, showReplies: !c.showReplies }
        }
        return c
      }),
    )
  }

  const handlePostReaction = (reaction: ReactionType) => {
    setPostReaction(reaction)
    setShowPostReactions(false)
    // In a real app, this would send the reaction to the server
    console.log(`Reacting to post ${post.id} with: ${reaction}`)
  }

  const handleCommentReaction = (commentId: string, reaction: ReactionType) => {
    setComments(comments.map((c) => (c.id === commentId ? { ...c, reaction } : c)))
    setActiveCommentId(null)
    // In a real app, this would send the reaction to the server
    console.log(`Reacting to comment ${commentId} with: ${reaction}`)
  }

  const handleReplyReaction = (commentId: string, replyId: string, reaction: ReactionType) => {
    setComments(
      comments.map((c) => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: c.replies.map((r) => (r.id === replyId ? { ...r, reaction } : r)),
          }
        }
        return c
      }),
    )
    setActiveReplyId(null)
    // In a real app, this would send the reaction to the server
    console.log(`Reacting to reply ${replyId} with: ${reaction}`)
  }

  const getReactionEmoji = (reaction: ReactionType) => {
    switch (reaction) {
      case "like":
        return "👍"
      case "love":
        return "❤️"
      case "care":
        return "🥰"
      case "haha":
        return "😂"
      case "wow":
        return "😮"
      case "sad":
        return "😢"
      case "angry":
        return "😠"
      default:
        return null
    }
  }

  const getReactionColor = (reaction: ReactionType) => {
    switch (reaction) {
      case "like":
        return "text-blue-500"
      case "love":
        return "text-red-500"
      case "care":
        return "text-orange-500"
      case "haha":
        return "text-yellow-500"
      case "wow":
        return "text-yellow-500"
      case "sad":
        return "text-yellow-500"
      case "angry":
        return "text-orange-600"
      default:
        return ""
    }
  }

  const getReactionText = (reaction: ReactionType) => {
    return reaction ? reaction.charAt(0).toUpperCase() + reaction.slice(1) : "Like"
  }

  const handleAvatarClick = () => {
    console.log("🖱️ Avatar clicked in PostDetail")
    console.log("🔍 Sidebar context available:", !!toggleSidebar)
    console.log("🔍 toggleSidebar function type:", typeof toggleSidebar)

    try {
      console.log("🚀 Calling toggleSidebar...")
      toggleSidebar()
      console.log("✅ toggleSidebar called successfully")
    } catch (error) {
      console.error("❌ Error calling toggleSidebar:", error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col bg-background"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center">
              <Avatar
                className="h-8 w-8 mr-3 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                onClick={handleAvatarClick}
              >
                <AvatarImage src="/professional-headshot.png" alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">JD</AvatarFallback>
              </Avatar>
              <h2 className="text-sm font-medium">Erudite</h2>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => savePost(post.id)}>
                <Bookmark className={`h-5 w-5 ${post.isSaved ? "fill-primary text-primary" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem className="text-xs cursor-pointer">Copy link to post</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-xs cursor-pointer text-destructive">Report post</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Post */}
            <div className="p-3 border-b">
              {/* Author info */}
              <div className="flex items-center mb-3">
                <div className="flex items-center flex-1">
                  <Avatar className="h-9 w-9 mr-2">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{post.author.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium">{post.author.name}</h3>
                      <span className="mx-1 text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{post.time}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="flex items-center">
                        {post.community.icon} {post.community.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Post content */}
              <p className="text-sm mb-3">{post.content}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="mobile-badge bg-secondary/10">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Engagement stats */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                <div className="flex items-center space-x-4">
                  <div className="relative" ref={postReactionRef}>
                    {/* Reaction button */}
                    <button
                      className={`flex items-center ${postReaction ? getReactionColor(postReaction) : ""}`}
                      onClick={() => (postReaction ? handlePostReaction(null) : setShowPostReactions(true))}
                      onMouseEnter={() => setShowPostReactions(true)}
                    >
                      {postReaction ? (
                        <span className="mr-1.5 text-base">{getReactionEmoji(postReaction)}</span>
                      ) : (
                        <ThumbsUp className="h-4 w-4 mr-1.5" />
                      )}
                      <span>{getReactionText(postReaction)}</span>
                    </button>

                    {/* Reaction selector */}
                    {showPostReactions && (
                      <div
                        className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-1 flex items-center z-10"
                        onMouseLeave={() => setShowPostReactions(false)}
                      >
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white mx-0.5"
                          onClick={() => handlePostReaction("like")}
                        >
                          👍
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white mx-0.5"
                          onClick={() => handlePostReaction("love")}
                        >
                          ❤️
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-500 text-white mx-0.5"
                          onClick={() => handlePostReaction("care")}
                        >
                          🥰
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white mx-0.5"
                          onClick={() => handlePostReaction("haha")}
                        >
                          😂
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white mx-0.5"
                          onClick={() => handlePostReaction("wow")}
                        >
                          😮
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-500 text-white mx-0.5"
                          onClick={() => handlePostReaction("sad")}
                        >
                          😢
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-600 text-white mx-0.5"
                          onClick={() => handlePostReaction("angry")}
                        >
                          😠
                        </motion.button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="p-3">
              <h3 className="text-sm font-medium mb-3">Comments</h3>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-2">
                    {/* Main comment */}
                    <div className="flex">
                      <Avatar className="h-7 w-7 mr-2 mt-0.5">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                          {comment.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted/30 rounded-lg p-2">
                          <div className="flex items-center mb-1">
                            <span className="text-xs font-medium">{comment.author.name}</span>
                            <span className="mx-1 text-muted-foreground text-[10px]">•</span>
                            <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                          </div>
                          <p className="text-xs">{comment.content}</p>
                        </div>
                        <div className="flex items-center mt-1 text-[10px] text-muted-foreground">
                          <div className="relative mr-3" ref={(el) => (commentReactionRefs.current[comment.id] = el)}>
                            {/* Comment reaction button */}
                            <button
                              className={`${comment.reaction ? getReactionColor(comment.reaction) : ""}`}
                              onClick={() =>
                                comment.reaction
                                  ? handleCommentReaction(comment.id, null)
                                  : setActiveCommentId(activeCommentId === comment.id ? null : comment.id)
                              }
                            >
                              {comment.reaction ? (
                                <span className="flex items-center">
                                  <span className="mr-1">{getReactionEmoji(comment.reaction)}</span>
                                  {getReactionText(comment.reaction)}
                                </span>
                              ) : (
                                "Like"
                              )}
                            </button>

                            {/* Comment reaction selector */}
                            {activeCommentId === comment.id && (
                              <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 rounded-full shadow-lg p-1 flex items-center z-10">
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-500 text-white mx-0.5 text-xs"
                                  onClick={() => handleCommentReaction(comment.id, "like")}
                                >
                                  👍
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white mx-0.5 text-xs"
                                  onClick={() => handleCommentReaction(comment.id, "love")}
                                >
                                  ❤️
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-orange-500 text-white mx-0.5 text-xs"
                                  onClick={() => handleCommentReaction(comment.id, "care")}
                                >
                                  🥰
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-500 text-white mx-0.5 text-xs"
                                  onClick={() => handleCommentReaction(comment.id, "haha")}
                                >
                                  😂
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-500 text-white mx-0.5 text-xs"
                                  onClick={() => handleCommentReaction(comment.id, "wow")}
                                >
                                  😮
                                </motion.button>
                              </div>
                            )}
                          </div>
                          <button onClick={() => toggleReplyInput(comment.id)}>Reply</button>
                          <div className="ml-auto flex items-center">
                            {comment.reaction ? (
                              <span className="mr-1 text-xs">{getReactionEmoji(comment.reaction)}</span>
                            ) : (
                              <ThumbsUp className="h-3 w-3 mr-1" />
                            )}
                            <span>{comment.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reply input - YouTube style */}
                    {comment.showReplyInput && (
                      <div className="flex ml-9">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px]">ME</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 relative">
                          <Textarea
                            placeholder={`Reply to ${comment.author.name}...`}
                            className="min-h-0 h-8 py-1.5 text-xs resize-none pr-10 rounded-full"
                            value={replyText[comment.id] || ""}
                            onChange={(e) => setReplyText({ ...replyText, [comment.id]: e.target.value })}
                          />
                          <div className="absolute right-1 top-1 flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 px-2 text-[10px]"
                              onClick={() => toggleReplyInput(comment.id)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              variant="default"
                              className="h-6 px-2 text-[10px]"
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!replyText[comment.id]?.trim()}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Show/hide replies button */}
                    {comment.replies.length > 0 && (
                      <button
                        className="ml-9 flex items-center text-[10px] text-blue-500 font-medium"
                        onClick={() => toggleReplies(comment.id)}
                      >
                        <ChevronDown
                          className={`h-3 w-3 mr-1 transition-transform ${comment.showReplies ? "rotate-180" : ""}`}
                        />
                        {comment.showReplies ? "Hide" : "View"} {comment.replies.length}{" "}
                        {comment.replies.length === 1 ? "reply" : "replies"}
                      </button>
                    )}

                    {/* Replies */}
                    {comment.showReplies && comment.replies.length > 0 && (
                      <div className="ml-9 space-y-2">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex">
                            <Avatar className="h-6 w-6 mr-2 mt-0.5">
                              <AvatarFallback className="bg-muted text-muted-foreground text-[10px]">
                                {reply.author.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-muted/20 rounded-lg p-2">
                                <div className="flex items-center mb-1">
                                  <span className="text-[10px] font-medium">{reply.author.name}</span>
                                  <span className="mx-1 text-muted-foreground text-[8px]">•</span>
                                  <span className="text-[8px] text-muted-foreground">{reply.time}</span>
                                </div>
                                <p className="text-[10px]">
                                  <span className="font-medium text-blue-500">{reply.content.split(" ")[0]}</span>{" "}
                                  {reply.content.split(" ").slice(1).join(" ")}
                                </p>
                              </div>
                              <div className="flex items-center mt-1 text-[8px] text-muted-foreground">
                                <div className="relative mr-3" ref={(el) => (replyReactionRefs.current[reply.id] = el)}>
                                  {/* Reply reaction button */}
                                  <button
                                    className={`${reply.reaction ? getReactionColor(reply.reaction) : ""}`}
                                    onClick={() =>
                                      reply.reaction
                                        ? handleReplyReaction(comment.id, reply.id, null)
                                        : setActiveReplyId(activeReplyId === reply.id ? null : reply.id)
                                    }
                                  >
                                    {reply.reaction ? (
                                      <span className="flex items-center">
                                        <span className="mr-1">{getReactionEmoji(reply.reaction)}</span>
                                        {getReactionText(reply.reaction)}
                                      </span>
                                    ) : (
                                      "Like"
                                    )}
                                  </button>

                                  {/* Reply reaction selector */}
                                  {activeReplyId === reply.id && (
                                    <div className="absolute bottom-full left-0 mb-1 bg-white dark:bg-gray-800 rounded-full shadow-lg p-1 flex items-center z-10">
                                      <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white mx-0.5 text-[8px]"
                                        onClick={() => handleReplyReaction(comment.id, reply.id, "like")}
                                      >
                                        👍
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        className="w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white mx-0.5 text-[8px]"
                                        onClick={() => handleReplyReaction(comment.id, reply.id, "love")}
                                      >
                                        ❤️
                                      </motion.button>
                                      <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        className="w-5 h-5 flex items-center justify-center rounded-full bg-orange-500 text-white mx-0.5 text-[8px]"
                                        onClick={() => handleReplyReaction(comment.id, reply.id, "care")}
                                      >
                                        🥰
                                      </motion.button>
                                    </div>
                                  )}
                                </div>
                                <button onClick={() => toggleReplyInput(comment.id)}>Reply</button>
                                <div className="ml-auto flex items-center">
                                  {reply.reaction ? (
                                    <span className="mr-1 text-[8px]">{getReactionEmoji(reply.reaction)}</span>
                                  ) : (
                                    <ThumbsUp className="h-2 w-2 mr-1" />
                                  )}
                                  <span>{reply.likes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comment input */}
          <div className="p-3 border-t flex items-center">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">ME</AvatarFallback>
            </Avatar>
            <div className="flex-1 relative">
              <Textarea
                placeholder="Add your thoughts..."
                className="min-h-0 h-9 py-2 resize-none pr-10"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 top-1 h-7 w-7 p-0 rounded-full"
                onClick={handleSubmitComment}
                disabled={!comment.trim()}
              >
                <Send className={`h-4 w-4 ${comment.trim() ? "text-primary" : "text-muted-foreground"}`} />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
