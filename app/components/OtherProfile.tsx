"use client"

import { ArrowLeft, MessageSquare, Calendar, Star, MapPin, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface OtherProfileProps {
  name: string
  onBack: () => void
}

export default function OtherProfile({ name, onBack }: OtherProfileProps) {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")

  // Mock data for the profile
  const profiles = {
    "Alice Smith": {
      bio: "Language Teacher & Traveler",
      teachSkills: ["Spanish", "French", "ESL Teaching"],
      learnSkills: ["JavaScript", "Web Design", "Photography"],
      rating: 4.8,
      reviews: 12,
      location: "San Francisco, CA",
      achievements: ["Top Language Teacher", "5+ Years Experience"],
    },
    "Bob Johnson": {
      bio: "Musician & Audio Engineer",
      teachSkills: ["Guitar", "Music Production", "Sound Design"],
      learnSkills: ["Spanish", "Public Speaking", "Marketing"],
      rating: 4.6,
      reviews: 8,
      location: "Austin, TX",
      achievements: ["Professional Musician", "Studio Owner"],
    },
    "Carol Williams": {
      bio: "Photographer & Visual Artist",
      teachSkills: ["Photography", "Photoshop", "Composition"],
      learnSkills: ["Guitar", "French", "Cooking"],
      rating: 4.9,
      reviews: 15,
      location: "Portland, OR",
      achievements: ["Award-winning Photographer", "Published Artist"],
    },
    "David Lee": {
      bio: "Software Engineer & Data Scientist",
      teachSkills: ["Python", "Machine Learning", "Data Analysis"],
      learnSkills: ["Spanish", "Public Speaking", "Drawing"],
      rating: 4.7,
      reviews: 9,
      location: "Seattle, WA",
      achievements: ["Tech Conference Speaker", "Open Source Contributor"],
    },
    "Emma Garcia": {
      bio: "Yoga Instructor & Wellness Coach",
      teachSkills: ["Yoga", "Meditation", "Nutrition"],
      learnSkills: ["Web Development", "Photography", "Spanish"],
      rating: 5.0,
      reviews: 23,
      location: "Los Angeles, CA",
      achievements: ["Certified Instructor", "Wellness Retreat Host"],
    },
  }

  // Get profile data or use default if not found
  const profile = profiles[name as keyof typeof profiles] || {
    bio: "Skill Sharer",
    teachSkills: ["Teaching"],
    learnSkills: ["Learning"],
    rating: 4.5,
    reviews: 0,
    location: "Nearby",
    achievements: [],
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="section-title mb-0">Profile</h2>
      </div>

      <Card className="glass-card overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary to-primary/70"></div>
        <CardContent className="pt-0 relative">
          <div className="flex flex-col items-center -mt-12 mb-6">
            <Avatar className="avatar-xl gradient-border border-4 border-card">
              <AvatarImage src={`/placeholder.svg?height=96&width=96&text=${initials}`} alt={name} />
              <AvatarFallback className="text-xl bg-primary/10 text-primary">{initials}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold mt-3">{name}</h2>
            <p className="text-muted-foreground mb-2">{profile.bio}</p>

            <div className="flex items-center text-sm mb-2">
              <Badge className="flex items-center gap-1 bg-primary/10 text-primary">
                <Star className="h-3 w-3 fill-primary" /> {profile.rating} ({profile.reviews} reviews)
              </Badge>
              <span className="mx-2 text-muted-foreground">•</span>
              <span className="flex items-center text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" /> {profile.location}
              </span>
            </div>

            {profile.achievements.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {profile.achievements.map((achievement) => (
                  <Badge key={achievement} variant="outline" className="flex items-center gap-1">
                    <Award className="h-3 w-3 text-primary" /> {achievement}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <h3 className="font-semibold mb-2">Skills {name} can teach:</h3>
              <div className="flex flex-wrap gap-2">
                {profile.teachSkills.map((skill) => (
                  <Badge key={skill} className="bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Skills {name} wants to learn:</h3>
              <div className="flex flex-wrap gap-2">
                {profile.learnSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="bg-secondary/10 text-secondary-foreground border-secondary/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1 flex items-center justify-center">
              <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
            <Button variant="outline" className="flex-1 flex items-center justify-center">
              <Calendar className="mr-2 h-4 w-4" /> Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="glass-card">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-3">Recent Reviews</h3>
            {profile.reviews > 0 ? (
              <div className="space-y-3">
                <div className="pb-3 border-b border-border/50">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Michael T.</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${star <= Math.round(profile.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great teacher! Very patient and knowledgeable. Would definitely recommend.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Sarah K.</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3 w-3 ${star <= Math.round(profile.rating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Excellent session! I learned so much in just one hour.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No reviews yet.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
