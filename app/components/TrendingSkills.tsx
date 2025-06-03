"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, BookOpen, Code, Dumbbell, Music } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for trending skills
const trendingSkills = {
  tech: [
    { id: "javascript", name: "JavaScript", count: 1243, icon: "💻" },
    { id: "python", name: "Python", count: 986, icon: "🐍" },
    { id: "react", name: "React", count: 875, icon: "⚛️" },
  ],
  language: [
    { id: "spanish", name: "Spanish", count: 1567, icon: "🇪🇸" },
    { id: "french", name: "French", count: 1243, icon: "🇫🇷" },
    { id: "japanese", name: "Japanese", count: 986, icon: "🇯🇵" },
  ],
  music: [
    { id: "guitar", name: "Guitar", count: 1243, icon: "🎸" },
    { id: "piano", name: "Piano", count: 986, icon: "🎹" },
    { id: "singing", name: "Singing", count: 875, icon: "🎤" },
  ],
  fitness: [
    { id: "yoga", name: "Yoga", count: 1567, icon: "🧘" },
    { id: "hiit", name: "HIIT", count: 1243, icon: "🏋️" },
    { id: "running", name: "Running", count: 986, icon: "🏃" },
  ],
}

export default function TrendingSkills() {
  const [activeSkillTab, setActiveSkillTab] = useState("tech")
  const router = useRouter()

  return (
    <div className="mobile-card glass-card mb-3">
      <div className="mobile-card-header">
        <div className="mobile-card-title">
          <div className="bg-primary/10 p-1.5 rounded-full mr-2">
            <BookOpen className="h-4 w-4 text-primary" />
          </div>
          <span>Trending Skills</span>
        </div>
        <Button variant="ghost" size="sm" className="text-xs h-7 px-2" onClick={() => router.push("/skills")}>
          View All
        </Button>
      </div>
      <div className="mobile-card-content">
        <Tabs value={activeSkillTab} onValueChange={setActiveSkillTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-2 p-0.5 bg-muted/50 backdrop-blur-sm h-8">
            <TabsTrigger
              value="tech"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-7"
            >
              <Code className="h-3 w-3 mr-1" /> Tech
            </TabsTrigger>
            <TabsTrigger
              value="language"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-7"
            >
              <BookOpen className="h-3 w-3 mr-1" /> Lang
            </TabsTrigger>
            <TabsTrigger
              value="music"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-7"
            >
              <Music className="h-3 w-3 mr-1" /> Music
            </TabsTrigger>
            <TabsTrigger
              value="fitness"
              className="data-[state=active]:bg-background data-[state=active]:shadow-sm text-xs py-1 h-7"
            >
              <Dumbbell className="h-3 w-3 mr-1" /> Fitness
            </TabsTrigger>
          </TabsList>

          {Object.entries(trendingSkills).map(([category, skills]) => (
            <TabsContent key={category} value={category} className="animate-in mt-0">
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="border border-border/30 rounded-lg p-2 hover:border-primary/30 hover:bg-primary/5 transition-all shadow-sm cursor-pointer"
                    onClick={() => router.push(`/skill/${skill.id}`)}
                  >
                    <div className="flex items-center">
                      <div className="text-lg mr-2 bg-background/80 h-9 w-9 rounded-full flex items-center justify-center shadow-sm">
                        {skill.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-xs">{skill.name}</h3>
                        <div className="flex items-center text-tiny text-muted-foreground mt-0.5">
                          <span>{skill.count.toLocaleString()} learners</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="ml-1 rounded-full h-7 w-7 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/skill/${skill.id}`)
                        }}
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
