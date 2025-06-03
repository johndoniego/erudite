"use client"

import { useState, useEffect } from "react"
import ChatList from "@/app/components/ChatList"
import Chat from "@/app/components/Chat"
import Header from "@/app/components/Header"
import { toast } from "sonner"

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search)
      const memberParam = urlParams.get("member")
      const memberName = urlParams.get("name")

      if (memberParam && memberName) {
        // Map member IDs to existing chat IDs for demo purposes
        const memberToChatMap: Record<string, string> = {
          alexjohnson: "alice",
          samanthalee: "bob",
          michaelchen: "carol",
          jessicawilliams: "david",
          davidkim: "alice",
        }

        const targetChatId = memberToChatMap[memberParam]
        if (targetChatId) {
          setSelectedChat(targetChatId)

          toast({
            title: "Chat Started",
            description: `Now chatting with ${decodeURIComponent(memberName)}`,
            duration: 3000,
          })
        }
      }
    }
  }, [])

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId)
  }

  const handleBackToList = () => {
    setSelectedChat(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-[hsl(var(--primary)/0.05)]">
      <Header />
      <div className="max-w-md mx-auto mt-[-0.5rem]">
        {selectedChat ? (
          <Chat chatId={selectedChat} onBack={handleBackToList} />
        ) : (
          <ChatList onSelectChat={handleSelectChat} />
        )}
      </div>
    </div>
  )
}
