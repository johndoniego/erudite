"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageCircle } from "lucide-react"

interface ChatListProps {
  onSelectChat: (chatId: string) => void
}

export default function ChatList({ onSelectChat }: ChatListProps) {
  const chats = [
    {
      id: "alice",
      name: "Alice Smith",
      avatar: "AS",
      lastMessage: "Saturday works great for me. Shall we say 2 PM?",
      time: "10:30 AM",
      unread: 1,
      isOnline: true,
    },
    {
      id: "bob",
      name: "Bob Johnson",
      avatar: "BJ",
      lastMessage: "I can teach you some basic guitar chords tomorrow.",
      time: "Yesterday",
      unread: 0,
      isOnline: true,
    },
    {
      id: "carol",
      name: "Carol Williams",
      avatar: "CW",
      lastMessage: "Here are some photography tips we discussed.",
      time: "Monday",
      unread: 0,
      isOnline: false,
    },
    {
      id: "david",
      name: "David Lee",
      avatar: "DL",
      lastMessage: "Thanks for the Python tutorial!",
      time: "Aug 15",
      unread: 0,
      isOnline: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[hsl(var(--primary)/0.03)] to-[hsl(var(--secondary)/0.05)] dark:from-background dark:via-[hsl(var(--primary)/0.02)] dark:to-[hsl(var(--secondary)/0.03)]">
      <div className="p-4 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent mb-2">
            Messages
          </h1>
          <p className="text-sm text-muted-foreground">Stay connected with your learning partners</p>
        </motion.div>

        {/* Chat List */}
        <div className="space-y-3">
          {chats.map((chat, index) => (
            <motion.div
              key={chat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-[hsl(var(--primary)/0.1)] bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-md"
                onClick={() => onSelectChat(chat.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    {/* Avatar with online indicator */}
                    <div className="relative">
                      <Avatar className="h-12 w-12 ring-2 ring-white dark:ring-gray-700 shadow-md">
                        <AvatarImage
                          src={`/placeholder-40x40.png?height=48&width=48&text=${chat.avatar}`}
                          alt={chat.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--primary)/0.8)] to-[hsl(var(--secondary)/0.8)] text-white font-semibold">
                          {chat.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {/* Online status indicator */}
                      {chat.isOnline && (
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        />
                      )}
                    </div>

                    {/* Chat content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h3>
                        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{chat.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 flex-1 min-w-0">
                          <MessageCircle className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{chat.lastMessage}</p>
                        </div>

                        {chat.unread > 0 && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-2">
                            <Badge
                              variant="default"
                              className="rounded-full h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white text-xs font-bold shadow-md"
                            >
                              {chat.unread}
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty state for when no chats */}
        {chats.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] dark:from-[hsl(var(--primary)/0.3)] dark:to-[hsl(var(--secondary)/0.3)] rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-[hsl(var(--primary))]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No messages yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Start a conversation with someone from your network
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
