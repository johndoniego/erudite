"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Community {
  id: string
  name: string
  icon: string
  members: number
}

interface CommunityManagerProps {
  communities: Community[]
  scrollable?: boolean
}

export default function CommunityManager({ communities, scrollable = false }: CommunityManagerProps) {
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([])
  const [scrollPosition, setScrollPosition] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Load joined communities from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("erudite-joined-communities")
    if (saved) {
      setJoinedCommunities(JSON.parse(saved))
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const saved = localStorage.getItem("erudite-joined-communities")
      if (saved) {
        setJoinedCommunities(JSON.parse(saved))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [])

  // Filter communities to only show joined ones
  const filteredCommunities = communities.filter((community) => joinedCommunities.includes(community.id))

  // Handle scroll events
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget
    setScrollPosition(container.scrollLeft)
    setCanScrollLeft(container.scrollLeft > 0)
    setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10)
  }

  // Scroll left/right
  const scrollLeft = () => {
    const container = document.getElementById("community-scroll-container")
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    const container = document.getElementById("community-scroll-container")
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" })
    }
  }

  // If no joined communities, show a message
  if (filteredCommunities.length === 0) {
    return (
      <div className="rounded-lg border border-border/40 bg-card/30 p-3 text-center">
        <p className="text-sm text-muted-foreground">
          Join communities to see them here. Explore the Discover tab to find communities.
        </p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Left scroll button */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 shadow-sm border border-border/30"
          onClick={scrollLeft}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Scrollable container */}
      <div
        id="community-scroll-container"
        className="flex overflow-x-auto gap-2 py-1 hide-scrollbar"
        onScroll={handleScroll}
      >
        {filteredCommunities.map((community) => (
          <motion.a
            key={community.id}
            href={`/communities/${community.id}`}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/40 bg-card/30 whitespace-nowrap flex-shrink-0 hover:bg-card/80 transition-colors"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-lg">{community.icon}</span>
            <span className="font-medium text-sm">{community.name}</span>
          </motion.a>
        ))}
      </div>

      {/* Right scroll button */}
      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/80 shadow-sm border border-border/30"
          onClick={scrollRight}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
