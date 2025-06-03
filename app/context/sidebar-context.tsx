"use client"

import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from "react"

interface SidebarContextType {
  isExpanded: boolean
  toggleSidebar: () => void
  expandSidebar: () => void
  collapseSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Use useCallback to ensure function identity is stable
  const toggleSidebar = useCallback(() => {
    console.log("🔄 Toggle sidebar called")
    console.log("📊 Current sidebar state:", isExpanded)
    setIsExpanded((prevState) => {
      const newState = !prevState
      console.log("🔄 Sidebar state changing from", prevState, "to", newState)
      console.log("✅ Sidebar toggle complete - new state:", newState)
      return newState
    })
  }, [])

  const expandSidebar = useCallback(() => {
    console.log("📖 Expand sidebar called")
    console.log("📊 Current state before expand:", isExpanded)
    setIsExpanded(true)
    console.log("✅ Sidebar expanded")
  }, [])

  const collapseSidebar = useCallback(() => {
    console.log("📕 Collapse sidebar called")
    console.log("📊 Current state before collapse:", isExpanded)
    setIsExpanded(false)
    console.log("✅ Sidebar collapsed")
  }, [])

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log("Sidebar expanded state:", isExpanded)
  }, [isExpanded])

  useEffect(() => {
    console.log("🎯 Sidebar state changed to:", isExpanded)
    console.log("🎯 Sidebar context functions available:", {
      toggleSidebar: typeof toggleSidebar,
      expandSidebar: typeof expandSidebar,
      collapseSidebar: typeof collapseSidebar,
    })
  }, [isExpanded, toggleSidebar, expandSidebar, collapseSidebar])

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        toggleSidebar,
        expandSidebar,
        collapseSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
