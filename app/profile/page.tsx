"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  MapPin,
  LinkIcon,
  Bookmark,
  User,
  Award,
  BookOpen,
  Zap,
  Camera,
  Edit3,
  Star,
  TrendingUp,
  Users,
  Save,
  X,
  Plus,
  Check,
  Trash2,
  Shield,
  MessageSquare,
  ThumbsUp,
} from "lucide-react"
import { getSavedPosts, unsavePost, type SavedPost } from "@/app/utils/saved-posts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/app/context/gamification-context"
import { useToast } from "@/hooks/use-toast"

const ProfilePage = () => {
  const { toast } = useToast()
  const { achievements, rewards, points, level, streak, unlockAchievement, updateAchievementProgress, claimReward } =
    useGamification()

  // Profile state
  const [isEditing, setIsEditing] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [name, setName] = useState("John Doe")
  const [bio, setBio] = useState("Senior Software Engineer & Mentor")
  const [location, setLocation] = useState("San Francisco, CA")
  const [joinDate, setJoinDate] = useState("Jan 2023")
  const [website, setWebsite] = useState("johndoe.dev")
  const [linkedin, setLinkedin] = useState("linkedin.com/in/johndoe")
  const [github, setGithub] = useState("github.com/johndoe")
  const [aboutMe, setAboutMe] = useState(
    "Passionate software engineer with 8+ years of experience building scalable web applications. I love sharing knowledge and helping others grow in their tech journey. When I'm not coding, you can find me exploring new technologies or mentoring aspiring developers.",
  )

  // Skills state
  const [teachSkills, setTeachSkills] = useState([
    { name: "JavaScript", level: "Expert" },
    { name: "React", level: "Expert" },
    { name: "Node.js", level: "Advanced" },
    { name: "Python", level: "Intermediate" },
    { name: "TypeScript", level: "Advanced" },
  ])
  const [learnSkills, setLearnSkills] = useState([
    { name: "Spanish", level: "Beginner" },
    { name: "Guitar", level: "Beginner" },
    { name: "Photography", level: "Intermediate" },
  ])
  const [newTeachSkill, setNewTeachSkill] = useState({ name: "", level: "Beginner" })
  const [newLearnSkill, setNewLearnSkill] = useState({ name: "", level: "Beginner" })
  const [isAddingTeachSkill, setIsAddingTeachSkill] = useState(false)
  const [isAddingLearnSkill, setIsAddingLearnSkill] = useState(false)

  // Saved posts
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([])

  // Dialogs
  const [showAchievementDialog, setShowAchievementDialog] = useState(false)
  const [showProfileImageDialog, setShowProfileImageDialog] = useState(false)
  const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)

  // Selected achievement for dialog
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null)

  const [selectedSavedPost, setSelectedSavedPost] = useState<SavedPost | null>(null)
  const [showSavedPostDialog, setShowSavedPostDialog] = useState(false)

  // Load profile data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProfile = localStorage.getItem("erudite-profile")
      if (savedProfile) {
        const profile = JSON.parse(savedProfile)
        setName(profile.name || name)
        setBio(profile.bio || bio)
        setLocation(profile.location || location)
        setJoinDate(profile.joinDate || joinDate)
        setWebsite(profile.website || website)
        setLinkedin(profile.linkedin || linkedin)
        setGithub(profile.github || github)
        setProfileImage(profile.profileImage || null)
        setAboutMe(profile.aboutMe || aboutMe)
      }

      const savedTeachSkills = localStorage.getItem("erudite-teach-skills")
      if (savedTeachSkills) {
        setTeachSkills(JSON.parse(savedTeachSkills))
      }

      const savedLearnSkills = localStorage.getItem("erudite-learn-skills")
      if (savedLearnSkills) {
        setLearnSkills(JSON.parse(savedLearnSkills))
      }

      setSavedPosts(getSavedPosts())
    }

    // Check if profile is complete for achievement
    checkProfileCompletion()
  }, [])

  // Save profile data when it changes
  useEffect(() => {
    if (typeof window !== "undefined" && !isEditing) {
      const profile = {
        name,
        bio,
        location,
        joinDate,
        website,
        linkedin,
        github,
        profileImage,
        aboutMe,
      }
      localStorage.setItem("erudite-profile", JSON.stringify(profile))
      localStorage.setItem("erudite-teach-skills", JSON.stringify(teachSkills))
      localStorage.setItem("erudite-learn-skills", JSON.stringify(learnSkills))
    }
  }, [name, bio, location, website, linkedin, github, profileImage, teachSkills, learnSkills, aboutMe, isEditing])

  const handleSaveProfile = () => {
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    })

    // Check if profile is complete for achievement
    checkProfileCompletion()
  }

  const checkProfileCompletion = () => {
    // Count completed profile fields
    let completedFields = 0
    if (name) completedFields++
    if (bio) completedFields++
    if (location) completedFields++
    if (profileImage) completedFields++
    if (teachSkills.length > 0) completedFields++

    // Update achievement progress
    updateAchievementProgress("profile-complete", completedFields)
  }

  const handleUnsavePost = (postId: string) => {
    unsavePost(postId)
    setSavedPosts(getSavedPosts())
    toast({
      title: "Post Unsaved",
      description: "The post has been removed from your saved items.",
    })
  }

  const handleAddTeachSkill = () => {
    if (newTeachSkill.name.trim()) {
      setTeachSkills([...teachSkills, { ...newTeachSkill }])
      setNewTeachSkill({ name: "", level: "Beginner" })
      setIsAddingTeachSkill(false)
      checkProfileCompletion()
    }
  }

  const handleAddLearnSkill = () => {
    if (newLearnSkill.name.trim()) {
      setLearnSkills([...learnSkills, { ...newLearnSkill }])
      setNewLearnSkill({ name: "", level: "Beginner" })
      setIsAddingLearnSkill(false)
    }
  }

  const handleRemoveTeachSkill = (skillName: string) => {
    setTeachSkills(teachSkills.filter((skill) => skill.name !== skillName))
  }

  const handleRemoveLearnSkill = (skillName: string) => {
    setLearnSkills(learnSkills.filter((skill) => skill.name !== skillName))
  }

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
          setShowProfileImageDialog(false)
          toast({
            title: "Profile Image Updated",
            description: "Your profile image has been successfully updated.",
          })
          checkProfileCompletion()
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleViewAchievement = (id: string) => {
    setSelectedAchievement(id)
    setShowAchievementDialog(true)
  }

  const handleViewSavedPost = (post: SavedPost) => {
    setSelectedSavedPost(post)
    setShowSavedPostDialog(true)
  }

  const selectedAchievementData = achievements.find((a) => a.id === selectedAchievement)

  const stats = [
    { label: "Skills Taught", value: "12", icon: Zap, color: "text-primary" },
    { label: "Students Helped", value: "89", icon: Users, color: "text-primary" },
    { label: "Sessions", value: "34", icon: Calendar, color: "text-primary" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-primary" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[hsl(var(--primary)/0.05)] to-[hsl(var(--secondary)/0.05)]">
      <div className="page-container">
        <div className="page-content space-y-6 max-w-4xl mx-auto pb-20">
          {/* Hero Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
            <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.8)] to-[hsl(var(--secondary))]">
              <div className="absolute inset-0 bg-black/20"></div>
              <CardContent className="relative p-8 text-white">
                <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white/20 shadow-2xl">
                      {profileImage ? (
                        <AvatarImage src={profileImage || "/placeholder.svg"} alt={name} />
                      ) : (
                        <AvatarImage
                          src="https://images.unsplash.com/photo-1472099645785-5658abf49a40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt={name}
                        />
                      )}
                      <AvatarFallback className="text-2xl bg-white/10">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/30"
                      onClick={() => setShowProfileImageDialog(true)}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center md:text-left flex-1">
                    {isEditing ? (
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mb-2 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Your name"
                      />
                    ) : (
                      <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
                        <h1 className="text-3xl font-bold">{name}</h1>
                        <Badge className="bg-white/20 text-white border-white/30">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Pro
                        </Badge>
                      </div>
                    )}

                    {isEditing ? (
                      <Input
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mb-3 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        placeholder="Your bio"
                      />
                    ) : (
                      <p className="text-xl text-white/90 mb-3">{bio}</p>
                    )}

                    <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-white/80">
                      {isEditing ? (
                        <Input
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full md:w-auto bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          placeholder="Your location"
                        />
                      ) : (
                        <span className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{location}</span>
                        </span>
                      )}
                      <span className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {joinDate}</span>
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={isEditing ? "secondary" : "outline"}
                    className={
                      isEditing
                        ? "bg-white text-primary hover:bg-white/90"
                        : "bg-white/10 hover:bg-white/20 text-white border-white/30"
                    }
                    onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                  >
                    {isEditing ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    ) : (
                      <>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Profile
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, index) => (
              <Card
                key={stat.label}
                className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6 text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="border-0 shadow-xl">
              <CardContent className="p-6">
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-6 bg-muted/50">
                    <TabsTrigger value="about" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      About
                    </TabsTrigger>
                    <TabsTrigger value="skills" className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      Skills
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Achievements
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="flex items-center gap-2">
                      <Bookmark className="h-4 w-4" />
                      Saved
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        About Me
                      </h3>
                      {isEditing ? (
                        <Textarea
                          value={aboutMe}
                          onChange={(e) => setAboutMe(e.target.value)}
                          className="mb-6 min-h-[120px]"
                          placeholder="Tell us about yourself"
                        />
                      ) : (
                        <p className="text-muted-foreground leading-relaxed mb-6">{aboutMe}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Card className="border border-border/50 bg-muted/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <LinkIcon className="h-4 w-4 mr-2 text-primary" />
                            Links
                          </h4>
                          <div className="space-y-2">
                            {isEditing ? (
                              <div className="flex items-center space-x-2 mb-2">
                                <span>🌐</span>
                                <Input
                                  value={website}
                                  onChange={(e) => setWebsite(e.target.value)}
                                  className="flex-1"
                                  placeholder="Your website"
                                />
                              </div>
                            ) : (
                              <a href="#" className="flex items-center space-x-2 text-primary hover:underline">
                                <span>🌐</span>
                                <span>{website}</span>
                              </a>
                            )}

                            {isEditing ? (
                              <div className="flex items-center space-x-2 mb-2">
                                <span>💼</span>
                                <Input
                                  value={linkedin}
                                  onChange={(e) => setLinkedin(e.target.value)}
                                  className="flex-1"
                                  placeholder="Your LinkedIn"
                                />
                              </div>
                            ) : (
                              <a href="#" className="flex items-center space-x-2 text-primary hover:underline">
                                <span>💼</span>
                                <span>LinkedIn</span>
                              </a>
                            )}

                            {isEditing ? (
                              <div className="flex items-center space-x-2">
                                <span>🐙</span>
                                <Input
                                  value={github}
                                  onChange={(e) => setGithub(e.target.value)}
                                  className="flex-1"
                                  placeholder="Your GitHub"
                                />
                              </div>
                            ) : (
                              <a href="#" className="flex items-center space-x-2 text-primary hover:underline">
                                <span>🐙</span>
                                <span>GitHub</span>
                              </a>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border border-border/50 bg-muted/20">
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2 text-primary" />
                            Interests
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {["Web Development", "AI/ML", "Open Source", "Mentoring", "Tech Talks"].map((interest) => (
                              <Badge key={interest} variant="outline" className="bg-primary/5 border-primary/20">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {isEditing && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <h4 className="font-semibold mb-3 text-destructive flex items-center">
                          <Shield className="h-4 w-4 mr-2" />
                          Danger Zone
                        </h4>
                        <Button
                          variant="destructive"
                          className="w-full sm:w-auto"
                          onClick={() => setShowDeleteAccountDialog(true)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="skills" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-primary" />
                        Skills I Can Teach
                      </h3>
                      <div className="space-y-4">
                        {teachSkills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="border border-border/50 hover:shadow-md transition-all duration-300">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                                    <span className="font-medium">{skill.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                                      {skill.level}
                                    </Badge>
                                    {isEditing && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-destructive"
                                        onClick={() => handleRemoveTeachSkill(skill.name)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}

                        {isEditing && (
                          <AnimatePresence>
                            {isAddingTeachSkill ? (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                <Card className="border border-primary/30 bg-primary/5">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                      <Input
                                        value={newTeachSkill.name}
                                        onChange={(e) => setNewTeachSkill({ ...newTeachSkill, name: e.target.value })}
                                        placeholder="Skill name"
                                        className="flex-1"
                                        autoFocus
                                      />
                                      <select
                                        value={newTeachSkill.level}
                                        onChange={(e) => setNewTeachSkill({ ...newTeachSkill, level: e.target.value })}
                                        className="h-10 rounded-md border border-input bg-background px-3 py-2"
                                      >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                      </select>
                                      <div className="flex gap-2">
                                        <Button onClick={handleAddTeachSkill} className="flex-1 sm:flex-none">
                                          <Check className="h-4 w-4 mr-2" />
                                          Add
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          onClick={() => setIsAddingTeachSkill(false)}
                                          className="flex-1 sm:flex-none"
                                        >
                                          <X className="h-4 w-4 mr-2" />
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ) : (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Button
                                  variant="outline"
                                  className="w-full border-dashed"
                                  onClick={() => setIsAddingTeachSkill(true)}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add New Teaching Skill
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4 flex items-center">
                        <BookOpen className="h-5 w-5 mr-2 text-primary" />
                        Skills I Want to Learn
                      </h3>
                      <div className="space-y-4">
                        {learnSkills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="border border-border/50 hover:shadow-md transition-all duration-300">
                              <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                    <span className="font-medium">{skill.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800">
                                      {skill.level}
                                    </Badge>
                                    {isEditing && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-8 w-8 p-0 text-destructive"
                                        onClick={() => handleRemoveLearnSkill(skill.name)}
                                      >
                                        <X className="h-4 w-4" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}

                        {isEditing && (
                          <AnimatePresence>
                            {isAddingLearnSkill ? (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                              >
                                <Card className="border border-secondary/30 bg-secondary/5">
                                  <CardContent className="p-4">
                                    <div className="flex flex-col sm:flex-row gap-2">
                                      <Input
                                        value={newLearnSkill.name}
                                        onChange={(e) => setNewLearnSkill({ ...newLearnSkill, name: e.target.value })}
                                        placeholder="Skill name"
                                        className="flex-1"
                                        autoFocus
                                      />
                                      <select
                                        value={newLearnSkill.level}
                                        onChange={(e) => setNewLearnSkill({ ...newLearnSkill, level: e.target.value })}
                                        className="h-10 rounded-md border border-input bg-background px-3 py-2"
                                      >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Expert">Expert</option>
                                      </select>
                                      <div className="flex gap-2">
                                        <Button
                                          onClick={handleAddLearnSkill}
                                          className="flex-1 sm:flex-none"
                                          variant="secondary"
                                        >
                                          <Check className="h-4 w-4 mr-2" />
                                          Add
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          onClick={() => setIsAddingLearnSkill(false)}
                                          className="flex-1 sm:flex-none"
                                        >
                                          <X className="h-4 w-4 mr-2" />
                                          Cancel
                                        </Button>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ) : (
                              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Button
                                  variant="outline"
                                  className="w-full border-dashed"
                                  onClick={() => setIsAddingLearnSkill(true)}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add New Learning Skill
                                </Button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="achievements" className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold flex items-center">
                          <Award className="h-5 w-5 mr-2 text-primary" />
                          Achievements
                        </h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="bg-primary/5 border-primary/20">
                            <Zap className="h-3 w-3 mr-1" />
                            {points} Points
                          </Badge>
                          <Badge variant="outline" className="bg-secondary/5 border-secondary/20">
                            <Star className="h-3 w-3 mr-1" />
                            Level {level}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {achievements.map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleViewAchievement(achievement.id)}
                            className="cursor-pointer"
                          >
                            <Card
                              className={`border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                                achievement.unlocked
                                  ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20"
                                  : "bg-muted/20 border-border/50"
                              }`}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-start space-x-3">
                                  <div className={`text-2xl ${achievement.unlocked ? "opacity-100" : "opacity-50"}`}>
                                    {achievement.icon}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <h4
                                        className={`font-semibold mb-1 ${achievement.unlocked ? "" : "text-muted-foreground"}`}
                                      >
                                        {achievement.name}
                                      </h4>
                                      <Badge variant={achievement.unlocked ? "default" : "outline"} className="ml-2">
                                        +{achievement.points}
                                      </Badge>
                                    </div>
                                    <p className={`text-sm ${achievement.unlocked ? "opacity-80" : "opacity-60"}`}>
                                      {achievement.description}
                                    </p>

                                    {achievement.progress !== undefined && achievement.maxProgress !== undefined && (
                                      <div className="mt-2">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                          <span>Progress</span>
                                          <span>
                                            {achievement.progress}/{achievement.maxProgress}
                                          </span>
                                        </div>
                                        <Progress
                                          value={(achievement.progress / achievement.maxProgress) * 100}
                                          className={`h-2 ${achievement.unlocked ? "bg-primary/20" : "bg-muted"}`}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="saved" className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold flex items-center">
                          <Bookmark className="h-5 w-5 mr-2 text-primary" />
                          Saved Posts
                        </h3>
                        <Badge variant="outline" className="bg-primary/5 border-primary/20">
                          {savedPosts.length} saved
                        </Badge>
                      </div>

                      {savedPosts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {savedPosts.map((post, index) => (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="group"
                            >
                              <Card className="border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 h-full">
                                <CardContent className="p-4 sm:p-5 flex flex-col h-full">
                                  {/* Post Header */}
                                  <div className="flex items-center space-x-3 mb-3">
                                    <Avatar className="h-8 w-8 flex-shrink-0">
                                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                        {post.authorAvatar || post.author.charAt(0)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                      <p className="font-medium text-sm truncate">{post.author}</p>
                                      <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                                    </div>
                                    <Badge variant="secondary" className="text-xs px-2 py-1 flex-shrink-0">
                                      {post.sourceName}
                                    </Badge>
                                  </div>

                                  {/* Post Content */}
                                  <div className="flex-1 mb-4">
                                    <h4 className="font-semibold mb-2 text-sm sm:text-base line-clamp-2 group-hover:text-primary transition-colors">
                                      {post.title}
                                    </h4>
                                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                      {post.description}
                                    </p>
                                  </div>

                                  {/* Post Stats */}
                                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                                    <div className="flex items-center space-x-3">
                                      <span className="flex items-center">
                                        <ThumbsUp className="h-3 w-3 mr-1" />
                                        {post.likes}
                                      </span>
                                      <span className="flex items-center">
                                        <MessageSquare className="h-3 w-3 mr-1" />
                                        {post.comments}
                                      </span>
                                    </div>
                                    <span className="text-xs opacity-60">
                                      Saved {new Date(post.savedAt || Date.now()).toLocaleDateString()}
                                    </span>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-primary hover:text-primary/80 hover:bg-primary/10 flex-1 mr-2"
                                      onClick={() => handleViewSavedPost(post)}
                                    >
                                      <BookOpen className="h-4 w-4 mr-2" />
                                      Read More
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 px-3"
                                      onClick={() => handleUnsavePost(post.id)}
                                    >
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-12"
                        >
                          <div className="max-w-md mx-auto">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center">
                              <Bookmark className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">No saved posts yet</h4>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              Start saving your favorite content! When you find interesting posts, click the bookmark
                              icon to save them here.
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Achievement Dialog */}
      <AnimatePresence>
        {showAchievementDialog && selectedAchievementData && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl max-w-md w-full mx-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    {selectedAchievementData.icon}
                    {selectedAchievementData.name}
                  </h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowAchievementDialog(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">{selectedAchievementData.description}</p>

                {selectedAchievementData.reward && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-md p-4 mb-4">
                    <div className="flex items-center space-x-3">
                      <Award className="h-5 w-5 text-green-500" />
                      <div>
                        <h4 className="font-semibold">Reward Unlocked!</h4>
                        <p className="text-sm text-muted-foreground">
                          You've earned a special reward for this achievement.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-primary/5 border-primary/20">
                    +{selectedAchievementData.points} Points
                  </Badge>
                  <Button onClick={() => setShowAchievementDialog(false)}>Close</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Image Dialog */}
      <AnimatePresence>
        {showProfileImageDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl max-w-md w-full mx-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">Update Profile Image</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowProfileImageDialog(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">Upload a new image for your profile.</p>
                <Input type="file" accept="image/*" onChange={handleProfileImageUpload} />
                <div className="mt-4 flex justify-end">
                  <Button variant="secondary" onClick={() => setShowProfileImageDialog(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Account Dialog */}
      <AnimatePresence>
        {showDeleteAccountDialog && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-background rounded-lg shadow-xl max-w-md w-full mx-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-destructive">Delete Account</h3>
                  <Button variant="ghost" size="icon" onClick={() => setShowDeleteAccountDialog(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground mb-4">
                  Are you sure you want to delete your account? This action cannot be undone.
                </p>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="secondary" onClick={() => setShowDeleteAccountDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => setShowDeleteAccountDialog(false)}>
                    Delete Account
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Saved Post Dialog */}
      <AnimatePresence>
        {showSavedPostDialog && selectedSavedPost && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSavedPostDialog(false)}
          >
            <motion.div
              className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border/50 bg-muted/20">
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {selectedSavedPost.authorAvatar || selectedSavedPost.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-lg truncate">{selectedSavedPost.title || "Saved Post"}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{selectedSavedPost.author}</span>
                      <span>•</span>
                      <span>{selectedSavedPost.timestamp}</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setShowSavedPostDialog(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                <div className="prose prose-sm sm:prose-base max-w-none">
                  <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-foreground">
                    {selectedSavedPost.content}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-border/50 p-4 sm:p-6 bg-muted/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1.5" />
                      {selectedSavedPost.likes} likes
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1.5" />
                      {selectedSavedPost.comments} comments
                    </span>
                  </div>
                  <Badge variant="outline" className="bg-primary/5 border-primary/20">
                    {selectedSavedPost.sourceName}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 sm:flex-none"
                    onClick={() => {
                      handleUnsavePost(selectedSavedPost.id)
                      setShowSavedPostDialog(false)
                    }}
                  >
                    <Bookmark className="h-4 w-4 mr-2" />
                    Unsave Post
                  </Button>
                  <Button className="flex-1 sm:flex-none" onClick={() => setShowSavedPostDialog(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProfilePage
