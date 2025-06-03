"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CustomCalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  className?: string
}

export function CustomCalendar({ selected, onSelect, className }: CustomCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selected || new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Get previous month's last few days
  const prevMonth = new Date(year, month, 0)
  const daysInPrevMonth = prevMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  // Generate calendar days
  const calendarDays = []

  // Previous month's days
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month - 1, day),
    })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(year, month, day),
    })
  }

  // Next month's days to fill the grid
  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(year, month + 1, day),
    })
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setMonth(newDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const handleDateClick = (date: Date) => {
    onSelect?.(date)
  }

  const isSelected = (date: Date) => {
    if (!selected) return false
    return (
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear()
    )
  }

  const isToday = (date: Date) => {
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  return (
    <div className={cn("p-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} className="h-8 w-8 p-0">
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <h2 className="text-lg font-semibold">
          {monthNames[month]} {year}
        </h2>

        <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} className="h-8 w-8 p-0">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="h-10 flex items-center justify-center text-sm font-medium text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((calendarDay, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "h-10 w-full p-0 font-normal hover:bg-accent hover:text-accent-foreground",
              !calendarDay.isCurrentMonth && "text-muted-foreground opacity-50",
              isSelected(calendarDay.date) &&
                "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              isToday(calendarDay.date) &&
                !isSelected(calendarDay.date) &&
                "bg-accent text-accent-foreground font-semibold",
            )}
            onClick={() => handleDateClick(calendarDay.date)}
          >
            {calendarDay.day}
          </Button>
        ))}
      </div>
    </div>
  )
}
