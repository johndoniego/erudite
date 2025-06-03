"use client"

import React from "react"

import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Users, Search, Globe, Plus, X, Lock, ArrowLeft, Sparkles, TrendingUp, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import CommunityCard from "../components/CommunityCard"
import SortDropdown from "../components/SortDropdown"

// Topic categories for filtering
const TOPIC_CATEGORIES = [
  "Programming",
  "Languages",
  "Arts",
  "Fitness",
  "Business",
  "Science",
  "Lifestyle",
  "Technology",
  "Education",
  "Other",
]

// Common emoji icons for community icons
const COMMON_ICONS = [
  "💻",
  "🌎",
  "🎵",
  "💪",
  "📚",
  "🚀",
  "📷",
  "🍳",
  "📊",
  "🌴",
  "🎮",
  "🎨",
  "🏋️",
  "🧠",
  "🌱",
  "🎬",
  "🔬",
  "🎓",
  "💼",
  "🏠",
]

// Sort options
type SortOption = {
  label: string
  value: string
}

const sortOptions: SortOption[] = [
  { label: "Name (A-Z)", value: "alpha-asc" },
  { label: "Name (Z-A)", value: "alpha-desc" },
  { label: "Most Popular", value: "members-desc" },
  { label: "Newest First", value: "date-desc" },
  { label: "Oldest First", value: "date-asc" },
  { label: "Most Events", value: "events-desc" },
  { label: "Most Active", value: "posts-desc" },
]

// Mock data for communities
const allCommunities = [
  {
    id: "web-dev",
    name: "Web Developers",
    members: 1243,
    icon: "💻",
    topics: ["JavaScript", "React", "CSS"],
    description: "A community for web developers to share knowledge, ask questions, and collaborate on projects.",
    events: 3,
    posts: 127,
    createdAt: "2023-01-15",
    category: "Programming",
  },
  {
    id: "language-exchange",
    name: "Language Exchange",
    members: 856,
    icon: "🌎",
    topics: ["Spanish", "French", "ESL"],
    description: "Practice languages with native speakers and fellow learners in a supportive environment.",
    events: 5,
    posts: 89,
    createdAt: "2023-02-20",
    category: "Languages",
  },
  {
    id: "music-arts",
    name: "Music & Arts",
    members: 721,
    icon: "🎵",
    topics: ["Guitar", "Piano", "Drawing"],
    description: "Share your creative work, get feedback, and learn new artistic skills from others.",
    events: 2,
    posts: 64,
    createdAt: "2023-03-10",
    category: "Arts",
  },
  {
    id: "fitness",
    name: "Fitness Enthusiasts",
    members: 932,
    icon: "💪",
    topics: ["Yoga", "Running", "Nutrition"],
    description: "Connect with others passionate about fitness, share workout routines, and motivate each other.",
    events: 4,
    posts: 103,
    createdAt: "2023-01-05",
    category: "Fitness",
  },
  {
    id: "book-club",
    name: "Book Club",
    members: 543,
    icon: "📚",
    topics: ["Fiction", "Non-Fiction", "Poetry"],
    description: "Discuss books, share recommendations, and participate in monthly reading challenges.",
    events: 1,
    posts: 78,
    createdAt: "2023-04-12",
    category: "Education",
  },
  {
    id: "tech-startups",
    name: "Tech Startups",
    members: 689,
    icon: "🚀",
    topics: ["Entrepreneurship", "Funding", "Product Development"],
    description: "Network with founders, share startup experiences, and discuss the latest in tech innovation.",
    events: 2,
    posts: 91,
    createdAt: "2023-02-28",
    category: "Business",
  },
  {
    id: "photography",
    name: "Photography",
    members: 812,
    icon: "📷",
    topics: ["Landscape", "Portrait", "Editing"],
    description: "Share your photos, get feedback, and learn new photography techniques from fellow enthusiasts.",
    events: 3,
    posts: 115,
    createdAt: "2023-03-22",
    category: "Arts",
  },
  {
    id: "cooking",
    name: "Cooking & Recipes",
    members: 1105,
    icon: "🍳",
    topics: ["Baking", "Vegan", "International Cuisine"],
    description: "Exchange recipes, cooking tips, and food photography in this culinary community.",
    events: 4,
    posts: 132,
    createdAt: "2023-01-30",
    category: "Lifestyle",
  },
]

export default function CommunitiesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("discover")
  const [joinedCommunities, setJoinedCommunities] = useState<string[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("")
  const [communities, setCommunities] = useState(allCommunities)
  const [sortBy, setSortBy] = useState<string>("alpha-asc")

  // Create community state
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createStep, setCreateStep] = useState(1)
  const [newCommunity, setNewCommunity] = useState({
    name: "",
    description: "",
    category: "",
    icon: "🌟",
    topics: [] as string[],
    isPrivate: false,
    requireApproval: false,
    currentTopic: "",
  })
  const [formErrors, setFormErrors] = useState({
    name: "",
    description: "",
    category: "",
    topics: "",
  })

  // Load joined communities from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("erudite-joined-communities")
    if (saved) {
      setJoinedCommunities(JSON.parse(saved))
    }

    // Load custom communities
    const savedCommunities = localStorage.getItem("erudite-communities")
    if (savedCommunities) {
      setCommunities([...JSON.parse(savedCommunities), ...allCommunities])
    }
  }, [])

  // Refresh joined communities list when it might have changed
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem("erudite-joined-communities")
      if (saved) {
        setJoinedCommunities(JSON.parse(saved))
      }
    }

    // Listen for storage changes
    window.addEventListener("storage", handleStorageChange)

    // Check for changes every second (as a fallback)
    const interval = setInterval(() => {
      handleStorageChange()
    }, 1000)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)
  }

  // Clear search
  const clearSearch = () => {
    setSearchTerm("")
  }

  // Navigate to a community page - COMPLETELY SEPARATED from join/unjoin
  const navigateToCommunity = (communityId: string) => {
    router.push(`/communities/${communityId}`)
  }

  // Filter communities based on search term and active filter
  const filterCommunities = (communitiesList: typeof allCommunities) => {
    return communitiesList.filter((community) => {
      // Filter by search term
      const matchesSearch =
        searchTerm === "" ||
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filter by category
      const matchesFilter = activeFilter === "" || community.category === activeFilter

      return matchesSearch && matchesFilter
    })
  }

  // Sort communities based on selected sort option
  const sortCommunities = (communitiesList: typeof allCommunities) => {
    return [...communitiesList].sort((a, b) => {
      switch (sortBy) {
        case "alpha-asc":
          return a.name.localeCompare(b.name)
        case "alpha-desc":
          return b.name.localeCompare(a.name)
        case "members-desc":
          return b.members - a.members
        case "date-desc":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "date-asc":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "events-desc":
          return b.events - a.events
        case "posts-desc":
          return b.posts - a.posts
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }

  // Handle sort option selection
  const handleSortChange = (option: SortOption) => {
    setSortBy(option.value)
  }

  // Apply filters and sorting - make sure this runs when sortBy changes
  const filteredCommunities = React.useMemo(() => {
    const filtered = filterCommunities(communities)
    return sortCommunities(filtered)
  }, [communities, searchTerm, activeFilter, sortBy])

  const myJoinedCommunities = React.useMemo(() => {
    const joined = communities.filter((community) => joinedCommunities.includes(community.id))
    const filtered = filterCommunities(joined)
    return sortCommunities(filtered)
  }, [communities, joinedCommunities, searchTerm, activeFilter, sortBy])

  // Validate current step
  const validateCurrentStep = () => {
    let isValid = true
    const errors = {
      name: "",
      description: "",
      category: "",
      topics: "",
    }

    if (createStep === 1) {
      // Name validation
      if (!newCommunity.name || !newCommunity.name.trim()) {
        errors.name = "Community name is required"
        isValid = false
      } else if (newCommunity.name.trim().length < 3) {
        errors.name = "Name must be at least 3 characters"
        isValid = false
      }

      // Description validation
      if (!newCommunity.description || !newCommunity.description.trim()) {
        errors.description = "Description is required"
        isValid = false
      } else if (newCommunity.description.trim().length < 10) {
        errors.description = "Description must be at least 10 characters"
        isValid = false
      }

      // Category validation
      if (!newCommunity.category || newCommunity.category.trim() === "") {
        errors.category = "Please select a category"
        isValid = false
      }
    } else if (createStep === 2) {
      // Topics validation
      if (!newCommunity.topics || newCommunity.topics.length === 0) {
        errors.topics = "Add at least one topic"
        isValid = false
      }
    }

    setFormErrors(errors)
    return isValid
  }

  // Handle next step
  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCreateStep(createStep + 1)
    }
  }

  // Handle creating a new community
  const handleCreateCommunity = () => {
    console.log("Creating community with data:", newCommunity)

    // Validate all steps before creating
    let isValid = true
    const errors = {
      name: "",
      description: "",
      category: "",
      topics: "",
    }

    // Name validation
    if (!newCommunity.name || !newCommunity.name.trim()) {
      errors.name = "Community name is required"
      isValid = false
    } else if (newCommunity.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters"
      isValid = false
    }

    // Description validation
    if (!newCommunity.description || !newCommunity.description.trim()) {
      errors.description = "Description is required"
      isValid = false
    } else if (newCommunity.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters"
      isValid = false
    }

    // Category validation
    if (!newCommunity.category || newCommunity.category.trim() === "") {
      errors.category = "Please select a category"
      isValid = false
    }

    // Topics validation
    if (!newCommunity.topics || newCommunity.topics.length === 0) {
      errors.topics = "Add at least one topic"
      isValid = false
    }

    setFormErrors(errors)

    if (!isValid) {
      console.log("Validation failed, not creating community")
      return
    }

    try {
      // Create new community
      const id = newCommunity.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      console.log("Generated ID:", id)

      const newCommunityObj = {
        id,
        name: newCommunity.name,
        members: 1, // Start with the creator
        icon: newCommunity.icon,
        topics: newCommunity.topics,
        description: newCommunity.description,
        events: 0,
        posts: 0,
        createdAt: new Date().toISOString().split("T")[0],
        category: newCommunity.category,
        isPrivate: newCommunity.isPrivate,
        requireApproval: newCommunity.requireApproval,
      }

      console.log("New community object:", newCommunityObj)

      // Add to communities list
      const updatedCommunities = [newCommunityObj, ...communities]
      setCommunities(updatedCommunities)
      console.log("Updated communities list")

      // Save to localStorage - merge with existing custom communities
      const existingCustomCommunities = localStorage.getItem("erudite-communities")
        ? JSON.parse(localStorage.getItem("erudite-communities") || "[]")
        : []
      const allCustomCommunities = [...existingCustomCommunities, newCommunityObj]
      localStorage.setItem("erudite-communities", JSON.stringify(allCustomCommunities))
      console.log("Saved to localStorage")

      // Auto-join the new community
      if (!joinedCommunities.includes(id)) {
        const newJoinedCommunities = [...joinedCommunities, id]
        setJoinedCommunities(newJoinedCommunities)
        localStorage.setItem("erudite-joined-communities", JSON.stringify(newJoinedCommunities))
        console.log("Auto-joined community")
      }

      // Reset form and close dialog
      setNewCommunity({
        name: "",
        description: "",
        category: "",
        icon: "🌟",
        topics: [],
        isPrivate: false,
        requireApproval: false,
        currentTopic: "",
      })
      setCreateStep(1)
      setShowCreateDialog(false)
      console.log("Reset form and closed dialog")

      // Remove these lines:
      // console.log("Community created successfully!")
      // alert(`Community "${newCommunity.name}" created successfully!`)

      // Just keep the navigation part:
      console.log("Navigating to community:", `/communities/${id}`)
      router.push(`/communities/${id}`)
    } catch (error) {
      console.error("Error creating community:", error)
      alert("Failed to create community. Please try again.")
    }
  }

  // Handle adding a topic
  const handleAddTopic = () => {
    if (
      newCommunity.currentTopic.trim() !== "" &&
      !newCommunity.topics.includes(newCommunity.currentTopic.trim()) &&
      newCommunity.topics.length < 5
    ) {
      setNewCommunity({
        ...newCommunity,
        topics: [...newCommunity.topics, newCommunity.currentTopic.trim()],
        currentTopic: "",
      })
    }
  }

  // Handle removing a topic
  const handleRemoveTopic = (topic: string) => {
    setNewCommunity({
      ...newCommunity,
      topics: newCommunity.topics.filter((t) => t !== topic),
    })
  }

  // Reset form when dialog closes
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setCreateStep(1)
      setNewCommunity({
        name: "",
        description: "",
        category: "",
        icon: "🌟",
        topics: [],
        isPrivate: false,
        requireApproval: false,
        currentTopic: "",
      })
      setFormErrors({
        name: "",
        description: "",
        category: "",
        topics: "",
      })
    }
    setShowCreateDialog(open)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-[hsl(var(--primary)/0.05)] to-[hsl(var(--secondary)/0.05)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary)/0.1)] via-[hsl(var(--primary)/0.08)] to-[hsl(var(--secondary)/0.1)]" />
        <div className="relative px-4 py-6 sm:py-8 md:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3 sm:space-y-4"
            >
              <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.8)] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                  Communities
                </h1>
                <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
              </div>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Connect with passionate learners, share knowledge, and grow together in vibrant communities
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span>50K+ Members</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span>Growing Daily</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                  <span>Top Rated</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 flex-1">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 sm:h-5 sm:w-5" />
              <Input
                placeholder="Search communities..."
                className="pl-10 sm:pl-12 pr-10 sm:pr-12 w-full sm:w-80 bg-white/80 backdrop-blur-sm border-white/20 shadow-lg focus:shadow-xl transition-all duration-300 h-10 sm:h-auto"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              {searchTerm && (
                <button
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Sort Dropdown - Using the new component */}
            <div className="w-full sm:w-auto">
              <SortDropdown options={sortOptions} value={sortBy} onValueChange={setSortBy} />
            </div>
          </div>

          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-4 sm:px-6 py-2.5 w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            <span className="sm:inline">Create Community</span>
          </Button>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex overflow-x-auto pb-2 gap-2 sm:gap-3 hide-scrollbar">
            <Button
              variant={activeFilter === "" ? "default" : "outline"}
              className={`flex-shrink-0 rounded-full px-4 sm:px-6 py-2 transition-all duration-300 text-sm ${
                activeFilter === ""
                  ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white shadow-md hover:shadow-lg"
              }`}
              onClick={() => setActiveFilter("")}
            >
              All Categories
            </Button>
            {TOPIC_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                className={`flex-shrink-0 rounded-full px-4 sm:px-6 py-2 transition-all duration-300 text-sm ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white shadow-lg"
                    : "bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white shadow-md hover:shadow-lg"
                }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6 sm:mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-sm sm:max-w-md mx-auto grid-cols-2 p-1 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg rounded-xl h-12">
              <TabsTrigger
                value="discover"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--secondary))] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-300 text-sm"
              >
                <Globe className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Discover</span>
                <span className="sm:hidden">All</span>
              </TabsTrigger>
              <TabsTrigger
                value="my-communities"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--secondary))] data-[state=active]:text-white data-[state=active]:shadow-md rounded-lg transition-all duration-300 text-sm"
              >
                <Users className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">My Communities</span>
                <span className="sm:hidden">Mine</span>
                <span className="ml-1">({joinedCommunities.length})</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Tab Content */}
        <div>
          {activeTab === "discover" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCommunities.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8 max-w-md mx-auto"
                  >
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-4 inline-flex mb-6">
                      <Search className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No communities found</h3>
                    <p className="text-muted-foreground mb-6">Try a different search term or filter</p>
                    <Button
                      variant="outline"
                      className="bg-white/80 backdrop-blur-sm border-white/20 hover:bg-white shadow-md hover:shadow-lg transition-all duration-300"
                      onClick={() => {
                        clearSearch()
                        setActiveFilter("")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </motion.div>
                </div>
              ) : (
                filteredCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <CommunityCard community={community} onCardClick={() => navigateToCommunity(community.id)} />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === "my-communities" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {myJoinedCommunities.length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-8 max-w-md mx-auto"
                  >
                    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-full p-4 inline-flex mb-6">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No communities joined yet</h3>
                    <p className="text-muted-foreground mb-6">Join communities to connect with like-minded people</p>
                    <Button
                      onClick={() => setActiveTab("discover")}
                      className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Discover Communities
                    </Button>
                  </motion.div>
                </div>
              ) : (
                myJoinedCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <CommunityCard community={community} onCardClick={() => navigateToCommunity(community.id)} />
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>

        {/* Create Community Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={handleDialogClose}>
          <DialogContent className="max-w-2xl bg-white/95 backdrop-blur-sm border border-white/20 shadow-2xl w-[95vw] sm:w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader className="relative">
              {/* Add close button for mobile */}
              <button
                onClick={() => handleDialogClose(false)}
                className="absolute right-0 top-0 p-2 rounded-full hover:bg-gray-100 transition-colors sm:hidden"
                aria-label="Close dialog"
              >
                <X className="h-5 w-5" />
              </button>

              <DialogTitle className="flex items-center text-xl sm:text-2xl pr-10 sm:pr-0">
                <span className="text-xl sm:text-2xl mr-2 sm:mr-3">
                  {createStep === 1 ? "🚀" : createStep === 2 ? "🏷️" : "🔒"}
                </span>
                Create New Community
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Step {createStep} of 3:
                {createStep === 1 && " Basic Information"}
                {createStep === 2 && " Topics & Icon"}
                {createStep === 3 && " Privacy Settings"}
              </DialogDescription>
            </DialogHeader>

            {/* Progress Bar */}
            <div className="mb-6 w-full">
              <Progress value={(createStep / 3) * 100} className="h-2 bg-gray-200" />
            </div>

            {/* Step 1: Basic Information */}
            {createStep === 1 && (
              <div className="space-y-6 py-4">
                <div className="space-y-3">
                  <Label htmlFor="community-name" className="text-base font-medium">
                    Community Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="community-name"
                    placeholder="e.g., Python Programmers"
                    value={newCommunity.name}
                    onChange={(e) => setNewCommunity({ ...newCommunity, name: e.target.value })}
                    className={`h-12 text-base ${formErrors.name ? "border-red-500" : ""}`}
                  />
                  {formErrors.name && <p className="text-sm text-red-500">{formErrors.name}</p>}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="community-description" className="text-base font-medium">
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="community-description"
                    placeholder="What is your community about?"
                    value={newCommunity.description}
                    onChange={(e) => setNewCommunity({ ...newCommunity, description: e.target.value })}
                    className={`min-h-[120px] text-base ${formErrors.description ? "border-red-500" : ""}`}
                  />
                  {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
                  <p className="text-sm text-muted-foreground">{newCommunity.description.length}/500 characters</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="community-category" className="text-base font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {TOPIC_CATEGORIES.slice(0, 9).map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant={newCommunity.category === category ? "default" : "outline"}
                        className={`justify-start h-12 ${
                          newCommunity.category === category
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                            : ""
                        }`}
                        onClick={() => setNewCommunity({ ...newCommunity, category })}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                  {formErrors.category && <p className="text-sm text-red-500">{formErrors.category}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Topics and Icon */}
            {createStep === 2 && (
              <div className="space-y-6 py-4">
                <div className="space-y-3">
                  <Label htmlFor="community-topics" className="text-base font-medium">
                    Topics <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center space-x-3">
                    <Input
                      id="community-topics"
                      placeholder="Add a topic (e.g., Python, Machine Learning)"
                      value={newCommunity.currentTopic}
                      onChange={(e) => setNewCommunity({ ...newCommunity, currentTopic: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTopic()
                        }
                      }}
                      className="h-12 text-base"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={handleAddTopic}
                      disabled={newCommunity.topics.length >= 5}
                      className="h-12 w-12"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  {formErrors.topics && <p className="text-sm text-red-500">{formErrors.topics}</p>}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {newCommunity.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="flex items-center gap-2 px-3 py-1 text-sm">
                        {topic}
                        <X className="h-4 w-4 cursor-pointer" onClick={() => handleRemoveTopic(topic)} />
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Add up to 5 topics that describe your community</p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="community-icon" className="text-base font-medium">
                    Choose an Icon
                  </Label>
                  <div className="grid grid-cols-5 sm:grid-cols-8 gap-3">
                    {COMMON_ICONS.slice(0, 16).map((icon) => (
                      <Button
                        key={icon}
                        type="button"
                        variant={newCommunity.icon === icon ? "default" : "outline"}
                        className={`h-14 w-14 p-0 text-2xl ${
                          newCommunity.icon === icon
                            ? "bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white"
                            : ""
                        }`}
                        onClick={() => setNewCommunity({ ...newCommunity, icon })}
                      >
                        {icon}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Privacy Settings */}
            {createStep === 3 && (
              <div className="space-y-6 py-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                    <div className="space-y-1">
                      <Label htmlFor="private" className="text-base font-medium">
                        Private Community
                      </Label>
                      <p className="text-sm text-muted-foreground">Only visible to members</p>
                    </div>
                    <Switch
                      id="private"
                      checked={newCommunity.isPrivate}
                      onCheckedChange={(checked) => setNewCommunity({ ...newCommunity, isPrivate: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border">
                    <div className="space-y-1">
                      <Label htmlFor="approval" className="text-base font-medium">
                        Require Approval
                      </Label>
                      <p className="text-sm text-muted-foreground">Approve new members before they can join</p>
                    </div>
                    <Switch
                      id="approval"
                      checked={newCommunity.requireApproval}
                      onCheckedChange={(checked) => setNewCommunity({ ...newCommunity, requireApproval: checked })}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="text-base font-medium mb-2 flex items-center text-blue-800">
                    <Lock className="h-5 w-5 mr-2" /> Community Guidelines
                  </h4>
                  <p className="text-sm text-blue-700">
                    By creating a community, you agree to follow the E.R.U.D.I.T.E. community guidelines. Communities
                    that violate these guidelines may be removed.
                  </p>
                </div>
              </div>
            )}

            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-6">
              {createStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCreateStep(createStep - 1)}
                  className="sm:w-auto w-full h-12"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back
                </Button>
              )}
              {createStep < 3 ? (
                <Button
                  onClick={handleNextStep}
                  className="sm:w-auto w-full h-12 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)]"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleCreateCommunity}
                  className="sm:w-auto w-full h-12 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--secondary)/0.9)]"
                >
                  Create Community
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
