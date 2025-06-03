"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  BookOpen,
  Code,
  Dumbbell,
  Music,
  Search,
  Sparkles,
  X,
  Palette,
  Star,
  Users,
  Clock,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Target,
  Flame,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"

// Define skill categories with enhanced colors and gradients
const categoryColors = {
  tech: {
    bg: "from-blue-500/20 via-cyan-500/15 to-indigo-500/20",
    text: "text-blue-600 dark:text-blue-400",
    icon: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20",
  },
  language: {
    bg: "from-emerald-500/20 via-green-500/15 to-teal-500/20",
    text: "text-emerald-600 dark:text-emerald-400",
    icon: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
    border: "border-emerald-500/30",
    glow: "shadow-emerald-500/20",
  },
  music: {
    bg: "from-purple-500/20 via-violet-500/15 to-fuchsia-500/20",
    text: "text-purple-600 dark:text-purple-400",
    icon: "bg-gradient-to-br from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/30",
    glow: "shadow-purple-500/20",
  },
  fitness: {
    bg: "from-orange-500/20 via-amber-500/15 to-yellow-500/20",
    text: "text-orange-600 dark:text-orange-400",
    icon: "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
    border: "border-orange-500/30",
    glow: "shadow-orange-500/20",
  },
  art: {
    bg: "from-pink-500/20 via-rose-500/15 to-red-500/20",
    text: "text-pink-600 dark:text-pink-400",
    icon: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    glow: "shadow-pink-500/20",
  },
}

// Mock data for trending skills with enhanced data
const trendingSkills = {
  tech: [
    {
      id: "javascript",
      name: "JavaScript",
      count: 1243,
      icon: "💻",
      popularity: 92,
      level: "All Levels",
      trend: "hot",
      growth: "+15%",
    },
    {
      id: "python",
      name: "Python",
      count: 986,
      icon: "🐍",
      popularity: 88,
      level: "Beginner",
      trend: "rising",
      growth: "+22%",
    },
    {
      id: "react",
      name: "React",
      count: 875,
      icon: "⚛️",
      popularity: 85,
      level: "Intermediate",
      trend: "stable",
      growth: "+8%",
    },
    {
      id: "data-science",
      name: "Data Science",
      count: 742,
      icon: "📊",
      popularity: 80,
      level: "Advanced",
      trend: "hot",
      growth: "+28%",
    },
    {
      id: "machine-learning",
      name: "Machine Learning",
      count: 689,
      icon: "🤖",
      popularity: 78,
      level: "Advanced",
      trend: "rising",
      growth: "+35%",
    },
    {
      id: "web-development",
      name: "Web Development",
      count: 632,
      icon: "🌐",
      popularity: 75,
      level: "Beginner",
      trend: "stable",
      growth: "+12%",
    },
  ],
  language: [
    {
      id: "spanish",
      name: "Spanish",
      count: 1567,
      icon: "🇪🇸",
      popularity: 94,
      level: "Beginner",
      trend: "hot",
      growth: "+18%",
    },
    {
      id: "french",
      name: "French",
      count: 1243,
      icon: "🇫🇷",
      popularity: 89,
      level: "Intermediate",
      trend: "stable",
      growth: "+10%",
    },
    {
      id: "japanese",
      name: "Japanese",
      count: 986,
      icon: "🇯🇵",
      popularity: 86,
      level: "All Levels",
      trend: "rising",
      growth: "+25%",
    },
    {
      id: "mandarin",
      name: "Mandarin",
      count: 875,
      icon: "🇨🇳",
      popularity: 82,
      level: "Advanced",
      trend: "hot",
      growth: "+30%",
    },
    {
      id: "german",
      name: "German",
      count: 742,
      icon: "🇩🇪",
      popularity: 79,
      level: "Beginner",
      trend: "stable",
      growth: "+7%",
    },
    {
      id: "italian",
      name: "Italian",
      count: 689,
      icon: "🇮🇹",
      popularity: 76,
      level: "Intermediate",
      trend: "rising",
      growth: "+14%",
    },
  ],
  music: [
    {
      id: "guitar",
      name: "Guitar",
      count: 1243,
      icon: "🎸",
      popularity: 91,
      level: "Beginner",
      trend: "hot",
      growth: "+20%",
    },
    {
      id: "piano",
      name: "Piano",
      count: 986,
      icon: "🎹",
      popularity: 87,
      level: "All Levels",
      trend: "stable",
      growth: "+9%",
    },
    {
      id: "singing",
      name: "Singing",
      count: 875,
      icon: "🎤",
      popularity: 84,
      level: "Intermediate",
      trend: "rising",
      growth: "+16%",
    },
    {
      id: "drums",
      name: "Drums",
      count: 742,
      icon: "🥁",
      popularity: 81,
      level: "Beginner",
      trend: "rising",
      growth: "+19%",
    },
    {
      id: "violin",
      name: "Violin",
      count: 689,
      icon: "🎻",
      popularity: 77,
      level: "Advanced",
      trend: "stable",
      growth: "+5%",
    },
    {
      id: "music-theory",
      name: "Music Theory",
      count: 632,
      icon: "🎼",
      popularity: 74,
      level: "All Levels",
      trend: "rising",
      growth: "+13%",
    },
  ],
  fitness: [
    {
      id: "yoga",
      name: "Yoga",
      count: 1567,
      icon: "🧘",
      popularity: 93,
      level: "All Levels",
      trend: "hot",
      growth: "+24%",
    },
    {
      id: "hiit",
      name: "HIIT",
      count: 1243,
      icon: "🏋️",
      popularity: 90,
      level: "Intermediate",
      trend: "hot",
      growth: "+32%",
    },
    {
      id: "running",
      name: "Running",
      count: 986,
      icon: "🏃",
      popularity: 85,
      level: "Beginner",
      trend: "stable",
      growth: "+11%",
    },
    {
      id: "pilates",
      name: "Pilates",
      count: 875,
      icon: "💪",
      popularity: 83,
      level: "Intermediate",
      trend: "rising",
      growth: "+17%",
    },
    {
      id: "meditation",
      name: "Meditation",
      count: 742,
      icon: "🧠",
      popularity: 80,
      level: "Beginner",
      trend: "hot",
      growth: "+26%",
    },
    {
      id: "nutrition",
      name: "Nutrition",
      count: 689,
      icon: "🥗",
      popularity: 75,
      level: "Advanced",
      trend: "rising",
      growth: "+21%",
    },
  ],
  art: [
    {
      id: "drawing",
      name: "Drawing",
      count: 1243,
      icon: "✏️",
      popularity: 92,
      level: "Beginner",
      trend: "stable",
      growth: "+12%",
    },
    {
      id: "painting",
      name: "Painting",
      count: 986,
      icon: "🎨",
      popularity: 88,
      level: "All Levels",
      trend: "rising",
      growth: "+15%",
    },
    {
      id: "photography",
      name: "Photography",
      count: 875,
      icon: "📷",
      popularity: 86,
      level: "Intermediate",
      trend: "hot",
      growth: "+23%",
    },
    {
      id: "digital-art",
      name: "Digital Art",
      count: 742,
      icon: "🖌️",
      popularity: 82,
      level: "Advanced",
      trend: "hot",
      growth: "+29%",
    },
    {
      id: "sculpture",
      name: "Sculpture",
      count: 689,
      icon: "🗿",
      popularity: 78,
      level: "Intermediate",
      trend: "stable",
      growth: "+8%",
    },
    {
      id: "animation",
      name: "Animation",
      count: 632,
      icon: "🎬",
      popularity: 76,
      level: "All Levels",
      trend: "rising",
      growth: "+18%",
    },
  ],
}

// Enhanced skill paths with more visual appeal
const skillPaths = [
  {
    id: "web-dev-path",
    title: "Full Stack Web Developer",
    description: "Master modern web development from frontend to backend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    learners: 2547,
    duration: "3-4 months",
    level: "Beginner to Intermediate",
    category: "tech",
    progress: 65,
    difficulty: "Medium",
    rating: 4.8,
    completionRate: 78,
  },
  {
    id: "data-science-path",
    title: "Data Science Mastery",
    description: "Transform data into insights with Python and machine learning",
    skills: ["Python", "Statistics", "Machine Learning", "SQL", "Pandas", "Visualization"],
    learners: 1876,
    duration: "4-6 months",
    level: "Intermediate to Advanced",
    category: "tech",
    progress: 32,
    difficulty: "Hard",
    rating: 4.9,
    completionRate: 65,
  },
  {
    id: "language-path",
    title: "Spanish Fluency Journey",
    description: "Achieve conversational fluency in Spanish",
    skills: ["Vocabulary", "Grammar", "Conversation", "Culture", "Pronunciation", "Writing"],
    learners: 1543,
    duration: "6-8 months",
    level: "Beginner to Advanced",
    category: "language",
    progress: 78,
    difficulty: "Medium",
    rating: 4.7,
    completionRate: 82,
  },
]

// Enhanced recommended skills
const recommendedSkills = [
  {
    id: "react-advanced",
    name: "Advanced React Patterns",
    icon: "⚛️",
    reason: "Based on your JavaScript experience",
    category: "tech",
    match: 95,
    timeToComplete: "2-3 weeks",
    difficulty: "Advanced",
  },
  {
    id: "spanish-conversation",
    name: "Spanish Conversation Practice",
    icon: "🇪🇸",
    reason: "Matches your language learning goals",
    category: "language",
    match: 92,
    timeToComplete: "4-6 weeks",
    difficulty: "Intermediate",
  },
  {
    id: "music-composition",
    name: "Music Composition",
    icon: "🎼",
    reason: "Complements your piano skills",
    category: "music",
    match: 88,
    timeToComplete: "6-8 weeks",
    difficulty: "Advanced",
  },
]

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "hot":
      return <Flame className="h-3 w-3 text-red-500" />
    case "rising":
      return <TrendingUp className="h-3 w-3 text-green-500" />
    default:
      return <Target className="h-3 w-3 text-blue-500" />
  }
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600 bg-green-100 dark:bg-green-900/30"
    case "Medium":
      return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
    case "Hard":
      return "text-red-600 bg-red-100 dark:bg-red-900/30"
    default:
      return "text-gray-600 bg-gray-100 dark:bg-gray-900/30"
  }
}

export default function SkillsPage() {
  const [activeSkillTab, setActiveSkillTab] = useState("tech")
  const [searchQuery, setSearchQuery] = useState("")
  const [animateCards, setAnimateCards] = useState(false)
  const router = useRouter()

  // Trigger animation after initial render
  useEffect(() => {
    setAnimateCards(true)
  }, [])

  // Filter skills based on search query
  const filteredSkills = Object.entries(trendingSkills).reduce(
    (acc, [category, skills]) => {
      const filtered = skills.filter((skill) => skill.name.toLowerCase().includes(searchQuery.toLowerCase()))
      if (filtered.length > 0) {
        acc[category] = filtered
      }
      return acc
    },
    {} as Record<string, (typeof trendingSkills)["tech"]>,
  )

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  const floatingVariants = {
    animate: {
      y: [-2, 2, -2],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="mobile-app">
      <Header />
      <main className="main-content pb-6">
        <div className="page-content">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="card-container"
          >
            {/* Enhanced Page Header with Animated Background */}
            <div className="relative overflow-hidden rounded-2xl mb-4 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] via-[hsl(var(--primary))]/80 to-[hsl(var(--primary))]/60"></div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent"></div>

              {/* Floating Elements */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"
              ></motion.div>
              <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: "1s" }}
                className="absolute bottom-6 left-6 w-12 h-12 bg-white/15 rounded-full blur-lg"
              ></motion.div>

              <div className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <motion.div
                      className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl mr-4 shadow-lg border border-white/30"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Sparkles className="h-6 w-6 text-white" />
                    </motion.div>
                    <div>
                      <h1 className="text-2xl font-bold text-white mb-1">Explore Skills</h1>
                      <p className="text-white/80 text-sm">Discover new skills and accelerate your learning journey</p>
                    </div>
                  </div>
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm p-2 rounded-xl border border-white/30"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Award className="h-5 w-5 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Enhanced Search Bar */}
            <div className="relative mb-4">
              <motion.div
                className="relative"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/5 rounded-xl blur-sm"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search for any skill..."
                    className="w-full pl-12 pr-12 py-4 rounded-xl border border-border/50 bg-background/90 backdrop-blur-sm text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]/30 focus:border-[hsl(var(--primary))]/50 transition-all shadow-lg hover:shadow-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground bg-muted/50 rounded-full p-1 hover:bg-muted transition-colors"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Enhanced Trending Skills Section */}
            <motion.div
              className="bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl mb-6 overflow-hidden"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 border-b border-border/30 bg-gradient-to-r from-[hsl(var(--primary))]/5 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-[hsl(var(--primary))]/10 p-2 rounded-lg mr-3">
                      <TrendingUp className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Trending Skills</h2>
                      <p className="text-xs text-muted-foreground">Most popular skills this week</p>
                    </div>
                  </div>
                  <Badge className="bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/20">
                    <Flame className="h-3 w-3 mr-1" />
                    Hot
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <Tabs value={activeSkillTab} onValueChange={setActiveSkillTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-5 mb-4 p-1 bg-muted/30 backdrop-blur-sm h-12 rounded-xl border border-border/30">
                    {Object.entries(categoryColors).map(([category, colors]) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className={`data-[state=active]:shadow-lg text-xs py-2 h-10 data-[state=active]:${colors.text} transition-all duration-300 data-[state=active]:bg-background rounded-lg font-medium`}
                      >
                        <div className="flex items-center gap-1.5">
                          {category === "tech" && <Code className="h-4 w-4" />}
                          {category === "language" && <BookOpen className="h-4 w-4" />}
                          {category === "music" && <Music className="h-4 w-4" />}
                          {category === "fitness" && <Dumbbell className="h-4 w-4" />}
                          {category === "art" && <Palette className="h-4 w-4" />}
                          <span className="hidden sm:inline">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </span>
                        </div>
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <AnimatePresence mode="wait">
                    {Object.entries(filteredSkills).length > 0 ? (
                      Object.entries(filteredSkills).map(([category, skills]) => (
                        <TabsContent key={category} value={category} className="mt-0">
                          <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate={animateCards ? "show" : "hidden"}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                          >
                            {skills.map((skill, index) => (
                              <motion.div
                                key={skill.id}
                                variants={itemVariants}
                                whileHover={{
                                  scale: 1.03,
                                  y: -4,
                                  transition: { duration: 0.2 },
                                }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative overflow-hidden border rounded-2xl p-4 transition-all shadow-lg hover:shadow-2xl cursor-pointer group bg-gradient-to-br ${categoryColors[category as keyof typeof categoryColors].bg} ${categoryColors[category as keyof typeof categoryColors].border} hover:border-[hsl(var(--primary))]/40`}
                                onClick={() => router.push(`/skill/${skill.id}`)}
                                style={{
                                  animationDelay: `${index * 0.1}s`,
                                }}
                              >
                                {/* Animated background gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 via-transparent to-[hsl(var(--primary))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div className="relative z-10">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center">
                                      <motion.div
                                        className={`text-xl mr-3 h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg border border-border/30 ${categoryColors[category as keyof typeof categoryColors].icon} backdrop-blur-sm`}
                                        whileHover={{ rotate: 10, scale: 1.1 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                      >
                                        {skill.icon}
                                      </motion.div>
                                      <div className="flex-1">
                                        <h3 className="font-semibold text-sm mb-1">{skill.name}</h3>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                          <Users className="h-3 w-3" />
                                          <span>{skill.count.toLocaleString()}</span>
                                          <div className="flex items-center gap-1">
                                            {getTrendIcon(skill.trend)}
                                            <span className="text-xs font-medium">{skill.growth}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <motion.div
                                      whileHover={{ scale: 1.1, rotate: 90 }}
                                      transition={{ type: "spring", stiffness: 300 }}
                                    >
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="rounded-full h-8 w-8 p-0 opacity-70 group-hover:opacity-100 group-hover:bg-[hsl(var(--primary))]/10 transition-all"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          router.push(`/skill/${skill.id}`)
                                        }}
                                      >
                                        <ArrowRight className="h-4 w-4" />
                                      </Button>
                                    </motion.div>
                                  </div>

                                  <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                      <Badge
                                        variant="outline"
                                        className="text-[10px] py-0.5 px-2 h-5 bg-background/80 backdrop-blur-sm border-border/50"
                                      >
                                        {skill.level}
                                      </Badge>
                                      <span
                                        className={`text-xs font-bold ${categoryColors[category as keyof typeof categoryColors].text}`}
                                      >
                                        {skill.popularity}%
                                      </span>
                                    </div>

                                    <div className="relative">
                                      <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${skill.popularity}%` }}
                                          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                                          className={`h-full rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors].bg} shadow-sm`}
                                        ></motion.div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Hover glow effect */}
                                <div
                                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${categoryColors[category as keyof typeof categoryColors].glow} shadow-2xl`}
                                ></div>
                              </motion.div>
                            ))}
                          </motion.div>
                        </TabsContent>
                      ))
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="py-12 text-center"
                      >
                        <motion.div
                          className="mx-auto w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 shadow-lg"
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Search className="h-10 w-10 text-muted-foreground" />
                        </motion.div>
                        <h3 className="text-lg font-semibold mb-2">No skills found</h3>
                        <p className="text-sm text-muted-foreground">
                          Try a different search term or explore our categories
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Tabs>
              </div>
            </motion.div>

            {/* Enhanced Learning Paths Section */}
            <motion.div
              className="bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl mb-6 overflow-hidden"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 border-b border-border/30 bg-gradient-to-r from-[hsl(var(--primary))]/5 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-[hsl(var(--primary))]/10 p-2 rounded-lg mr-3">
                      <Target className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Learning Paths</h2>
                      <p className="text-xs text-muted-foreground">Structured journeys to master skills</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--primary))]/5 text-[hsl(var(--primary))] border-[hsl(var(--primary))]/20">
                    <Zap className="h-3 w-3 mr-1" />
                    Curated
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={animateCards ? "show" : "hidden"}
                  className="space-y-4"
                >
                  {skillPaths.map((path, index) => (
                    <motion.div
                      key={path.id}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden border rounded-2xl p-5 transition-all shadow-lg hover:shadow-2xl cursor-pointer group bg-gradient-to-br ${categoryColors[path.category as keyof typeof categoryColors].bg} ${categoryColors[path.category as keyof typeof categoryColors].border} hover:border-[hsl(var(--primary))]/40`}
                      onClick={() => router.push(`/skill-path/${path.id}`)}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 via-transparent to-[hsl(var(--primary))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start">
                            <motion.div
                              className={`p-3 rounded-xl mr-4 shadow-lg ${categoryColors[path.category as keyof typeof categoryColors].icon} backdrop-blur-sm border border-border/30`}
                              whileHover={{ rotate: 5, scale: 1.05 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {path.category === "tech" && <Code className="h-6 w-6 text-[hsl(var(--primary))]" />}
                              {path.category === "language" && <BookOpen className="h-6 w-6 text-emerald-500" />}
                              {path.category === "music" && <Music className="h-6 w-6 text-purple-500" />}
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-base">{path.title}</h3>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                                  <span className="text-xs font-medium">{path.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{path.description}</p>

                              <div className="flex flex-wrap gap-1.5 mb-4">
                                {path.skills.slice(0, 4).map((skill, skillIndex) => (
                                  <motion.div
                                    key={skillIndex}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: skillIndex * 0.1 }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="text-xs bg-background/80 border border-border/50 backdrop-blur-sm hover:bg-[hsl(var(--primary))]/10 transition-colors"
                                    >
                                      {skill}
                                    </Badge>
                                  </motion.div>
                                ))}
                                {path.skills.length > 4 && (
                                  <Badge variant="outline" className="text-xs bg-background/50">
                                    +{path.skills.length - 4} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="rounded-full h-10 w-10 p-0 opacity-70 group-hover:opacity-100 group-hover:bg-[hsl(var(--primary))]/10 transition-all"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/skill-path/${path.id}`)
                              }}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </motion.div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Learners</span>
                              </div>
                              <span className="font-medium">{path.learners.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">Duration</span>
                              </div>
                              <span className="font-medium">{path.duration}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Difficulty</span>
                              <Badge className={`text-[10px] ${getDifficultyColor(path.difficulty)}`}>
                                {path.difficulty}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Completion</span>
                              <span className="font-medium">{path.completionRate}%</span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Your progress</span>
                            <span className="font-bold text-[hsl(var(--primary))]">{path.progress}%</span>
                          </div>
                          <div className="relative">
                            <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${path.progress}%` }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                                className="h-full rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))]/80 shadow-sm"
                              ></motion.div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${categoryColors[path.category as keyof typeof categoryColors].glow} shadow-2xl`}
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Recommended For You Section */}
            <motion.div
              className="bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl overflow-hidden"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-4 border-b border-border/30 bg-gradient-to-r from-[hsl(var(--primary))]/5 to-transparent">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-[hsl(var(--primary))]/10 p-2 rounded-lg mr-3">
                      <Sparkles className="h-5 w-5 text-[hsl(var(--primary))]" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">Recommended For You</h2>
                      <p className="text-xs text-muted-foreground">Personalized skill suggestions</p>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 text-yellow-600 border-yellow-500/20">
                    <Star className="h-3 w-3 mr-1 fill-yellow-500" />
                    AI Picked
                  </Badge>
                </div>
              </div>

              <div className="p-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate={animateCards ? "show" : "hidden"}
                  className="space-y-3"
                >
                  {recommendedSkills.map((skill, index) => (
                    <motion.div
                      key={skill.id}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative overflow-hidden border rounded-2xl p-4 transition-all shadow-lg hover:shadow-2xl cursor-pointer group bg-gradient-to-br ${categoryColors[skill.category as keyof typeof categoryColors].bg} ${categoryColors[skill.category as keyof typeof categoryColors].border} hover:border-[hsl(var(--primary))]/40`}
                      onClick={() => router.push(`/skill/${skill.id}`)}
                    >
                      {/* Animated background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))]/5 via-transparent to-[hsl(var(--primary))]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative z-10">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <motion.div
                              className={`text-xl mr-4 h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg border border-border/30 ${categoryColors[skill.category as keyof typeof categoryColors].icon} backdrop-blur-sm`}
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              {skill.icon}
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-sm">{skill.name}</h3>
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }}>
                                  <Badge
                                    className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 dark:text-yellow-400 border-yellow-500/30 text-[10px] px-2 py-0.5"
                                    variant="outline"
                                  >
                                    <Star className="h-2.5 w-2.5 mr-1 fill-yellow-500" />
                                    {skill.match}% Match
                                  </Badge>
                                </motion.div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{skill.reason}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{skill.timeToComplete}</span>
                                </div>
                                <Badge className={`text-[10px] ${getDifficultyColor(skill.difficulty)}`}>
                                  {skill.difficulty}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="rounded-full h-10 w-10 p-0 opacity-70 group-hover:opacity-100 group-hover:bg-[hsl(var(--primary))]/10 transition-all"
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/skill/${skill.id}`)
                              }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>

                      {/* Hover glow effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${categoryColors[skill.category as keyof typeof categoryColors].glow} shadow-2xl`}
                      ></div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
