"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Users, Calendar, User, UserPlus } from "lucide-react"

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("home")
    } else if (pathname.includes("/communities")) {
      setActiveTab("communities")
    } else if (pathname.includes("/schedule")) {
      setActiveTab("schedule")
    } else if (pathname.includes("/profile")) {
      setActiveTab("profile")
    } else if (pathname.includes("/people")) {
      setActiveTab("people")
    }
  }, [pathname])

  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <nav className="mobile-nav">
      <button onClick={() => handleNavigation("/")} className={`nav-item ${activeTab === "home" ? "active" : ""}`}>
        <Home className="nav-item-icon" />
        <span className="nav-item-label">Home</span>
      </button>

      <button
        onClick={() => handleNavigation("/communities")}
        className={`nav-item ${activeTab === "communities" ? "active" : ""}`}
      >
        <Users className="nav-item-icon" />
        <span className="nav-item-label">Communities</span>
      </button>

      <button
        onClick={() => handleNavigation("/people")}
        className={`nav-item ${activeTab === "people" ? "active" : ""}`}
      >
        <UserPlus className="nav-item-icon" />
        <span className="nav-item-label">People</span>
      </button>

      <button
        onClick={() => handleNavigation("/schedule")}
        className={`nav-item ${activeTab === "schedule" ? "active" : ""}`}
      >
        <Calendar className="nav-item-icon" />
        <span className="nav-item-label">Schedule</span>
      </button>

      <button
        onClick={() => handleNavigation("/profile")}
        className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
      >
        <User className="nav-item-icon" />
        <span className="nav-item-label">Profile</span>
      </button>
    </nav>
  )
}
