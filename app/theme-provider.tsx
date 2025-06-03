"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"
type AccentColor = "blue" | "purple" | "green" | "orange" | "pink" | "custom"

type ColorScheme = {
  primary: string
  secondary: string
  background: string
  foreground: string
  card: string
  muted: string
}

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  defaultAccent?: AccentColor
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  accent: AccentColor
  customColors: ColorScheme
  setTheme: (theme: Theme) => void
  setAccent: (accent: AccentColor) => void
  setCustomColor: (key: keyof ColorScheme, value: string) => void
}

const initialCustomColors: ColorScheme = {
  primary: "#7c3aed", // Default purple
  secondary: "#4c1d95",
  background: "",
  foreground: "",
  card: "",
  muted: "",
}

const initialState: ThemeProviderState = {
  theme: "system",
  accent: "purple",
  customColors: initialCustomColors,
  setTheme: () => null,
  setAccent: () => null,
  setCustomColor: () => null,
}

// HSL values for each accent color
const accentHslValues = {
  blue: {
    primary: "221.2 83.2% 53.3%",
    secondary: "210 40% 96.1%",
  },
  purple: {
    primary: "267 75% 55%",
    secondary: "267 50% 20%",
  },
  green: {
    primary: "142 76% 36%",
    secondary: "142 64% 24%",
  },
  orange: {
    primary: "24 95% 53%",
    secondary: "24 94% 34%",
  },
  pink: {
    primary: "336 80% 58%",
    secondary: "336 74% 35%",
  },
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// Helper function to convert hex to HSL
function hexToHSL(hex: string) {
  // Remove the # if present
  hex = hex.replace(/^#/, "")

  // Parse the hex values
  let r, g, b
  if (hex.length === 3) {
    r = Number.parseInt(hex[0] + hex[0], 16) / 255
    g = Number.parseInt(hex[1] + hex[1], 16) / 255
    b = Number.parseInt(hex[2] + hex[2], 16) / 255
  } else if (hex.length === 6) {
    r = Number.parseInt(hex.substring(0, 2), 16) / 255
    g = Number.parseInt(hex.substring(2, 4), 16) / 255
    b = Number.parseInt(hex.substring(4, 6), 16) / 255
  } else {
    return null
  }

  // Find min and max values
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0,
    s = 0,
    l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  // Convert to degrees, percentage, percentage
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultAccent = "purple",
  storageKey = "erudite-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)
  const [accent, setAccent] = useState<AccentColor>(defaultAccent)
  const [customColors, setCustomColors] = useState<ColorScheme>(initialCustomColors)

  useEffect(() => {
    const savedTheme = localStorage.getItem(`${storageKey}-mode`) as Theme | null
    const savedAccent = localStorage.getItem(`${storageKey}-accent`) as AccentColor | null
    const savedCustomColors = localStorage.getItem(`${storageKey}-custom-colors`)

    if (savedTheme) {
      setTheme(savedTheme)
    } else if (defaultTheme === "system") {
      setTheme("system")
    }

    if (savedAccent) {
      setAccent(savedAccent)
    }

    if (savedCustomColors) {
      try {
        setCustomColors(JSON.parse(savedCustomColors))
      } catch (e) {
        console.error("Failed to parse custom colors", e)
      }
    }
  }, [defaultTheme, defaultAccent, storageKey])

  // Function to apply custom colors to the DOM
  const applyCustomColors = () => {
    const root = window.document.documentElement

    // Apply custom colors directly using CSS variables
    root.style.setProperty("--primary-color", customColors.primary)
    root.style.setProperty("--secondary-color", customColors.secondary)

    // Convert hex to HSL for Tailwind variables
    const primaryHsl = hexToHSL(customColors.primary)
    const secondaryHsl = hexToHSL(customColors.secondary)

    if (primaryHsl) {
      root.style.setProperty("--primary", `${primaryHsl.h} ${primaryHsl.s}% ${primaryHsl.l}%`)
      root.style.setProperty("--primary-foreground", primaryHsl.l > 70 ? "0 0% 0%" : "0 0% 100%")
    }

    if (secondaryHsl) {
      root.style.setProperty("--secondary", `${secondaryHsl.h} ${secondaryHsl.s}% ${secondaryHsl.l}%`)
      root.style.setProperty("--secondary-foreground", secondaryHsl.l > 70 ? "0 0% 0%" : "0 0% 100%")
    }

    // Apply other custom colors if provided
    if (customColors.background) {
      root.style.setProperty("--background-color", customColors.background)
      const bgHsl = hexToHSL(customColors.background)
      if (bgHsl) {
        root.style.setProperty("--background", `${bgHsl.h} ${bgHsl.s}% ${bgHsl.l}%`)
      }
    }

    if (customColors.foreground) {
      root.style.setProperty("--foreground-color", customColors.foreground)
      const fgHsl = hexToHSL(customColors.foreground)
      if (fgHsl) {
        root.style.setProperty("--foreground", `${fgHsl.h} ${fgHsl.s}% ${fgHsl.l}%`)
      }
    }

    if (customColors.card) {
      root.style.setProperty("--card-color", customColors.card)
      const cardHsl = hexToHSL(customColors.card)
      if (cardHsl) {
        root.style.setProperty("--card", `${cardHsl.h} ${cardHsl.s}% ${cardHsl.l}%`)
      }
    }

    if (customColors.muted) {
      root.style.setProperty("--muted-color", customColors.muted)
      const mutedHsl = hexToHSL(customColors.muted)
      if (mutedHsl) {
        root.style.setProperty("--muted", `${mutedHsl.h} ${mutedHsl.s}% ${mutedHsl.l}%`)
      }
    }

    // Force a repaint to ensure changes are applied
    document.body.style.display = "none"
    document.body.offsetHeight // Trigger a reflow
    document.body.style.display = ""
  }

  useEffect(() => {
    const root = window.document.documentElement

    // Apply theme (light/dark)
    root.classList.remove("light", "dark")
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    // Apply accent color
    root.classList.remove(
      "accent-blue",
      "accent-purple",
      "accent-green",
      "accent-orange",
      "accent-pink",
      "accent-custom",
    )
    root.classList.add(`accent-${accent}`)

    // Apply HSL values for standard accent colors
    if (accent !== "custom" && accent in accentHslValues) {
      const hslValues = accentHslValues[accent as keyof typeof accentHslValues]
      root.style.setProperty("--primary", hslValues.primary)
      root.style.setProperty("--secondary", hslValues.secondary)

      // Set CSS color variables for direct access
      const colorMap = {
        blue: { primary: "#3b82f6", secondary: "#1d4ed8" },
        purple: { primary: "#8b5cf6", secondary: "#6d28d9" },
        green: { primary: "#22c55e", secondary: "#16a34a" },
        orange: { primary: "#f97316", secondary: "#ea580c" },
        pink: { primary: "#ec4899", secondary: "#db2777" },
      }

      const colors = colorMap[accent as keyof typeof colorMap]
      root.style.setProperty("--primary-color", colors.primary)
      root.style.setProperty("--secondary-color", colors.secondary)

      // Clear custom colors
      root.style.removeProperty("--background-color")
      root.style.removeProperty("--foreground-color")
      root.style.removeProperty("--card-color")
      root.style.removeProperty("--muted-color")
    }
    // Apply custom colors
    else if (accent === "custom") {
      applyCustomColors()
    }
  }, [theme, accent, customColors])

  const setCustomColor = (key: keyof ColorScheme, value: string) => {
    const newCustomColors = { ...customColors, [key]: value }
    setCustomColors(newCustomColors)
    localStorage.setItem(`${storageKey}-custom-colors`, JSON.stringify(newCustomColors))

    // If already using custom theme, update in real-time
    if (accent === "custom") {
      const root = window.document.documentElement
      root.style.setProperty(`--${key}-color`, value)

      // Update HSL variables for primary and secondary
      if (key === "primary" || key === "secondary") {
        const hsl = hexToHSL(value)
        if (hsl) {
          root.style.setProperty(`--${key}`, `${hsl.h} ${hsl.s}% ${hsl.l}%`)
          if (key === "primary") {
            root.style.setProperty("--primary-foreground", hsl.l > 70 ? "0 0% 0%" : "0 0% 100%")
          } else {
            root.style.setProperty("--secondary-foreground", hsl.l > 70 ? "0 0% 0%" : "0 0% 100%")
          }
        }
      }
    }
  }

  const value = {
    theme,
    accent,
    customColors,
    setTheme: (theme: Theme) => {
      localStorage.setItem(`${storageKey}-mode`, theme)
      setTheme(theme)
    },
    setAccent: (accent: AccentColor) => {
      localStorage.setItem(`${storageKey}-accent`, accent)
      setAccent(accent)

      // If switching to custom, immediately apply custom colors
      if (accent === "custom") {
        setTimeout(() => applyCustomColors(), 0)
      }
    },
    setCustomColor,
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
