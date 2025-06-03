"use client"

import type React from "react"

import { ThemeProvider } from "@/app/theme-provider"
import { NotificationProvider } from "@/app/context/notification-context"
import { FeedProvider } from "@/app/context/feed-context"
import { GamificationProvider } from "@/app/context/gamification-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <NotificationProvider>
        <GamificationProvider>
          <FeedProvider>{children}</FeedProvider>
        </GamificationProvider>
      </NotificationProvider>
    </ThemeProvider>
  )
}
