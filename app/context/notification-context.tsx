"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type NotificationSettings = {
  messages: boolean
  connections: boolean
  achievements: boolean
  sessions: boolean
}

type NotificationContextType = {
  notificationSettings: NotificationSettings
  updateNotificationSetting: (key: keyof NotificationSettings, value: boolean) => void
  showNotification: (title: string, message: string, type?: "success" | "info" | "warning" | "error") => void
  notifications: Notification[]
  clearNotification: (id: string) => void
  markAllAsRead: () => void
  unreadCount: number
}

type Notification = {
  id: string
  title: string
  message: string
  type: "success" | "info" | "warning" | "error"
  read: boolean
  timestamp: Date
}

const defaultSettings: NotificationSettings = {
  messages: true,
  connections: true,
  achievements: true,
  sessions: true,
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultSettings)
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("notificationSettings")
    if (savedSettings) {
      try {
        setNotificationSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse notification settings", e)
      }
    }

    const savedNotifications = localStorage.getItem("notifications")
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications)
        // Convert string timestamps back to Date objects
        const withDates = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }))
        setNotifications(withDates)
      } catch (e) {
        console.error("Failed to parse notifications", e)
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
  }, [notificationSettings])

  // Save notifications to localStorage when they change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications))
  }, [notifications])

  const updateNotificationSetting = (key: keyof NotificationSettings, value: boolean) => {
    setNotificationSettings((prev) => {
      const updated = { ...prev, [key]: value }
      return updated
    })

    // Show feedback notification
    const settingLabels = {
      messages: "Message notifications",
      connections: "Connection request notifications",
      achievements: "Achievement notifications",
      sessions: "Session reminder notifications",
    }

    showNotification(
      value ? "Notifications enabled" : "Notifications disabled",
      `${settingLabels[key]} ${value ? "enabled" : "disabled"}.`,
      value ? "success" : "info",
    )
  }

  const showNotification = (
    title: string,
    message: string,
    type: "success" | "info" | "warning" | "error" = "info",
  ) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      read: false,
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // If browser notifications are supported and permission is granted, show a browser notification
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body: message })
    }
  }

  const clearNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const unreadCount = notifications.filter((notification) => !notification.read).length

  return (
    <NotificationContext.Provider
      value={{
        notificationSettings,
        updateNotificationSetting,
        showNotification,
        notifications,
        clearNotification,
        markAllAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}
