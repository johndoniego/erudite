"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Calendar, MessageSquare, Award, Settings, LogOut, Flame, Globe, Sparkles } from "lucide-react"
import { useSidebar } from "@/app/context/sidebar-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { isExpanded, collapseSidebar, toggleSidebar } = useSidebar()
  const [mounted, setMounted] = useState(false)

  // Handle outside clicks to close the sidebar on mobile
  useEffect(() => {
    setMounted(true)
    console.log("🏠 Sidebar component mounted")
    console.log("🏠 Initial sidebar state:", isExpanded)

    const handleOutsideClick = (e: MouseEvent) => {
      // Only apply this on mobile
      if (window.innerWidth < 768 && isExpanded) {
        const target = e.target as HTMLElement
        const sidebar = document.getElementById("sidebar")
        const avatar = document.querySelector(".mobile-header .avatar")

        // Check if click is outside the sidebar and not on the avatar
        if (
          sidebar &&
          !sidebar.contains(target) &&
          !target.closest(".mobile-header") &&
          avatar &&
          !avatar.contains(target)
        ) {
          console.log("🏠 Outside click detected - collapsing sidebar")
          collapseSidebar()
        }
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isExpanded, collapseSidebar])

  // Navigation items
  const navItems: NavItem[] = [
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Communities",
      href: "/communities",
      active: pathname === "/communities" || pathname.startsWith("/communities/"),
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: "People",
      href: "/people",
      active: pathname === "/people",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      label: "Skills",
      href: "/skills",
      active: pathname === "/skills" || pathname.startsWith("/skill/"),
    },
    {
      icon: <Calendar className="h-5 w-5" />,
      label: "Schedule",
      href: "/schedule",
      active: pathname === "/schedule",
    },
    {
      icon: <Flame className="h-5 w-5" />,
      label: "Challenges",
      href: "/challenges",
      active: pathname === "/challenges",
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      label: "Messages",
      href: "/chat",
      active: pathname === "/chat",
    },
    {
      icon: <Award className="h-5 w-5" />,
      label: "Rewards",
      href: "/rewards",
      active: pathname === "/rewards",
    },
    {
      icon: (
        <div className="relative">
          <Avatar className="h-5 w-5">
            <AvatarImage src="/professional-headshot.png" alt="Profile" />
            <AvatarFallback className="text-[10px] bg-primary/10 text-primary">JD</AvatarFallback>
          </Avatar>
        </div>
      ),
      label: "Profile",
      href: "/profile",
      active: pathname === "/profile",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
      active: pathname === "/settings",
    },
  ]

  // Handle navigation
  const handleNavigation = (href: string) => {
    console.log("🏠 Navigation clicked:", href)

    // If clicking the same page we're already on, just toggle the sidebar
    if (pathname === href) {
      console.log("🏠 Same page clicked - toggling sidebar")
      collapseSidebar()
      return
    }

    // Otherwise navigate to the new page
    console.log("🏠 Navigating to:", href)
    router.push(href)

    // Collapse sidebar on mobile
    if (window.innerWidth < 768) {
      console.log("🏠 Mobile navigation - collapsing sidebar")
      collapseSidebar()
    }
  }

  useEffect(() => {
    console.log("🏠 Sidebar state changed - isExpanded:", isExpanded)
    console.log("🏠 Sidebar should be visible:", isExpanded ? "YES" : "NO")
  }, [isExpanded])

  if (!mounted) return null

  return (
    <>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => {
              console.log("🏠 Overlay clicked - collapsing sidebar")
              collapseSidebar()
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isExpanded && (
          <motion.aside
            id="sidebar"
            initial={{ x: -240 }}
            animate={{ x: 0 }}
            exit={{ x: -240 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-60 bg-background border-r border-border z-50 flex flex-col"
            onAnimationStart={() => console.log("🏠 Sidebar animation started")}
            onAnimationComplete={() => console.log("🏠 Sidebar animation completed")}
          >
            {/* Header section at top of sidebar */}
            <div className="flex items-center px-4 py-4">
              <Avatar
                className="h-8 w-8 mr-3 cursor-pointer hover:ring-2 hover:ring-primary/20 transition-all"
                onClick={() => {
                  console.log("🏠 Sidebar header avatar clicked - toggling sidebar")
                  toggleSidebar()
                }}
              >
                <AvatarImage src="/professional-headshot.png" alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary text-sm">JD</AvatarFallback>
              </Avatar>
              <h1 className="text-primary text-xl font-semibold">
                {pathname === "/communities" || pathname.startsWith("/communities/")
                  ? "Communities"
                  : pathname === "/people"
                    ? "People"
                    : pathname === "/skills" || pathname.startsWith("/skill/")
                      ? "Skills"
                      : pathname === "/schedule"
                        ? "Schedule"
                        : pathname === "/challenges"
                          ? "Challenges"
                          : pathname === "/profile"
                            ? "Profile"
                            : pathname === "/settings"
                              ? "Settings"
                              : pathname === "/rewards"
                                ? "Rewards"
                                : pathname === "/chat"
                                  ? "Messages"
                                  : "Erudite"}
              </h1>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      item.active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-3 border-t border-border">
              <button
                className="w-full flex items-center px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                onClick={() => {
                  console.log("🏠 Sign out clicked")
                  router.push("/auth")
                }}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
