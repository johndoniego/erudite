"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useNotifications } from "@/app/context/notification-context"
import { formatDistanceToNow } from "date-fns"

export default function NotificationCenter({ onClose }: { onClose?: () => void }) {
  const { notifications, clearNotification, markAllAsRead, unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen) {
      // Mark all as read when opening the dropdown
      markAllAsRead()
    } else if (!isOpen && onClose) {
      onClose()
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅"
      case "warning":
        return "⚠️"
      case "error":
        return "❌"
      case "info":
      default:
        return "ℹ️"
    }
  }

  return (
    <div className="bg-background border rounded-md shadow-md w-80">
      <div className="flex justify-between items-center p-2 border-b">
        <span className="font-medium">Notifications</span>
        {notifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={() => {
              notifications.forEach((n) => clearNotification(n.id))
              if (onClose) onClose()
            }}
          >
            Clear all
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="py-4 text-center text-sm text-muted-foreground">No notifications</div>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.slice(0, 5).map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col items-start p-3 cursor-default border-b last:border-b-0 hover:bg-accent/50"
            >
              <div className="flex w-full justify-between">
                <div className="font-medium flex items-center gap-1">
                  <span>{getNotificationIcon(notification.type)}</span>
                  <span>{notification.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => clearNotification(notification.id)}
                >
                  <span className="sr-only">Dismiss</span>
                  <span className="text-xs">×</span>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      )}

      {notifications.length > 5 && (
        <div className="border-t p-2 text-center text-sm text-muted-foreground">
          +{notifications.length - 5} more notifications
        </div>
      )}
    </div>
  )
}
