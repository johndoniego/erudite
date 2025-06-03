"use client"

import {
  Heart,
  MessageCircle,
  Share2,
  Users,
  TrendingUp,
  Calendar,
  Bookmark,
  Plus,
  MoreVertical,
  Send,
  ChevronDown,
  Trash2,
} from "lucide-react"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getSkill } from "@/app/utils/get-skill"
import { getPosts } from "@/app/utils/get-posts"
import { saveLike, unsaveLike, getLikedPosts } from "@/app/utils/like-posts"
import { savePost, unsavePost, getSavedPosts } from "@/app/utils/saved-posts"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface SkillPageProps {
  params: {
    id: string
  }
}

interface Comment {
  id: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
}

interface Post {
  id: string
  skillId: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
  comments: Comment[]
  tags: string[]
}

export default function SkillPage({ params }: SkillPageProps) {
  const { id } = params
  const [skill, setSkill] = useState<any>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set())
  const [isFollowing, setIsFollowing] = useState(false)
  const [newPostContent, setNewPostContent] = useState("")
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false)
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({})
  const [showComments, setShowComments] = useState<Record<string, boolean>>({})
  const [shareDialogOpen, setShareDialogOpen] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const skillData = await getSkill(id)
        setSkill(skillData)
      } catch (error) {
        console.error("Error fetching skill:", error)
      }
    }

    fetchSkill()
  }, [id])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPosts(id)
        // Add sample comments to posts
        const postsWithComments = postsData.map((post) => ({
          ...post,
          comments:
            post.id === "js-post-1"
              ? [
                  {
                    id: "comment-1",
                    author: "Maria Garcia",
                    authorAvatar: "MG",
                    content:
                      "Great question! I'd recommend starting with useState and useEffect hooks. Redux can be overwhelming for beginners.",
                    timestamp: "1 hour ago",
                    likes: 3,
                  },
                  {
                    id: "comment-2",
                    author: "John Smith",
                    authorAvatar: "JS",
                    content:
                      "Context API is also a good middle ground between useState and Redux for medium-sized apps.",
                    timestamp: "45 minutes ago",
                    likes: 2,
                  },
                ]
              : post.id === "js-post-2"
                ? [
                    {
                      id: "comment-3",
                      author: "Lisa Chen",
                      authorAvatar: "LC",
                      content: "This is super helpful! I always wondered about the differences. Thanks for sharing!",
                      timestamp: "2 hours ago",
                      likes: 5,
                    },
                  ]
                : [],
        }))
        setPosts(postsWithComments)
      } catch (error) {
        console.error("Error fetching posts:", error)
        // Set default posts with comments if fetch fails
        setPosts([
          {
            id: "js-post-1",
            skillId: id,
            author: "Alex Chen",
            authorAvatar: "AC",
            content:
              "Just finished building my first React app! The component lifecycle was tricky at first but starting to make sense. Any tips for state management?",
            timestamp: "2 hours ago",
            likes: 15,
            comments: [
              {
                id: "comment-1",
                author: "Maria Garcia",
                authorAvatar: "MG",
                content:
                  "Great question! I'd recommend starting with useState and useEffect hooks. Redux can be overwhelming for beginners.",
                timestamp: "1 hour ago",
                likes: 3,
              },
              {
                id: "comment-2",
                author: "John Smith",
                authorAvatar: "JS",
                content: "Context API is also a good middle ground between useState and Redux for medium-sized apps.",
                timestamp: "45 minutes ago",
                likes: 2,
              },
            ],
            tags: ["react", "beginner", "state-management"],
          },
          {
            id: "js-post-2",
            skillId: id,
            author: "Sarah Kim",
            authorAvatar: "SK",
            content:
              "ES6 arrow functions vs regular functions - when should you use each? Here's a quick comparison I made for beginners.",
            timestamp: "5 hours ago",
            likes: 23,
            comments: [
              {
                id: "comment-3",
                author: "Lisa Chen",
                authorAvatar: "LC",
                content: "This is super helpful! I always wondered about the differences. Thanks for sharing!",
                timestamp: "2 hours ago",
                likes: 5,
              },
            ],
            tags: ["es6", "functions", "tutorial"],
          },
        ])
      }
    }

    fetchPosts()
  }, [id])

  useEffect(() => {
    const liked = getLikedPosts()
    setLikedPosts(new Set(liked))
  }, [])

  useEffect(() => {
    const savedPosts = getSavedPosts()
    setSavedPostIds(new Set(savedPosts.map((p) => p.id)))
  }, [])

  const handleLikePost = (postId: string) => {
    if (likedPosts.has(postId)) {
      unsaveLike(postId)
      setLikedPosts((prev) => {
        const newSet = new Set(prev)
        newSet.delete(postId)
        return newSet
      })
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? { ...post, likes: post.likes - 1 } : post)))
      toast({
        description: "Post unliked",
      })
    } else {
      saveLike(postId)
      setLikedPosts((prev) => new Set(prev).add(postId))
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
      toast({
        description: "Post liked!",
      })
    }
  }

  const handleSavePost = (post: Post) => {
    if (!skill) return

    const savedPost = {
      id: post.id,
      title: post.content.substring(0, 50) + "...",
      content: post.content,
      author: post.author,
      authorAvatar: post.authorAvatar,
      timestamp: post.timestamp,
      likes: post.likes,
      comments: post.comments.length,
      type: "skill" as const,
      sourceId: id,
      sourceName: skill.name,
    }

    if (savedPostIds.has(post.id)) {
      unsavePost(post.id)
      setSavedPostIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(post.id)
        return newSet
      })
      toast({
        description: "Post removed from saved",
      })
    } else {
      savePost(savedPost)
      setSavedPostIds((prev) => new Set(prev).add(post.id))
      toast({
        description: "Post saved!",
      })
    }
  }

  const handleFollowSkill = () => {
    setIsFollowing(!isFollowing)
    if (skill) {
      setSkill({
        ...skill,
        followers: isFollowing ? skill.followers - 1 : skill.followers + 1,
      })
    }
    toast({
      description: isFollowing ? "Unfollowed skill" : "Following skill!",
    })
  }

  const handleSharePost = async (post: Post) => {
    const shareData = {
      title: `${post.author}'s post about ${skill?.name}`,
      text: post.content,
      url: `${window.location.origin}/skill/${id}#post-${post.id}`,
    }

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        toast({
          description: "Post shared successfully!",
        })
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error)
          fallbackShare(shareData.url)
        }
      }
    } else {
      fallbackShare(shareData.url)
    }
  }

  const fallbackShare = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          description: "Link copied to clipboard!",
        })
      })
      .catch(() => {
        setShareDialogOpen(url)
      })
  }

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    const newPost: Post = {
      id: `post-${Date.now()}`,
      skillId: id,
      author: "You",
      authorAvatar: "ME",
      content: newPostContent,
      timestamp: "Just now",
      likes: 0,
      comments: [],
      tags: [],
    }

    setPosts([newPost, ...posts])
    setNewPostContent("")
    setIsPostDialogOpen(false)
    toast({
      description: "Post created successfully!",
    })
  }

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
    setDeleteDialogOpen(null)
    toast({
      description: "Post deleted successfully",
    })
  }

  const handleAddComment = (postId: string) => {
    const commentContent = commentInputs[postId]?.trim()
    if (!commentContent) return

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      author: "You",
      authorAvatar: "ME",
      content: commentContent,
      timestamp: "Just now",
      likes: 0,
    }

    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post)),
    )

    setCommentInputs((prev) => ({ ...prev, [postId]: "" }))
    toast({
      description: "Comment added!",
    })
  }

  const toggleComments = (postId: string) => {
    setShowComments((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  if (!skill) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Skill Header */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{skill.name}</h1>
              <p className="text-muted-foreground mt-1">{skill.description}</p>
            </div>
          </div>
          <Button onClick={handleFollowSkill} variant={isFollowing ? "outline" : "default"} className="min-w-[100px]">
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>

        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>{skill.followers.toLocaleString()} Followers</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <Badge variant={skill.trend === "Hot" ? "destructive" : "secondary"}>{skill.trend} Trend</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>Created {skill.createdAt}</span>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Posts</h2>
          <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new post in {skill.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts, questions, or insights..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="min-h-[120px]"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsPostDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                    Post
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <AnimatePresence>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card rounded-lg p-6 border"
              id={`post-${post.id}`}
            >
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">{post.authorAvatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{post.author}</h3>
                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleSharePost(post)}>Share post</DropdownMenuItem>
                    {(post.author === "You" || post.authorAvatar === "ME") && (
                      <DropdownMenuItem
                        onClick={() => setDeleteDialogOpen(post.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete post
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>Report post</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Post Content */}
              <p className="text-sm mb-4 leading-relaxed">{post.content}</p>

              {/* Post Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLikePost(post.id)}
                    className={likedPosts.has(post.id) ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${likedPosts.has(post.id) ? "fill-current" : ""}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => toggleComments(post.id)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {post.comments.length}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleSharePost(post)}>
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSavePost(post)}
                  className={savedPostIds.has(post.id) ? "text-blue-500" : ""}
                >
                  <Bookmark className={`h-4 w-4 ${savedPostIds.has(post.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {showComments[post.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t space-y-4"
                  >
                    {/* Existing Comments */}
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                            {comment.authorAvatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted/30 rounded-lg p-3">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm font-medium">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center mt-1 space-x-2">
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              <Heart className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 text-xs">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add Comment */}
                    <div className="flex space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">ME</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Write a comment..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))}
                          className="min-h-0 h-10 py-2 pr-12 resize-none"
                        />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute right-1 top-1 h-8 w-8 p-0"
                          onClick={() => handleAddComment(post.id)}
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          <Send
                            className={`h-4 w-4 ${commentInputs[post.id]?.trim() ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Show/Hide Comments Button */}
              {post.comments.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleComments(post.id)}
                  className="mt-2 text-xs text-muted-foreground"
                >
                  <ChevronDown
                    className={`h-3 w-3 mr-1 transition-transform ${showComments[post.id] ? "rotate-180" : ""}`}
                  />
                  {showComments[post.id] ? "Hide" : "View"} comments
                </Button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts yet. Be the first to share something!</p>
          </div>
        )}
      </div>

      {/* Share Dialog Fallback */}
      <Dialog open={!!shareDialogOpen} onOpenChange={() => setShareDialogOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Copy this link to share the post:</p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shareDialogOpen || ""}
                readOnly
                className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm"
              />
              <Button
                onClick={() => {
                  if (shareDialogOpen) {
                    navigator.clipboard.writeText(shareDialogOpen)
                    toast({ description: "Link copied!" })
                    setShareDialogOpen(null)
                  }
                }}
              >
                Copy
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteDialogOpen} onOpenChange={() => setDeleteDialogOpen(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={() => deleteDialogOpen && handleDeletePost(deleteDialogOpen)}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
