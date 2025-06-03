"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/app/theme-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Palette, Moon, Sun, Monitor, Check, Bell, Save, X, RefreshCw, Sparkles, Zap } from "lucide-react"
import { HexColorPicker } from "react-colorful"
import Link from "next/link"
import Header from "@/app/components/Header"
import { useGamification } from "@/app/context/gamification-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useNotifications } from "@/app/context/notification-context"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SettingsPage() {
  const { theme, accent, customColors, setTheme, setAccent, setCustomColor } = useTheme()
  const { rewards } = useGamification()
  const { notificationSettings, updateNotificationSetting } = useNotifications()
  const { toast } = useToast()
  const [activeColorPicker, setActiveColorPicker] = useState<string | null>(null)
  const [tempColors, setTempColors] = useState({
    primary: customColors.primary,
    secondary: customColors.secondary,
    background: customColors.background || "#ffffff",
    foreground: customColors.foreground || "#000000",
    card: customColors.card || "",
    muted: customColors.muted || "",
  })

  const customThemeUnlocked = rewards.find((r) => r.id === "theme-unlock")?.unlocked || true // Set to true for testing

  useEffect(() => {
    // Update temp colors when customColors change
    setTempColors({
      primary: customColors.primary,
      secondary: customColors.secondary,
      background: customColors.background || "#ffffff",
      foreground: customColors.foreground || "#000000",
      card: customColors.card || "",
      muted: customColors.muted || "",
    })
  }, [customColors])

  const accentColors = [
    { name: "Blue", value: "blue", color: "bg-blue-500", gradient: "from-blue-400 to-blue-600" },
    { name: "Purple", value: "purple", color: "bg-purple-500", gradient: "from-purple-400 to-purple-600" },
    { name: "Green", value: "green", color: "bg-green-500", gradient: "from-green-400 to-green-600" },
    { name: "Orange", value: "orange", color: "bg-orange-500", gradient: "from-orange-400 to-orange-600" },
    { name: "Pink", value: "pink", color: "bg-pink-500", gradient: "from-pink-400 to-pink-600" },
  ]

  const handleColorPickerToggle = (key: string) => {
    if (activeColorPicker === key) {
      setActiveColorPicker(null)
    } else {
      setActiveColorPicker(key)
      // Reset temp color to current color when opening picker
      setTempColors((prev) => ({
        ...prev,
        [key]:
          customColors[key as keyof typeof customColors] ||
          (key === "background" ? "#ffffff" : key === "foreground" ? "#000000" : ""),
      }))
    }
  }

  const handleSaveColor = (key: string) => {
    setCustomColor(key as keyof typeof customColors, tempColors[key as keyof typeof tempColors])
    setActiveColorPicker(null)

    toast({
      title: "✨ Color saved",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} color updated successfully`,
    })

    if (accent === "custom") {
      // Force refresh if already using custom theme
      const event = new Event("customthemeapplied")
      window.dispatchEvent(event)
    }
  }

  const handleApplyColor = (key: string) => {
    setCustomColor(key as keyof typeof customColors, tempColors[key as keyof typeof tempColors])

    toast({
      title: "🎨 Color applied",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} color applied instantly`,
    })

    if (accent === "custom") {
      // Force refresh if already using custom theme
      const event = new Event("customthemeapplied")
      window.dispatchEvent(event)
    }
  }

  const handleCancelColor = (key: string) => {
    // Reset to original color
    setTempColors((prev) => ({
      ...prev,
      [key]:
        customColors[key as keyof typeof customColors] ||
        (key === "background" ? "#ffffff" : key === "foreground" ? "#000000" : ""),
    }))
    setActiveColorPicker(null)
  }

  const applyCustomTheme = () => {
    setAccent("custom")
    toast({
      title: "🌈 Custom colors applied",
      description: "Your custom color theme is now active across the entire app",
    })

    // Force a refresh to ensure all components update
    setTimeout(() => {
      const event = new Event("customthemeapplied")
      window.dispatchEvent(event)
    }, 100)
  }

  return (
    <div className="page-container">
      <Header />
      <main className="page-content">
        {/* Enhanced Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.1)] via-[hsl(var(--secondary)/0.1)] to-[hsl(var(--primary)/0.1)] rounded-2xl blur-xl" />
          <div className="relative bg-gradient-to-r from-[hsl(var(--primary)/0.05)] to-[hsl(var(--secondary)/0.05)] rounded-2xl p-6 border border-[hsl(var(--primary)/0.1)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                    Settings
                  </h1>
                  <p className="text-sm text-muted-foreground">Customize your experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-12 bg-gradient-to-r from-[hsl(var(--primary)/0.05)] to-[hsl(var(--secondary)/0.05)] border border-[hsl(var(--primary)/0.1)]">
            <TabsTrigger
              value="appearance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--secondary))] data-[state=active]:text-white transition-all duration-300"
            >
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--secondary))] data-[state=active]:text-white transition-all duration-300"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            {/* Theme Selection Card */}
            <Card className="glass-card border-[hsl(var(--primary)/0.1)] shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                  <Moon className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
                  Theme Mode
                </CardTitle>
                <p className="text-sm text-muted-foreground">Choose your preferred theme mode</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center h-24 transition-all duration-300 hover:scale-105 ${
                      theme === "light"
                        ? "bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-lg"
                        : "hover:bg-[hsl(var(--primary)/0.05)] hover:border-[hsl(var(--primary)/0.3)]"
                    }`}
                    onClick={() => {
                      setTheme("light")
                      toast({
                        title: "☀️ Light theme applied",
                        description: "Switched to light mode",
                      })
                    }}
                  >
                    <Sun className="h-8 w-8 mb-2" />
                    <span className="font-medium">Light</span>
                    {theme === "light" && <Check className="absolute top-2 right-2 h-4 w-4" />}
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center h-24 transition-all duration-300 hover:scale-105 ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-lg"
                        : "hover:bg-[hsl(var(--primary)/0.05)] hover:border-[hsl(var(--primary)/0.3)]"
                    }`}
                    onClick={() => {
                      setTheme("dark")
                      toast({
                        title: "🌙 Dark theme applied",
                        description: "Switched to dark mode",
                      })
                    }}
                  >
                    <Moon className="h-8 w-8 mb-2" />
                    <span className="font-medium">Dark</span>
                    {theme === "dark" && <Check className="absolute top-2 right-2 h-4 w-4" />}
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className={`flex flex-col items-center justify-center h-24 transition-all duration-300 hover:scale-105 ${
                      theme === "system"
                        ? "bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-lg"
                        : "hover:bg-[hsl(var(--primary)/0.05)] hover:border-[hsl(var(--primary)/0.3)]"
                    }`}
                    onClick={() => {
                      setTheme("system")
                      toast({
                        title: "💻 System theme applied",
                        description: "Following system preferences",
                      })
                    }}
                  >
                    <Monitor className="h-8 w-8 mb-2" />
                    <span className="font-medium">System</span>
                    {theme === "system" && <Check className="absolute top-2 right-2 h-4 w-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Color Customization Card */}
            <Card className="glass-card border-[hsl(var(--primary)/0.1)] shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                  <Palette className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
                  Color Palette
                </CardTitle>
                <p className="text-sm text-muted-foreground">Personalize your app's color scheme</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Accent Colors */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                    Accent Colors
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {accentColors.map((color) => (
                      <button
                        key={color.value}
                        className={`group relative h-16 w-full rounded-xl bg-gradient-to-br ${color.gradient} transition-all duration-300 hover:scale-110 hover:shadow-lg ${
                          accent === color.value
                            ? "ring-4 ring-offset-4 ring-offset-background ring-current shadow-xl scale-105"
                            : ""
                        }`}
                        onClick={() => {
                          setAccent(color.value as any)
                          toast({
                            title: `🎨 ${color.name} theme applied`,
                            description: `Switched to ${color.name.toLowerCase()} color scheme`,
                          })
                        }}
                        title={color.name}
                      >
                        <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {accent === color.value && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="h-6 w-6 text-white drop-shadow-lg" />
                          </div>
                        )}
                        <div className="absolute bottom-1 left-1 right-1 text-center">
                          <span className="text-xs font-medium text-white drop-shadow-md">{color.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Colors Section */}
                {customThemeUnlocked ? (
                  <div className="border-t border-[hsl(var(--primary)/0.1)] pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
                        Custom Colors
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`transition-all duration-300 hover:scale-105 ${
                          accent === "custom"
                            ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white border-transparent shadow-lg"
                            : "hover:bg-[hsl(var(--primary)/0.05)] hover:border-[hsl(var(--primary)/0.3)]"
                        }`}
                        onClick={applyCustomTheme}
                      >
                        {accent === "custom" && <Check className="h-4 w-4 mr-2" />}
                        <Sparkles className="h-4 w-4 mr-2" />
                        Apply Custom
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Primary Color */}
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Primary Color</p>
                        <div className="flex items-center gap-3">
                          <div
                            className="h-12 w-12 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg border-2 border-white/20"
                            style={{ backgroundColor: customColors.primary }}
                            onClick={() => handleColorPickerToggle("primary")}
                          />
                          <div className="flex-1">
                            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">{customColors.primary}</span>
                          </div>
                        </div>
                        {activeColorPicker === "primary" && (
                          <div className="color-picker-wrapper p-4 border border-[hsl(var(--primary)/0.2)] rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.02)] to-[hsl(var(--secondary)/0.02)]">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold">Select Primary Color</span>
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-6 w-6 rounded-full border-2 border-white/50 shadow-sm"
                                  style={{ backgroundColor: tempColors.primary }}
                                />
                                <span className="text-xs font-mono">{tempColors.primary}</span>
                              </div>
                            </div>
                            <HexColorPicker
                              color={tempColors.primary}
                              onChange={(color) => {
                                setTempColors((prev) => ({ ...prev, primary: color }))
                              }}
                            />
                            <div className="flex justify-between mt-4 gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleCancelColor("primary")}
                              >
                                <X className="h-3 w-3 mr-1" /> Cancel
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleApplyColor("primary")}
                              >
                                <RefreshCw className="h-3 w-3 mr-1" /> Apply
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
                                onClick={() => handleSaveColor("primary")}
                              >
                                <Save className="h-3 w-3 mr-1" /> Save
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Secondary Color */}
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-muted-foreground">Secondary Color</p>
                        <div className="flex items-center gap-3">
                          <div
                            className="h-12 w-12 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg border-2 border-white/20"
                            style={{ backgroundColor: customColors.secondary }}
                            onClick={() => handleColorPickerToggle("secondary")}
                          />
                          <div className="flex-1">
                            <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                              {customColors.secondary}
                            </span>
                          </div>
                        </div>
                        {activeColorPicker === "secondary" && (
                          <div className="color-picker-wrapper p-4 border border-[hsl(var(--primary)/0.2)] rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.02)] to-[hsl(var(--secondary)/0.02)]">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-semibold">Select Secondary Color</span>
                              <div className="flex items-center gap-2">
                                <div
                                  className="h-6 w-6 rounded-full border-2 border-white/50 shadow-sm"
                                  style={{ backgroundColor: tempColors.secondary }}
                                />
                                <span className="text-xs font-mono">{tempColors.secondary}</span>
                              </div>
                            </div>
                            <HexColorPicker
                              color={tempColors.secondary}
                              onChange={(color) => {
                                setTempColors((prev) => ({ ...prev, secondary: color }))
                              }}
                            />
                            <div className="flex justify-between mt-4 gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleCancelColor("secondary")}
                              >
                                <X className="h-3 w-3 mr-1" /> Cancel
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleApplyColor("secondary")}
                              >
                                <RefreshCw className="h-3 w-3 mr-1" /> Apply
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
                                onClick={() => handleSaveColor("secondary")}
                              >
                                <Save className="h-3 w-3 mr-1" /> Save
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 border border-dashed border-[hsl(var(--primary)/0.3)] rounded-xl bg-gradient-to-br from-[hsl(var(--primary)/0.02)] to-[hsl(var(--secondary)/0.02)]">
                    <div className="mb-3">
                      <div className="h-12 w-12 mx-auto bg-gradient-to-br from-[hsl(var(--primary)/0.2)] to-[hsl(var(--secondary)/0.2)] rounded-full flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-[hsl(var(--primary))]" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">🔒 Custom Colors Locked</p>
                    <p className="text-xs text-muted-foreground mb-4">Unlock custom colors with 500 points</p>
                    <Link href="/rewards">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-[hsl(var(--primary)/0.05)] hover:border-[hsl(var(--primary)/0.3)]"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        View Rewards
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-card border-[hsl(var(--primary)/0.1)] shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl flex items-center bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                  <Bell className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
                  Notification Preferences
                </CardTitle>
                <p className="text-sm text-muted-foreground">Manage how you receive notifications</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      key: "messages",
                      label: "Messages",
                      description: "Receive notifications for new messages",
                      icon: "💬",
                    },
                    {
                      key: "connections",
                      label: "Connection Requests",
                      description: "Receive notifications for new connection requests",
                      icon: "👥",
                    },
                    {
                      key: "achievements",
                      label: "Achievements",
                      description: "Receive notifications for new achievements",
                      icon: "🏆",
                    },
                    {
                      key: "sessions",
                      label: "Session Reminders",
                      description: "Receive reminders for upcoming sessions",
                      icon: "📅",
                    },
                  ].map((setting) => (
                    <div
                      key={setting.key}
                      className="flex items-center justify-between p-4 rounded-xl border border-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.2)] transition-all duration-300 hover:bg-[hsl(var(--primary)/0.02)]"
                    >
                      <div className="space-y-0.5">
                        <Label htmlFor={setting.key} className="flex items-center text-sm font-medium">
                          <span className="mr-2">{setting.icon}</span>
                          {setting.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                      </div>
                      <Switch
                        id={setting.key}
                        checked={notificationSettings[setting.key as keyof typeof notificationSettings]}
                        onCheckedChange={(checked) =>
                          updateNotificationSetting(setting.key as keyof typeof notificationSettings, checked)
                        }
                        className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-[hsl(var(--primary))] data-[state=checked]:to-[hsl(var(--secondary))]"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
    </div>
  )
}
