"use client"

import { motion } from "framer-motion"
import { ChevronLeft, Share2, Bookmark, Calendar, Clock, ArrowRight, ThumbsUp, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"

export interface TipNewsItem {
  id: string
  title: string
  type: "tip" | "news"
  date: string
  image: string
  content?: string
  author?: {
    name: string
    avatar: string
  }
  relatedItems?: {
    id: string
    title: string
    type: "tip" | "news"
    image: string
  }[]
}

interface TipDetailProps {
  item: TipNewsItem | null
  isOpen: boolean
  onClose: () => void
}

export function TipDetail({ item, isOpen, onClose }: TipDetailProps) {
  const { toast } = useToast()

  if (!item) return null

  // Add more detailed information for the tip/news view
  const fullItem: TipNewsItem = {
    ...item,
    content:
      item.content ||
      (item.type === "tip"
        ? `Learning efficiently is crucial in today's fast-paced world. Here are five proven strategies to enhance your learning experience:\n\n1. **Active Recall**: Test yourself regularly instead of passively reviewing material.\n\n2. **Spaced Repetition**: Review information at increasing intervals over time.\n\n3. **Interleaved Practice**: Mix different topics or skills during practice sessions.\n\n4. **Dual Coding**: Combine verbal and visual learning methods.\n\n5. **Teach What You Learn**: Explaining concepts to others solidifies your understanding.`
        : `We're excited to announce upcoming features for our Language Exchange community! In the next update, you'll be able to:\n\n• Schedule voice and video practice sessions directly in the app\n• Access AI-powered pronunciation feedback\n• Join language-specific breakout rooms during group sessions\n• Track your vocabulary growth with our new progress dashboard\n\nThese features will be rolling out gradually over the next month. Stay tuned for more updates!`),
    author: item.author || {
      name: item.type === "tip" ? "Learning Team" : "Product Team",
      avatar: item.type === "tip" ? "LT" : "PT",
    },
    relatedItems: item.relatedItems || [
      {
        id: "related1",
        title:
          item.type === "tip" ? "Memory Techniques for Language Learning" : "Community Events Calendar Now Available",
        type: item.type,
        image: "/placeholder.svg?height=60&width=60&text=Related",
      },
      {
        id: "related2",
        title: item.type === "tip" ? "How to Find the Perfect Study Partner" : "Mobile App Update Coming Next Week",
        type: item.type,
        image: "/placeholder.svg?height=60&width=60&text=Related",
      },
    ],
  }

  const handleSave = () => {
    toast({
      title: "Saved",
      description: `${item.type === "tip" ? "Tip" : "News"} saved to your library.`,
      duration: 2000,
    })
  }

  const handleShare = () => {
    toast({
      title: "Sharing",
      description: `Sharing ${item.type === "tip" ? "tip" : "news"} with your connections.`,
      duration: 2000,
    })
  }

  return (
    isOpen && (
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
            <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0 rounded-full" onClick={onClose}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-sm font-medium">{item.type === "tip" ? "Learning Tip" : "News"}</h2>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={handleSave}>
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Image */}
          <div className="w-full h-48 bg-muted relative">
            <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <Badge
                className={
                  item.type === "tip"
                    ? "mobile-badge bg-blue-500/90 text-white border-blue-500/20"
                    : "mobile-badge bg-green-500/90 text-white border-green-500/20"
                }
              >
                {item.type === "tip" ? "Tip" : "News"}
              </Badge>
              <h1 className="text-lg font-bold text-white mt-1">{item.title}</h1>
            </div>
          </div>

          {/* Meta info */}
          <div className="p-3 border-b flex items-center justify-between">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {fullItem.author?.avatar}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs">{fullItem.author?.name}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>{item.date}</span>
              <span className="mx-1">•</span>
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>3 min read</span>
            </div>
          </div>

          {/* Main content */}
          <div className="p-4">
            <div className="prose prose-sm max-w-none">
              {fullItem.content?.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-sm mb-3">
                  {paragraph.startsWith("•") ? (
                    <span className="block pl-4 relative before:content-['•'] before:absolute before:left-0">
                      {paragraph.substring(2)}
                    </span>
                  ) : paragraph.includes("**") ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>

            {/* Engagement */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center space-x-4">
                <button className="flex items-center text-xs">
                  <ThumbsUp className="h-4 w-4 mr-1.5" />
                  <span>Helpful</span>
                </button>
                <button className="flex items-center text-xs">
                  <MessageSquare className="h-4 w-4 mr-1.5" />
                  <span>Comment</span>
                </button>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1.5" /> Share
              </Button>
            </div>

            {/* Related content */}
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-3">Related {item.type === "tip" ? "Tips" : "News"}</h3>
              <div className="space-y-3">
                {fullItem.relatedItems?.map((related) => (
                  <div key={related.id} className="flex items-center border rounded-lg overflow-hidden">
                    <div className="w-14 h-14 bg-muted">
                      <img
                        src={related.image || "/placeholder.svg"}
                        alt={related.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-2">
                      <Badge
                        className={
                          related.type === "tip"
                            ? "mobile-badge bg-blue-500/10 text-blue-500 border-blue-500/20"
                            : "mobile-badge bg-green-500/10 text-green-500 border-green-500/20"
                        }
                      >
                        {related.type === "tip" ? "Tip" : "News"}
                      </Badge>
                      <h4 className="text-xs font-medium mt-1">{related.title}</h4>
                    </div>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 mr-1">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  )
}
