"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  ArrowLeft,
  Send,
  MoreVertical,
  Mail,
  BellOff,
  Bell,
  User,
  Ban,
  Archive,
  Trash2,
  Flag,
  Check,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface ChatProps {
  chatId: string
  onBack: () => void
}

export default function Chat({ chatId, onBack }: ChatProps) {
  // Mock data for different chats
  const chatData = {
    alice: {
      name: "Alice Smith",
      avatar: "AS",
      messages: [
        { sender: "Alice", content: "Hi! I'd love to learn Spanish. When are you available?" },
        { sender: "You", content: "Hello! I'm free on weekends. How about Saturday afternoon?" },
        { sender: "Alice", content: "Saturday works great for me. Shall we say 2 PM?" },
      ],
    },
    bob: {
      name: "Bob Johnson",
      avatar: "BJ",
      messages: [
        { sender: "You", content: "Hi Bob, I'm interested in learning guitar. Do you have time this week?" },
        { sender: "Bob", content: "Hey there! I'd be happy to teach you. How about Wednesday evening?" },
        { sender: "You", content: "Wednesday works for me. What should I prepare?" },
        { sender: "Bob", content: "I can teach you some basic guitar chords tomorrow." },
      ],
    },
    carol: {
      name: "Carol Williams",
      avatar: "CW",
      messages: [
        { sender: "Carol", content: "Hello! I saw you're interested in photography. I'd love to share some tips." },
        { sender: "You", content: "That would be amazing! I just got my first DSLR camera." },
        { sender: "Carol", content: "Great! Let's start with the basics of composition and lighting." },
        { sender: "You", content: "Perfect, that's exactly what I need help with." },
        { sender: "Carol", content: "Here are some photography tips we discussed." },
      ],
    },
    david: {
      name: "David Lee",
      avatar: "DL",
      messages: [
        { sender: "David", content: "Hi there! I noticed you're teaching Python programming." },
        { sender: "You", content: "Yes, I've been coding in Python for about 5 years now." },
        { sender: "David", content: "Could you help me understand some basics? I'm struggling with functions." },
        { sender: "You", content: "Of course! Let me send you a simple tutorial I created." },
        { sender: "David", content: "Thanks for the Python tutorial!" },
      ],
    },
  }

  const chat = chatData[chatId as keyof typeof chatData] || {
    name: "User",
    avatar: "U",
    messages: [],
  }

  const [messages, setMessages] = useState(chat.messages)
  const [newMessage, setNewMessage] = useState("")
  const [isUnread, setIsUnread] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isBlocked, setIsBlocked] = useState(false)
  const [showBlockDialog, setShowBlockDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showArchiveDialog, setShowArchiveDialog] = useState(false)
  const { toast } = useToast()

  // Effect to handle blocked state
  useEffect(() => {
    if (isBlocked) {
      toast({
        title: `${chat.name} is blocked`,
        description: "You will not receive messages from this user",
        duration: 3000,
      })
    }
  }, [isBlocked, chat.name, toast])

  // Handle member selection from URL parameters
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const memberParam = urlParams.get("member")
      const memberName = urlParams.get("name")

      if (memberParam && memberName) {
        // Map member IDs to existing chat IDs
        const memberToChatMap: Record<string, string> = {
          alexjohnson: "alice",
          samanthalee: "bob",
          michaelchen: "carol",
          jessicawilliams: "david",
          davidkim: "alice", // fallback to existing chats
        }

        const targetChatId = memberToChatMap[memberParam] || "alice"

        // If we have a valid chat mapping, we're already showing the right chat
        // In a real app, you'd create a new chat or find existing conversation
        toast({
          title: "Chat Ready",
          description: `You can now message ${decodeURIComponent(memberName)}`,
          duration: 3000,
        })
      }
    }
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && !isBlocked) {
      setMessages([...messages, { sender: "You", content: newMessage }])
      setNewMessage("")
    } else if (isBlocked) {
      toast({
        title: "Cannot send message",
        description: `You have blocked ${chat.name}. Unblock to continue the conversation.`,
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  const handleMarkAsUnread = () => {
    setIsUnread(true)
    toast({
      title: "Chat marked as unread",
      duration: 2000,
    })
    onBack()
  }

  const handleMuteNotifications = () => {
    setIsMuted(!isMuted)
    toast({
      title: isMuted ? "Notifications unmuted" : "Notifications muted",
      description: isMuted
        ? `You will now receive notifications from ${chat.name}`
        : `You will not receive notifications from ${chat.name}`,
      duration: 2000,
    })
  }

  const handleViewProfile = () => {
    // In a real app, this would navigate to the user's profile
    toast({
      title: `Viewing ${chat.name}'s profile`,
      duration: 2000,
    })
  }

  const handleToggleBlock = () => {
    if (isBlocked) {
      setIsBlocked(false)
      toast({
        title: `${chat.name} unblocked`,
        description: "You can now send and receive messages from this user",
        duration: 3000,
      })
    } else {
      setShowBlockDialog(true)
    }
  }

  const confirmBlock = () => {
    setIsBlocked(true)
    setShowBlockDialog(false)
  }

  const handleArchiveChat = () => {
    setShowArchiveDialog(true)
  }

  const confirmArchive = () => {
    setShowArchiveDialog(false)
    toast({
      title: "Chat archived",
      description: "This conversation has been moved to your archive",
      duration: 2000,
    })
    setTimeout(onBack, 1000)
  }

  const handleDeleteChat = () => {
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    setShowDeleteDialog(false)
    toast({
      title: "Chat deleted",
      description: "This conversation has been permanently deleted",
      variant: "destructive",
      duration: 2000,
    })
    setTimeout(onBack, 1000)
  }

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for helping keep our community safe",
      duration: 3000,
    })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="bg-background/95 backdrop-blur-md p-4 flex items-center justify-between border-b sticky top-0 z-10">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={`/placeholder-icon.png?height=32&width=32&text=${chat.avatar}`} alt={chat.name} />
            <AvatarFallback>{chat.avatar}</AvatarFallback>
          </Avatar>
          <div className="flex items-center">
            <h2 className="font-semibold">{chat.name}</h2>
            {isBlocked && (
              <Badge variant="destructive" className="ml-2 text-xs">
                Blocked
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMuteNotifications}
            className="mr-1"
            title={isMuted ? "Unmute notifications" : "Mute notifications"}
          >
            {isMuted ? <BellOff className="h-5 w-5" /> : <Bell className="h-5 w-5" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="flex items-center py-2 cursor-pointer" onClick={handleMarkAsUnread}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Mark as unread</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-2 cursor-pointer" onClick={handleMuteNotifications}>
                {isMuted ? <Bell className="mr-2 h-4 w-4" /> : <BellOff className="mr-2 h-4 w-4" />}
                <span>{isMuted ? "Unmute notifications" : "Mute notifications"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-2 cursor-pointer" onClick={handleViewProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>View profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-2 cursor-pointer" onClick={handleToggleBlock}>
                {isBlocked ? <Check className="mr-2 h-4 w-4" /> : <Ban className="mr-2 h-4 w-4" />}
                <span>{isBlocked ? "Unblock" : "Block"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-2 cursor-pointer" onClick={handleArchiveChat}>
                <Archive className="mr-2 h-4 w-4" />
                <span>Archive chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-2 cursor-pointer" onClick={handleDeleteChat}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-2 cursor-pointer" onClick={handleReport}>
                <Flag className="mr-2 h-4 w-4" />
                <span>Report</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isBlocked && (
        <div className="bg-destructive/10 p-3 text-center text-sm">
          <p>
            You have blocked this user.{" "}
            <Button variant="link" className="p-0 h-auto" onClick={handleToggleBlock}>
              Unblock
            </Button>{" "}
            to send messages.
          </p>
        </div>
      )}

      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => {
            const isCurrentUser = message.sender === "You"
            const prevMessage = index > 0 ? messages[index - 1] : null
            const nextMessage = index < messages.length - 1 ? messages[index + 1] : null
            const isFirstInGroup = !prevMessage || prevMessage.sender !== message.sender
            const isLastInGroup = !nextMessage || nextMessage.sender !== message.sender

            // Generate a random time for demo purposes
            const messageTime = new Date()
            messageTime.setMinutes(messageTime.getMinutes() - (messages.length - index) * 5)
            const formattedTime = messageTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

            return (
              <div
                key={index}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} ${isFirstInGroup ? "mt-4" : "mt-1"}`}
              >
                {!isCurrentUser && isFirstInGroup && (
                  <div className="flex-shrink-0 mr-2 mt-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`/placeholder-icon.png?height=32&width=32&text=${chat.avatar}`}
                        alt={chat.name}
                      />
                      <AvatarFallback>{chat.avatar}</AvatarFallback>
                    </Avatar>
                  </div>
                )}

                <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} max-w-[75%]`}>
                  {!isCurrentUser && isFirstInGroup && (
                    <span className="text-xs text-muted-foreground ml-1 mb-1">{chat.name}</span>
                  )}

                  <div
                    className={`
                px-4 py-2 
                ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                ${isFirstInGroup && isCurrentUser ? "rounded-t-lg" : ""}
                ${isFirstInGroup && !isCurrentUser ? "rounded-t-lg" : ""}
                ${isLastInGroup && isCurrentUser ? "rounded-bl-lg rounded-br-lg" : ""}
                ${isLastInGroup && !isCurrentUser ? "rounded-br-lg rounded-bl-lg" : ""}
                ${isCurrentUser && isFirstInGroup ? "rounded-tl-lg" : ""}
                ${!isCurrentUser && isFirstInGroup ? "rounded-tr-lg" : ""}
                ${isCurrentUser && !isFirstInGroup && !isLastInGroup ? "rounded-l-lg" : ""}
                ${!isCurrentUser && !isFirstInGroup && !isLastInGroup ? "rounded-r-lg" : ""}
                shadow-sm
                animate-in fade-in slide-in-from-bottom-1 duration-200
              `}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>

                  <div className={`flex items-center mt-1 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                    <span className="text-[10px] text-muted-foreground mx-1">{formattedTime}</span>
                    {isCurrentUser && isLastInGroup && (
                      <span className="text-xs text-primary">
                        <Check className="h-3 w-3 inline" />
                      </span>
                    )}
                  </div>
                </div>

                {isCurrentUser && isFirstInGroup && (
                  <div className="flex-shrink-0 ml-2 mt-auto">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/professional-headshot.png" alt="You" />
                      <AvatarFallback>You</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>

      <div className="p-4 bg-background/95 backdrop-blur-md border-t sticky bottom-0 z-10">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <div className="relative flex-grow">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={isBlocked ? "Unblock to send messages" : "Type your message..."}
              className="pr-10 py-6 rounded-full bg-muted/50"
              disabled={isBlocked}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90 h-8 w-8"
              disabled={isBlocked || !newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Block Confirmation Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block {chat.name}?</DialogTitle>
            <DialogDescription>
              They won't be able to message you, and you won't receive their messages. You can unblock them anytime.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmBlock}>
              Block
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this conversation?</DialogTitle>
            <DialogDescription>
              This will permanently delete all messages in this conversation. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Archive Confirmation Dialog */}
      <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archive this conversation?</DialogTitle>
            <DialogDescription>
              This conversation will be moved to your archive. You can access it later from your archived chats.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowArchiveDialog(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={confirmArchive}>
              Archive
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
