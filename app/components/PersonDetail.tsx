"use client"

import { motion } from "framer-motion"
import {
  ChevronLeft,
  Star,
  Calendar,
  Award,
  Mail,
  UserPlus,
  BookOpen,
  Briefcase,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"

export interface FeaturedPerson {
  id: string
  name: string
  avatar: string
  skills: string[]
  rating: number
  featured: string
  bio?: string
  sessions?: number
  students?: number
  availability?: string[]
  achievements?: string[]
  interests?: string[]
  posts?: {
    id: string
    content: string
    timestamp: string
    likes: number
    comments: number
    tags: string[]
  }[]
  testimonials?: {
    id: string
    name: string
    avatar: string
    content: string
    rating: number
  }[]
}

// Update the PersonDetailProps interface to include the new handler functions
interface PersonDetailProps {
  person: FeaturedPerson | null
  isOpen: boolean
  onClose: () => void
  onConnect?: (person: FeaturedPerson) => void
  onMessage?: (person: FeaturedPerson) => void
  onSchedule?: (person: FeaturedPerson) => void
}

// Update the function signature to include the new props
export function PersonDetail({ person, isOpen, onClose, onConnect, onMessage, onSchedule }: PersonDetailProps) {
  const { toast } = useToast()

  // If person is null or isOpen is false, don't render anything
  if (!person || !isOpen) return null

  // Add more detailed information for the person view
  const fullPerson: FeaturedPerson = {
    ...person,
    bio:
      person.bio ||
      `${person.name} is a highly rated expert in ${person.skills.join(", ")}. With years of experience, they've helped hundreds of students achieve their learning goals through personalized instruction and mentorship.`,
    sessions: person.sessions || 124,
    students: person.students || 48,
    availability: person.availability || ["Mon-Wed: 9AM-12PM", "Thu-Fri: 2PM-6PM", "Sat: 10AM-2PM"],
    achievements: person.achievements || [
      "Top-rated instructor (3 months)",
      "Quick responder badge",
      "Community contributor",
    ],
    interests: person.interests || ["Learning", "Teaching", "Networking"],
    posts: person.posts || [
      {
        id: "default1",
        content: "Excited to join this platform and connect with other learners and teachers!",
        timestamp: "2 weeks ago",
        likes: 24,
        comments: 5,
        tags: ["introduction", "learning", "teaching"],
      },
    ],
    testimonials: person.testimonials || [
      {
        id: "t1",
        name: "Robert Chen",
        avatar: "RC",
        content: `${person.name} is an amazing instructor! Their teaching style made complex concepts easy to understand.`,
        rating: 5,
      },
      {
        id: "t2",
        name: "Alicia Johnson",
        avatar: "AJ",
        content: "Very patient and knowledgeable. Would definitely recommend for beginners.",
        rating: 4.5,
      },
      {
        id: "t3",
        name: "Marcus Lee",
        avatar: "ML",
        content: "Great at explaining difficult concepts. Helped me prepare for my certification exam.",
        rating: 5,
      },
    ],
  }

  const handleConnect = () => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${person.name} has been sent.`,
      duration: 3000,
    })

    if (onConnect) {
      onConnect(fullPerson)
      onClose()
    }
  }

  const handleMessage = () => {
    toast({
      title: "Message Started",
      description: `Starting a conversation with ${person.name}.`,
      duration: 3000,
    })

    if (onMessage) {
      onMessage(fullPerson)
      onClose()
    }
  }

  const handleSchedule = () => {
    toast({
      title: "Scheduling Session",
      description: `Opening scheduler to book a session with ${person.name}.`,
      duration: 3000,
    })

    if (onSchedule) {
      onSchedule(fullPerson)
      onClose()
    }
  }

  const handleLikePost = (postId: string) => {
    toast({
      title: "Post Liked",
      description: "You liked this post",
      duration: 2000,
    })
  }

  const handleSharePost = (postId: string) => {
    toast({
      title: "Share Post",
      description: "Opening share options...",
      duration: 2000,
    })
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0 rounded-full" onClick={onClose}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-sm font-medium">Profile</h2>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[80vh]">
          {/* Profile Header */}
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Avatar className="h-16 w-16 mr-3">
                <AvatarFallback className="bg-primary/10 text-primary text-xl">{fullPerson.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-bold">{fullPerson.name}</h1>
                <div className="flex items-center mt-1">
                  <div className="flex items-center bg-yellow-500/10 px-1.5 py-0.5 rounded-full">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="text-xs text-yellow-600">{fullPerson.rating}</span>
                  </div>
                  <Badge className="ml-2 mobile-badge bg-primary/10 text-primary border-primary/20">
                    {fullPerson.featured}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {fullPerson.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="mobile-badge bg-secondary/10">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-between mt-4 text-center">
              <div className="flex-1">
                <div className="text-lg font-bold text-primary">{fullPerson.sessions}</div>
                <div className="text-xs text-muted-foreground">Sessions</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-primary">{fullPerson.students}</div>
                <div className="text-xs text-muted-foreground">Students</div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-primary">{fullPerson.rating}</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 text-xs h-9" onClick={handleConnect}>
                <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Connect
              </Button>
              <Button variant="outline" className="flex-1 text-xs h-9" onClick={handleMessage}>
                <Mail className="h-3.5 w-3.5 mr-1.5" /> Message
              </Button>
              <Button variant="secondary" className="flex-1 text-xs h-9" onClick={handleSchedule}>
                <Calendar className="h-3.5 w-3.5 mr-1.5" /> Schedule
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-4 p-0.5 bg-muted/50 backdrop-blur-sm h-9 border-b">
              <TabsTrigger
                value="about"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-8"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="interests"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-8"
              >
                Interests
              </TabsTrigger>
              <TabsTrigger
                value="posts"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-8"
              >
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-8"
              >
                Reviews
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Bio</h3>
                <p className="text-xs text-muted-foreground">{fullPerson.bio}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-1.5">
                  {fullPerson.skills.map((skill) => (
                    <Badge key={skill} className="mobile-badge">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Achievements</h3>
                <div className="space-y-2">
                  {fullPerson.achievements?.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-xs">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interests" className="p-4 space-y-4">
              <h3 className="text-sm font-medium mb-3">Interests & Hobbies</h3>
              <div className="grid grid-cols-2 gap-3">
                {fullPerson.interests?.map((interest, index) => (
                  <Card key={index} className="border border-border/50">
                    <CardContent className="p-3 flex items-center">
                      {index % 2 === 0 ? (
                        <BookOpen className="h-4 w-4 text-primary mr-2" />
                      ) : (
                        <Briefcase className="h-4 w-4 text-primary mr-2" />
                      )}
                      <span className="text-xs">{interest}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-3">Weekly Availability</h3>
                <div className="space-y-2">
                  {fullPerson.availability?.map((slot, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span className="text-xs">{slot}</span>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Book
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="p-4 space-y-4">
              <h3 className="text-sm font-medium mb-3">Recent Posts</h3>

              {fullPerson.posts && fullPerson.posts.length > 0 ? (
                <div className="space-y-4">
                  {fullPerson.posts.map((post) => (
                    <Card key={post.id} className="border-none shadow-sm overflow-hidden">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarFallback className="text-xs bg-primary/10">{fullPerson.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{fullPerson.name}</p>
                              <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                            </div>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem onClick={() => handleSharePost(post.id)}>
                                <Share2 className="h-4 w-4 mr-2" />
                                <span>Share post</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BookOpen className="h-4 w-4 mr-2" />
                                <span>Save post</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        <p className="text-sm mb-3">{post.content}</p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs px-2 py-0 h-5">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-3">
                            <button className="flex items-center" onClick={() => handleLikePost(post.id)}>
                              <Heart className="h-3.5 w-3.5 mr-1" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center">
                              <MessageSquare className="h-3.5 w-3.5 mr-1" />
                              <span>{post.comments}</span>
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p className="text-sm">No posts yet</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Reviews</h3>
                <div className="flex items-center bg-yellow-500/10 px-2 py-1 rounded-full">
                  <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="text-xs font-medium text-yellow-600">{fullPerson.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                {fullPerson.testimonials?.map((testimonial) => (
                  <div key={testimonial.id} className="border rounded-lg p-3">
                    <div className="flex items-center mb-2">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                          {testimonial.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium">{testimonial.name}</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs ml-1">{testimonial.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{testimonial.content}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </div>
  )
}
