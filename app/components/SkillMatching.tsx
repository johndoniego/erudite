"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, ArrowRight } from "lucide-react"

interface SkillMatchingProps {
  onViewProfile: (name: string) => void
}

export default function SkillMatching({ onViewProfile }: SkillMatchingProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const matches = [
    {
      name: "Alice Smith",
      avatar: "AS",
      skill: "Spanish",
      matchScore: 95,
      distance: "2 miles away",
      bio: "Language teacher with 5+ years of experience",
    },
    {
      name: "Bob Johnson",
      avatar: "BJ",
      skill: "Guitar",
      matchScore: 87,
      distance: "5 miles away",
      bio: "Professional musician and instructor",
    },
    {
      name: "Carol Williams",
      avatar: "CW",
      skill: "Photography",
      matchScore: 92,
      distance: "3 miles away",
      bio: "Award-winning photographer and visual artist",
    },
  ]

  const nextMatch = () => {
    setActiveIndex((prev) => (prev + 1) % matches.length)
  }

  const activeMatch = matches[activeIndex]

  return (
    <Card className="glass-card card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="gradient-text">Top Skill Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMatch.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="absolute top-0 right-0">
              <Badge className="bg-primary/10 text-primary flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary" /> {activeMatch.matchScore}% Match
              </Badge>
            </div>

            <div className="flex flex-col items-center text-center mb-4 mt-6">
              <Avatar className="avatar-xl gradient-border mb-3">
                <AvatarImage
                  src={`/placeholder.svg?height=80&width=80&text=${activeMatch.avatar}`}
                  alt={activeMatch.name}
                />
                <AvatarFallback className="bg-primary/10 text-primary">{activeMatch.avatar}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{activeMatch.name}</h3>
              <p className="text-muted-foreground text-sm mb-1">{activeMatch.bio}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{activeMatch.distance}</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <Badge className="mb-4 px-4 py-1.5 text-sm bg-primary/10 text-primary">Teaches {activeMatch.skill}</Badge>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={nextMatch}>
                  Next Match
                </Button>
                <Button className="flex-1 flex items-center" onClick={() => onViewProfile(activeMatch.name)}>
                  View Profile <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-4">
          {matches.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${index === activeIndex ? "bg-primary" : "bg-primary/20"}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
