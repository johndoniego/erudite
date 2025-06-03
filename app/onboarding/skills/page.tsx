"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Check,
  ArrowRight,
  Search,
  Sparkles,
  Lightbulb,
  Award,
  ChevronDown,
  Star,
  Users,
  TrendingUp,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

// Skill categories with specific skills and icons
const skillCategories = [
  {
    name: "Technology",
    icon: "💻",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    skills: [
      "JavaScript",
      "Python",
      "React",
      "Node.js",
      "HTML/CSS",
      "Data Science",
      "Mobile Development",
      "UI/UX Design",
    ],
  },
  {
    name: "Languages",
    icon: "🌎",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    skills: ["Spanish", "French", "German", "Mandarin", "Japanese", "Italian", "Russian", "Portuguese"],
  },
  {
    name: "Arts & Music",
    icon: "🎨",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    skills: ["Guitar", "Piano", "Singing", "Drawing", "Painting", "Photography", "Graphic Design", "Animation"],
  },
  {
    name: "Fitness & Health",
    icon: "💪",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    skills: ["Yoga", "Meditation", "Nutrition", "Weight Training", "Running", "Dance", "Martial Arts", "Pilates"],
  },
  {
    name: "Business",
    icon: "📊",
    gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
    skills: [
      "Marketing",
      "Entrepreneurship",
      "Public Speaking",
      "Leadership",
      "Finance",
      "Project Management",
      "Sales",
      "Writing",
    ],
  },
]

export default function SkillsSelectionPage() {
  const router = useRouter()
  const [teachSkills, setTeachSkills] = useState<string[]>([])
  const [learnSkills, setLearnSkills] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("teach")
  const [isLoaded, setIsLoaded] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(skillCategories.map((cat) => cat.name))
  const [trendingSkills, setTrendingSkills] = useState([
    {
      name: "AI & Machine Learning",
      icon: "🤖",
      gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
      skills: ["ChatGPT", "Machine Learning", "Prompt Engineering", "AI Ethics"],
    },
    {
      name: "Creative",
      icon: "✨",
      gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
      skills: ["Digital Art", "Video Editing", "Content Creation", "Storytelling"],
    },
    {
      name: "Professional",
      icon: "💼",
      gradient: "from-[hsl(var(--primary))] to-[hsl(var(--secondary))]",
      skills: ["Public Speaking", "Leadership", "Negotiation", "Time Management"],
    },
  ])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const toggleTeachSkill = (skill: string) => {
    if (teachSkills.includes(skill)) {
      setTeachSkills(teachSkills.filter((s) => s !== skill))
    } else {
      setTeachSkills([...teachSkills, skill])
    }
  }

  const toggleLearnSkill = (skill: string) => {
    if (learnSkills.includes(skill)) {
      setLearnSkills(learnSkills.filter((s) => s !== skill))
    } else {
      setLearnSkills([...learnSkills, skill])
    }
  }

  const filteredCategories = searchTerm
    ? skillCategories
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
        }))
        .filter((category) => category.skills.length > 0)
    : skillCategories

  const handleContinue = () => {
    router.push("/communities")
  }

  const loadDefaultAccount = () => {
    setTeachSkills(["JavaScript", "React", "Node.js"])
    setLearnSkills(["Spanish", "Guitar", "Photography"])
  }

  const toggleCategoryExpansion = (categoryName: string) => {
    if (expandedCategories.includes(categoryName)) {
      setExpandedCategories(expandedCategories.filter((name) => name !== categoryName))
    } else {
      setExpandedCategories([...expandedCategories, categoryName])
    }
  }

  const handleSkillTouch = (skill: string, category: "teach" | "learn") => {
    if (category === "teach") {
      toggleTeachSkill(skill)
    } else {
      toggleLearnSkill(skill)
    }
  }

  const totalSkills = teachSkills.length + learnSkills.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(var(--primary)/0.05)] via-background to-[hsl(var(--secondary)/0.05)] flex flex-col max-w-md mx-auto">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[hsl(var(--primary)/0.2)] to-[hsl(var(--secondary)/0.2)] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-[hsl(var(--secondary)/0.2)] to-[hsl(var(--primary)/0.2)] rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <header className="bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.9)] to-[hsl(var(--secondary))] text-primary-foreground p-4 sticky top-0 z-50 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
              <BookOpen className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              E.R.U.D.I.T.E.
            </h1>
          </motion.div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              className="text-primary-foreground text-sm hover:bg-white/20 transition-all backdrop-blur-sm rounded-full px-4"
              onClick={loadDefaultAccount}
            >
              Use Default
            </Button>
            <Button
              variant="ghost"
              className="text-primary-foreground text-sm hover:bg-white/20 transition-all backdrop-blur-sm rounded-full px-4"
              onClick={handleContinue}
            >
              Skip →
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow p-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent mb-2">
            Build Your Learning Profile
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us what you can teach others and what you'd like to learn
          </p>

          {/* Progress Indicator */}
          <motion.div
            className="mt-4 flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-[hsl(var(--primary))]" />
              <span className="text-sm text-muted-foreground">{totalSkills} skills selected</span>
            </div>
            {totalSkills >= 3 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center space-x-1 text-[hsl(var(--primary))]"
              >
                <Check className="h-4 w-4" />
                <span className="text-sm font-medium">Great start!</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 relative"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for any skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-0 bg-card/80 backdrop-blur-sm shadow-lg focus:shadow-xl focus:ring-2 focus:ring-[hsl(var(--primary)/0.5)] rounded-2xl text-base transition-all"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2 text-[hsl(var(--primary))]" />
              Trending Skills
            </h3>
          </div>

          <div className="space-y-3">
            {trendingSkills.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg border border-border/50 overflow-hidden hover:shadow-xl transition-all"
              >
                <div
                  className={`flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r ${category.gradient} bg-opacity-10`}
                  onClick={() => toggleCategoryExpansion(category.name)}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <h4 className="font-semibold text-foreground">{category.name}</h4>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-white/50 rounded-full">
                    <motion.div
                      animate={{ rotate: expandedCategories.includes(category.name) ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>

                <AnimatePresence>
                  {expandedCategories.includes(category.name) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 pt-2">
                          {category.skills.map((skill) => (
                            <motion.div key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                variant={
                                  activeTab === "teach"
                                    ? teachSkills.includes(skill)
                                      ? "default"
                                      : "outline"
                                    : learnSkills.includes(skill)
                                      ? "default"
                                      : "outline"
                                }
                                className={`cursor-pointer transition-all ${
                                  activeTab === "teach"
                                    ? teachSkills.includes(skill)
                                      ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-primary-foreground shadow-lg"
                                      : "hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)]"
                                    : learnSkills.includes(skill)
                                      ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-primary-foreground shadow-lg"
                                      : "hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)]"
                                } py-2 px-3 rounded-full font-medium`}
                                onClick={() => handleSkillTouch(skill, activeTab === "teach" ? "teach" : "learn")}
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tabs defaultValue="teach" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6 rounded-2xl p-1 bg-card/80 backdrop-blur-sm shadow-lg border border-border/50">
              <TabsTrigger
                value="teach"
                className={`rounded-xl transition-all font-semibold ${
                  activeTab === "teach"
                    ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-primary-foreground shadow-lg"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 py-1">
                  <Sparkles className="h-4 w-4" />
                  <span>I Can Teach</span>
                  {teachSkills.length > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-background/90 text-[hsl(var(--primary))] font-bold">
                      {teachSkills.length}
                    </Badge>
                  )}
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="learn"
                className={`rounded-xl transition-all font-semibold ${
                  activeTab === "learn"
                    ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-primary-foreground shadow-lg"
                    : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-2 py-1">
                  <Lightbulb className="h-4 w-4" />
                  <span>I Want to Learn</span>
                  {learnSkills.length > 0 && (
                    <Badge variant="secondary" className="ml-1 bg-background/90 text-[hsl(var(--primary))] font-bold">
                      {learnSkills.length}
                    </Badge>
                  )}
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="teach">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.05)] via-card to-[hsl(var(--secondary)/0.05)] rounded-3xl overflow-hidden backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] pb-6">
                  <CardTitle className="flex items-center gap-3 text-[hsl(var(--primary))] text-xl">
                    <div className="p-2 bg-[hsl(var(--primary))] rounded-full">
                      <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    Skills I Can Teach
                    <div className="ml-auto flex items-center gap-1 text-sm text-[hsl(var(--primary))]">
                      <Users className="h-4 w-4" />
                      <span>Share your expertise</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-3 mb-6 min-h-[60px] p-4 bg-[hsl(var(--primary)/0.05)] rounded-2xl border-2 border-dashed border-[hsl(var(--primary)/0.2)]">
                      <AnimatePresence>
                        {teachSkills.map((skill) => (
                          <motion.div
                            key={skill}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              className="px-4 py-2 flex items-center gap-2 cursor-pointer bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] transition-all text-primary-foreground shadow-lg rounded-full font-medium"
                              onClick={() => toggleTeachSkill(skill)}
                            >
                              {skill}
                              <div className="bg-white/20 rounded-full p-0.5">
                                <Check className="h-3 w-3" />
                              </div>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {teachSkills.length === 0 && (
                        <div className="flex items-center justify-center w-full text-[hsl(var(--primary))]">
                          <Heart className="h-5 w-5 mr-2" />
                          <span className="text-sm font-medium">Select skills you'd love to teach others</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {filteredCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div
                        className="font-semibold mb-3 flex items-center justify-between text-foreground cursor-pointer p-3 rounded-xl hover:bg-[hsl(var(--primary)/0.05)] transition-all"
                        onClick={() => toggleCategoryExpansion(category.name)}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <span className="text-lg">{category.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-[hsl(var(--primary)/0.1)] rounded-full"
                        >
                          <motion.div
                            animate={{ rotate: expandedCategories.includes(category.name) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </div>

                      <AnimatePresence>
                        {expandedCategories.includes(category.name) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-2 pl-12">
                              {category.skills.map((skill) => (
                                <motion.div key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Badge
                                    variant={teachSkills.includes(skill) ? "default" : "outline"}
                                    className={`cursor-pointer transition-all ${
                                      teachSkills.includes(skill)
                                        ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-primary-foreground shadow-lg"
                                        : "hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)]"
                                    } py-2 px-3 rounded-full font-medium`}
                                    onClick={() => handleSkillTouch(skill, "teach")}
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learn">
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-[hsl(var(--primary)/0.05)] via-card to-[hsl(var(--secondary)/0.05)] rounded-3xl overflow-hidden backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] pb-6">
                  <CardTitle className="flex items-center gap-3 text-[hsl(var(--primary))] text-xl">
                    <div className="p-2 bg-[hsl(var(--primary))] rounded-full">
                      <Lightbulb className="h-5 w-5 text-primary-foreground" />
                    </div>
                    Skills I Want to Learn
                    <div className="ml-auto flex items-center gap-1 text-sm text-[hsl(var(--primary))]">
                      <Star className="h-4 w-4" />
                      <span>Expand your horizons</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-3 mb-6 min-h-[60px] p-4 bg-[hsl(var(--primary)/0.05)] rounded-2xl border-2 border-dashed border-[hsl(var(--primary)/0.2)]">
                      <AnimatePresence>
                        {learnSkills.map((skill) => (
                          <motion.div
                            key={skill}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.05 }}
                          >
                            <Badge
                              className="px-4 py-2 flex items-center gap-2 cursor-pointer bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] transition-all text-primary-foreground shadow-lg rounded-full font-medium"
                              onClick={() => toggleLearnSkill(skill)}
                            >
                              {skill}
                              <div className="bg-white/20 rounded-full p-0.5">
                                <Check className="h-3 w-3" />
                              </div>
                            </Badge>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {learnSkills.length === 0 && (
                        <div className="flex items-center justify-center w-full text-[hsl(var(--primary))]">
                          <Lightbulb className="h-5 w-5 mr-2" />
                          <span className="text-sm font-medium">Choose skills you're excited to learn</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {filteredCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      className="mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div
                        className="font-semibold mb-3 flex items-center justify-between text-foreground cursor-pointer p-3 rounded-xl hover:bg-[hsl(var(--primary)/0.05)] transition-all"
                        onClick={() => toggleCategoryExpansion(category.name)}
                      >
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <span className="text-lg">{category.name}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-[hsl(var(--primary)/0.1)] rounded-full"
                        >
                          <motion.div
                            animate={{ rotate: expandedCategories.includes(category.name) ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </Button>
                      </div>

                      <AnimatePresence>
                        {expandedCategories.includes(category.name) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-2 pl-12">
                              {category.skills.map((skill) => (
                                <motion.div key={skill} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Badge
                                    variant={learnSkills.includes(skill) ? "default" : "outline"}
                                    className={`cursor-pointer transition-all ${
                                      learnSkills.includes(skill)
                                        ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-primary-foreground shadow-lg"
                                        : "hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.05)]"
                                    } py-2 px-3 rounded-full font-medium`}
                                    onClick={() => handleSkillTouch(skill, "learn")}
                                  >
                                    {skill}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            onClick={handleContinue}
            disabled={totalSkills < 1}
            className={`w-full flex items-center justify-center py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all font-semibold text-lg ${
              totalSkills >= 3
                ? "bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.9)] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:via-[hsl(var(--primary)/0.8)] hover:to-[hsl(var(--secondary)/0.9)]"
                : "bg-gradient-to-r from-muted to-muted-foreground/20"
            }`}
          >
            <span className="mr-2">
              {totalSkills >= 3 ? "Continue to Communities" : `Select ${3 - totalSkills} more skills`}
            </span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Award className="h-4 w-4 text-[hsl(var(--primary))]" />
            <span>Select at least 3 skills to unlock special features</span>
          </div>
          {totalSkills >= 5 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-2 flex items-center justify-center gap-1 text-[hsl(var(--primary))] font-medium"
            >
              <Sparkles className="h-4 w-4" />
              <span>Amazing! You're ready for advanced matching</span>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
