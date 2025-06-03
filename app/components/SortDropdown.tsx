"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronDown, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SortOption {
  value: string
  label: string
}

interface SortDropdownProps {
  options: SortOption[]
  value: string
  onValueChange: (value: string) => void
}

export default function SortDropdown({ options, value, onValueChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (optionValue: string) => {
    onValueChange(optionValue)
    setIsOpen(false)
  }

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <Button
          variant="outline"
          size="sm"
          className="h-10 gap-2 bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-between sm:justify-center"
          onClick={toggleDropdown}
        >
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4" />
            <span className="text-sm">{options.find((option) => option.value === value)?.label || "Sort"}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-full sm:w-48 rounded-md shadow-lg bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-[9999]"
          >
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                  className={cn(
                    "block w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between",
                    value === option.value && "font-semibold",
                  )}
                  role="menuitem"
                >
                  {option.label}
                  {value === option.value && <Check className="h-4 w-4" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
