"use client"

import type React from "react"
import { useState, useCallback, useEffect } from "react"
import { Search, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { useNotifications } from "@/app/context/notification-context"
import NotificationCenter from "./NotificationCenter"
import { useSidebar } from "@/app/context/sidebar-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const pathname = usePathname()
  const { unreadCount } = useNotifications()
  const { isExpanded, toggleSidebar } = useSidebar()
  const [pageTitle, setPageTitle] = useState("")

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    setIsNotificationsOpen(false)
  }

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen)
    setIsSearchOpen(false)
  }

  // Use useCallback to ensure consistent function reference
  const handleProfileClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      console.log("Profile clicked, toggling sidebar")
      toggleSidebar()
    },
    [toggleSidebar],
  )

  const getPageTitle = () => {
    // Normalize the pathname by removing trailing slashes and converting to lowercase
    const normalizedPath = pathname?.toLowerCase().replace(/\/$/, "") || ""

    // Check for path segments to handle both exact and nested routes
    if (normalizedPath === "") return "Erudite"
    if (normalizedPath === "/communities" || normalizedPath.includes("/communities/")) return "Communities"
    if (normalizedPath === "/people") return "People"
    if (normalizedPath === "/skills" || normalizedPath.includes("/skill/")) return "Skills"
    if (normalizedPath === "/schedule") return "Schedule"
    if (normalizedPath === "/challenges") return "Challenges"
    if (normalizedPath === "/profile") return "Profile"
    if (normalizedPath === "/settings") return "Settings"
    if (normalizedPath === "/rewards") return "Rewards"
    if (normalizedPath === "/chat") return "Messages"

    // Add a console log to debug unexpected paths
    console.log("Unmatched pathname:", normalizedPath)

    // Default fallback to ensure something is always displayed
    return "Erudite"
  }

  useEffect(() => {
    setPageTitle(getPageTitle())
  }, [pathname])

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 bg-background border-b border-border px-4 flex items-center justify-between w-full"
      style={{ zIndex: 9999, position: "fixed", top: 0, left: 0, right: 0 }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <Avatar
            className="h-8 w-8 mr-3 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
            onClick={handleProfileClick}
          >
            <AvatarImage src="/professional-headshot.png" alt="Profile" />
            <AvatarFallback className="bg-primary/10 text-primary text-sm">JD</AvatarFallback>
          </Avatar>
          <h1 className="text-primary text-xl font-semibold">{pageTitle}</h1>
        </div>

        <div className={`flex items-center ${isExpanded ? "md:hidden" : ""}`}>
          <Button variant="ghost" size="icon" onClick={toggleSearch} className="relative">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleNotifications} className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {isSearchOpen && (
        <div
          className="absolute top-full left-0 right-0 bg-background border-b border-border p-2 animate-slide-up"
          style={{ zIndex: 9998 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-8 rounded-md border border-input bg-background"
              autoFocus
            />
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      )}

      {isNotificationsOpen && (
        <div className="absolute top-full right-0" style={{ zIndex: 9998 }}>
          <NotificationCenter onClose={() => setIsNotificationsOpen(false)} />
        </div>
      )}
    </header>
  )
}
