"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Check, Plus, X, Camera, Award, BookOpen, User, Zap } from "lucide-react"

interface UserProfileProps {
  editable?: boolean
}

export default function UserProfile({ editable = false }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("John Doe")
  const [bio, setBio] = useState("Web Developer")
  const [teachSkills, setTeachSkills] = useState(["JavaScript", "React", "Node.js"])
  const [learnSkills, setLearnSkills] = useState(["Spanish", "Guitar", "Photography"])
  const [newTeachSkill, setNewTeachSkill] = useState("")
  const [newLearnSkill, setNewLearnSkill] = useState("")
  const [isAddingTeachSkill, setIsAddingTeachSkill] = useState(false)
  const [isAddingLearnSkill, setIsAddingLearnSkill] = useState(false)

  const handleAddTeachSkill = () => {
    if (newTeachSkill.trim()) {
      setTeachSkills([...teachSkills, newTeachSkill.trim()])
      setNewTeachSkill("")
      setIsAddingTeachSkill(false)
    }
  }

  const handleAddLearnSkill = () => {
    if (newLearnSkill.trim()) {
      setLearnSkills([...learnSkills, newLearnSkill.trim()])
      setNewLearnSkill("")
      setIsAddingLearnSkill(false)
    }
  }

  const handleRemoveTeachSkill = (skill: string) => {
    setTeachSkills(teachSkills.filter((s) => s !== skill))
  }

  const handleRemoveLearnSkill = (skill: string) => {
    setLearnSkills(learnSkills.filter((s) => s !== skill))
  }

  return (
    <Card className="border border-border/40 shadow-sm overflow-hidden">
      <CardHeader className="pb-2 bg-muted/10">
        <CardTitle className="text-foreground flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-primary/10 p-1.5 rounded-md mr-2">
              <User className="h-4 w-4 text-primary" />
            </div>
            <span>{editable ? "My Profile" : "Profile"}</span>
          </div>
          {editable && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="rounded-full h-8 w-8 p-0"
            >
              {isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <Avatar className="h-20 w-20 border border-border/40">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
              <AvatarFallback className="text-lg bg-primary/10 text-primary">JD</AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full shadow-sm"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="flex-1">
            {isEditing ? (
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mb-2 font-medium" />
            ) : (
              <h2 className="text-xl font-semibold mb-1">{name}</h2>
            )}

            {isEditing ? (
              <Input value={bio} onChange={(e) => setBio(e.target.value)} />
            ) : (
              <div className="flex items-center text-muted-foreground">
                <span>{bio}</span>
                <div className="ml-2 flex items-center">
                  <Badge variant="outline" className="ml-2 flex items-center gap-1 bg-primary/5 border-primary/20">
                    <User className="h-3 w-3 text-primary" /> Level 3
                  </Badge>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold flex items-center">
                <Zap className="h-4 w-4 mr-1 text-primary" />
                Skills I can teach:
              </h3>
              {isEditing && !isAddingTeachSkill && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingTeachSkill(true)}
                  className="rounded-full h-7 w-7 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {teachSkills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge className="skill-badge bg-primary/10 text-primary border border-primary/20">
                      {skill}
                      {isEditing && (
                        <button onClick={() => handleRemoveTeachSkill(skill)} className="ml-1 text-xs">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isEditing && isAddingTeachSkill && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  className="flex items-center gap-1 mt-1 w-full"
                >
                  <Input
                    value={newTeachSkill}
                    onChange={(e) => setNewTeachSkill(e.target.value)}
                    placeholder="New skill"
                    className="text-xs h-8"
                    autoFocus
                  />
                  <Button size="sm" className="h-8 text-xs" onClick={handleAddTeachSkill}>
                    Add
                  </Button>
                </motion.div>
              )}
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold flex items-center">
                <BookOpen className="h-4 w-4 mr-1 text-primary" />
                Skills I want to learn:
              </h3>
              {isEditing && !isAddingLearnSkill && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingLearnSkill(true)}
                  className="rounded-full h-7 w-7 p-0"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {learnSkills.map((skill) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge
                      variant="outline"
                      className="skill-badge bg-secondary/10 text-secondary-foreground border-secondary/20"
                    >
                      {skill}
                      {isEditing && (
                        <button onClick={() => handleRemoveLearnSkill(skill)} className="ml-1 text-xs">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isEditing && isAddingLearnSkill && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  className="flex items-center gap-1 mt-1 w-full"
                >
                  <Input
                    value={newLearnSkill}
                    onChange={(e) => setNewLearnSkill(e.target.value)}
                    placeholder="New skill"
                    className="text-xs h-8"
                    autoFocus
                  />
                  <Button size="sm" className="h-8 text-xs" onClick={handleAddLearnSkill}>
                    Add
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {editable && (
          <div className="mt-6">
            <Button variant="outline" className="w-full">
              <Award className="h-4 w-4 mr-2" /> View My Achievements
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
