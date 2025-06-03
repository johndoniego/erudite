"use client"

import { useState } from "react"
import { Moon, Sun, Check } from "lucide-react"
import { useTheme } from "@/app/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGamification } from "@/app/context/gamification-context"
import { HexColorPicker } from "react-colorful"

export function ThemeToggle() {
  const { theme, accent, customColors, setTheme, setAccent, setCustomColor } = useTheme()
  const { rewards } = useGamification()
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null)

  const customThemeUnlocked = rewards.find((r) => r.id === "theme-unlock")?.unlocked || false

  const accentColors = [
    { name: "Blue", value: "blue", color: "bg-blue-500" },
    { name: "Purple", value: "purple", color: "bg-purple-500" },
    { name: "Green", value: "green", color: "bg-green-500" },
    { name: "Orange", value: "orange", color: "bg-orange-500" },
    { name: "Pink", value: "pink", color: "bg-pink-500" },
  ]

  const handleColorPickerToggle = (key: string) => {
    setActiveColorPicker(activeColorPicker === key ? null : key)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-effect w-64">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>

        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="pt-2">
            <div className="space-y-2">
              <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
                <span className="mr-2">💻</span>
                <span>System</span>
              </DropdownMenuItem>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="pt-2">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Accent Color</p>
                <div className="grid grid-cols-5 gap-2">
                  {accentColors.map((color) => (
                    <button
                      key={color.value}
                      className={`color-swatch ${color.color} ${accent === color.value ? "color-swatch-selected" : ""}`}
                      onClick={() => setAccent(color.value as any)}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {customThemeUnlocked && (
                <>
                  <DropdownMenuSeparator />
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Custom Colors</p>
                      <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setAccent("custom")}>
                        {accent === "custom" && <Check className="h-3 w-3 mr-1" />}
                        Apply
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Primary</p>
                        <div className="flex items-center gap-2">
                          <div
                            className="color-swatch"
                            style={{ backgroundColor: customColors.primary }}
                            onClick={() => handleColorPickerToggle("primary")}
                          />
                          <span className="text-xs">{customColors.primary}</span>
                        </div>
                        {activeColorPicker === "primary" && (
                          <div className="color-picker-wrapper mt-2">
                            <HexColorPicker
                              color={customColors.primary}
                              onChange={(color) => setCustomColor("primary", color)}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Secondary</p>
                        <div className="flex items-center gap-2">
                          <div
                            className="color-swatch"
                            style={{ backgroundColor: customColors.secondary }}
                            onClick={() => handleColorPickerToggle("secondary")}
                          />
                          <span className="text-xs">{customColors.secondary}</span>
                        </div>
                        {activeColorPicker === "secondary" && (
                          <div className="color-picker-wrapper mt-2">
                            <HexColorPicker
                              color={customColors.secondary}
                              onChange={(color) => setCustomColor("secondary", color)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!customThemeUnlocked && (
                <div className="text-center p-2 border border-dashed rounded-md">
                  <p className="text-xs text-muted-foreground">🔒 Unlock custom colors with 500 points</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
