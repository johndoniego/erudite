"use client"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Search,
  UserPlus,
  MessageSquare,
  UserX,
  ChevronDown,
  Check,
  ArrowUpDown,
  Star,
  MapPin,
  Clock,
  Calendar,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PersonDetail, type FeaturedPerson } from "@/app/components/PersonDetail"

// Current user profile for match calculations
const currentUser = {
  name: "Current User",
  skills: ["JavaScript", "React", "UI Design", "Teaching"],
  interests: ["Web Development", "Education", "Design Systems", "Open Source"],
  learningGoals: ["Python", "Machine Learning", "Public Speaking"],
  location: "San Francisco",
  availability: ["weekday-evenings", "weekend-mornings"],
  preferredTopics: ["Programming", "Design", "Education"],
}

// Sample data for friends
const friendsData = [
  {
    id: "1",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40&text=EW",
    bio: "Math Teacher | Piano Enthusiast",
    skills: ["Mathematics", "Music Theory", "Piano"],
    lastActive: "2 hours ago",
    lastActiveTime: 2 * 60 * 60, // 2 hours in seconds
    status: "online",
    dateAdded: "2023-01-15",
    interests: ["Classical Music", "Number Theory", "Chess"],
    learningGoals: ["Jazz Piano", "Statistics", "Teaching Methods"],
    location: "Boston",
    availability: ["weekday-mornings", "weekend-afternoons"],
    posts: [
      {
        id: "p1",
        content:
          "Just finished teaching a great class on calculus! So rewarding to see students have those 'aha' moments.",
        timestamp: "2 days ago",
        likes: 24,
        comments: 5,
        tags: ["teaching", "math", "calculus"],
      },
      {
        id: "p2",
        content: "Looking for recommendations on piano pieces for intermediate players. Any suggestions?",
        timestamp: "1 week ago",
        likes: 18,
        comments: 12,
        tags: ["music", "piano", "recommendations"],
      },
    ],
    featured: "Math Expert",
    rating: 4.8,
  },
  {
    id: "2",
    name: "James Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40&text=JR",
    bio: "Software Engineer | Language Learner",
    skills: ["Programming", "Spanish", "UI Design"],
    lastActive: "5 minutes ago",
    lastActiveTime: 5 * 60, // 5 minutes in seconds
    status: "online",
    dateAdded: "2023-03-22",
    interests: ["Web Development", "Language Exchange", "Travel"],
    learningGoals: ["React Native", "Portuguese", "UX Research"],
    location: "San Francisco",
    availability: ["weekday-evenings", "weekend-mornings"],
    posts: [
      {
        id: "p3",
        content: "Just deployed my first React Native app! The learning curve was steep but totally worth it.",
        timestamp: "3 days ago",
        likes: 42,
        comments: 8,
        tags: ["coding", "reactnative", "mobiledev"],
      },
    ],
    featured: "Tech Mentor",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=MJ",
    bio: "History Professor | Cooking Enthusiast",
    skills: ["History", "Culinary Arts", "Literature"],
    lastActive: "1 day ago",
    lastActiveTime: 24 * 60 * 60, // 1 day in seconds
    status: "offline",
    dateAdded: "2022-11-05",
    interests: ["Ancient Civilizations", "Gourmet Cooking", "Classic Literature"],
    learningGoals: ["Digital Archiving", "French Cuisine", "Creative Writing"],
    location: "Chicago",
    availability: ["weekday-afternoons", "weekend-evenings"],
    posts: [
      {
        id: "p4",
        content:
          "Just finished my research paper on the economic impacts of the Roman Empire's trade routes. Fascinating how many modern economic principles were already in practice!",
        timestamp: "5 days ago",
        likes: 31,
        comments: 7,
        tags: ["history", "research", "economics"],
      },
      {
        id: "p5",
        content: "Made an authentic paella tonight using my grandmother's recipe. The secret is in the saffron!",
        timestamp: "2 weeks ago",
        likes: 56,
        comments: 14,
        tags: ["cooking", "spanish", "recipes"],
      },
    ],
    featured: "History Buff",
    rating: 4.9,
  },
]

// Sample data for friend requests
const friendRequestsData = [
  {
    id: "7",
    name: "Aisha Patel",
    avatar: "/placeholder.svg?height=40&width=40&text=AP",
    bio: "Chemistry Teacher | Yoga Instructor",
    skills: ["Chemistry", "Yoga", "Meditation"],
    mutualConnections: 6,
    requestTime: "2 days ago",
    requestDate: "2023-05-08", // 2 days ago
    interests: ["Molecular Biology", "Mindfulness", "Sustainable Living"],
    learningGoals: ["Advanced Yoga Poses", "Organic Chemistry", "Teaching Online"],
    location: "Portland",
    availability: ["weekday-mornings", "weekend-afternoons"],
    posts: [
      {
        id: "p6",
        content:
          "Just finished teaching a workshop on the chemistry of everyday cooking. It's amazing how science makes food delicious!",
        timestamp: "1 week ago",
        likes: 28,
        comments: 9,
        tags: ["chemistry", "cooking", "science"],
      },
    ],
    featured: "Science Educator",
    rating: 4.6,
  },
  {
    id: "8",
    name: "Thomas Wright",
    avatar: "/placeholder.svg?height=40&width=40&text=TW",
    bio: "English Literature | Poetry Writer",
    skills: ["Literature", "Poetry", "Creative Writing"],
    mutualConnections: 3,
    requestTime: "5 hours ago",
    requestDate: "2023-05-10", // 5 hours ago
    interests: ["Victorian Literature", "Modern Poetry", "Literary Analysis"],
    learningGoals: ["Publishing", "Public Speaking", "Digital Marketing"],
    location: "New York",
    availability: ["weekday-evenings", "weekend-mornings"],
    posts: [
      {
        id: "p7",
        content: "Just published my new collection of poems 'Whispers of Dawn'. So grateful for this creative journey!",
        timestamp: "3 days ago",
        likes: 47,
        comments: 15,
        tags: ["poetry", "writing", "creativity"],
      },
    ],
    featured: "Published Poet",
    rating: 4.8,
  },
  {
    id: "9",
    name: "Leila Nguyen",
    avatar: "/placeholder.svg?height=40&width=40&text=LN",
    bio: "Data Scientist | Marathon Runner",
    skills: ["Statistics", "Machine Learning", "Python"],
    mutualConnections: 4,
    requestTime: "Just now",
    requestDate: "2023-05-10T12:00:00", // Just now
    interests: ["AI Ethics", "Long-distance Running", "Data Visualization"],
    learningGoals: ["Deep Learning", "Ultra Marathons", "Public Speaking"],
    location: "Seattle",
    availability: ["weekday-evenings", "weekend-mornings"],
    posts: [
      {
        id: "p8",
        content: "Just completed my first marathon in under 4 hours! All those months of training finally paid off.",
        timestamp: "2 days ago",
        likes: 83,
        comments: 21,
        tags: ["running", "marathon", "fitness"],
      },
      {
        id: "p9",
        content:
          "Excited to share my new article on ethical considerations in machine learning algorithms. Link in bio!",
        timestamp: "1 week ago",
        likes: 62,
        comments: 17,
        tags: ["AI", "ethics", "datascience"],
      },
    ],
    featured: "AI Specialist",
    rating: 4.9,
  },
]

// Sample data for discover - without predefined match percentages
const rawDiscoverData = [
  {
    id: "3",
    name: "Sophia Chen",
    avatar: "/placeholder.svg?height=40&width=40&text=SC",
    bio: "Physics PhD | Chess Player",
    skills: ["Physics", "Chess", "Research", "Teaching"],
    mutualConnections: 2,
    interests: ["Quantum Mechanics", "Strategic Games", "Science Communication"],
    learningGoals: ["Programming", "Public Speaking", "Grant Writing"],
    location: "San Francisco",
    availability: ["weekday-evenings", "weekend-afternoons"],
    posts: [
      {
        id: "p10",
        content: "Just published my research on quantum entanglement in the Journal of Physics. So proud of this work!",
        timestamp: "4 days ago",
        likes: 56,
        comments: 13,
        tags: ["physics", "quantum", "research"],
      },
    ],
    featured: "Quantum Expert",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Olivia Parker",
    avatar: "/placeholder.svg?height=40&width=40&text=OP",
    bio: "Art Teacher | Digital Illustrator",
    skills: ["Art", "Digital Design", "Photography", "Teaching"],
    mutualConnections: 4,
    interests: ["Modern Art", "Digital Painting", "Art History", "Design Systems"],
    learningGoals: ["UI Design", "Web Development", "Animation"],
    location: "Los Angeles",
    availability: ["weekday-afternoons", "weekend-mornings"],
    posts: [
      {
        id: "p11",
        content:
          "Just finished a commission for a children's book illustration. Love bringing stories to life through art!",
        timestamp: "1 day ago",
        likes: 72,
        comments: 18,
        tags: ["art", "illustration", "digitalart"],
      },
      {
        id: "p12",
        content: "Hosting a workshop on digital illustration basics this weekend. Perfect for beginners!",
        timestamp: "5 days ago",
        likes: 34,
        comments: 9,
        tags: ["workshop", "teaching", "digitalart"],
      },
    ],
    featured: "Creative Artist",
    rating: 4.8,
  },
  {
    id: "6",
    name: "David Kim",
    avatar: "/placeholder.svg?height=40&width=40&text=DK",
    bio: "Biology Researcher | Hiking Guide",
    skills: ["Biology", "Ecology", "Outdoor Skills", "Photography"],
    mutualConnections: 1,
    interests: ["Conservation", "Wildlife Photography", "Mountain Climbing"],
    learningGoals: ["Data Analysis", "Scientific Writing", "Web Design"],
    location: "Denver",
    availability: ["weekday-mornings", "weekend-all-day"],
    posts: [
      {
        id: "p13",
        content:
          "Just returned from a research expedition in the Amazon rainforest. The biodiversity is simply breathtaking!",
        timestamp: "1 week ago",
        likes: 91,
        comments: 27,
        tags: ["biology", "research", "amazon"],
      },
    ],
    featured: "Nature Expert",
    rating: 4.9,
  },
  {
    id: "10",
    name: "Michael Torres",
    avatar: "/placeholder.svg?height=40&width=40&text=MT",
    bio: "Economics Professor | Chess Enthusiast",
    skills: ["Economics", "Chess", "Public Speaking", "Data Analysis"],
    mutualConnections: 5,
    interests: ["Behavioral Economics", "Strategy Games", "Financial Literacy"],
    learningGoals: ["Programming", "Machine Learning", "UI Design"],
    location: "Chicago",
    availability: ["weekday-evenings", "weekend-afternoons"],
    posts: [
      {
        id: "p14",
        content: "Just published my new paper on behavioral economics in emerging markets. Fascinating trends!",
        timestamp: "3 days ago",
        likes: 43,
        comments: 11,
        tags: ["economics", "research", "markets"],
      },
    ],
    featured: "Economics Guru",
    rating: 4.6,
  },
  {
    id: "11",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    bio: "Graphic Designer | Yoga Teacher",
    skills: ["Design", "Illustration", "Yoga", "UI Design", "React"],
    mutualConnections: 3,
    interests: ["Typography", "Mindfulness", "Sustainable Design", "Web Development"],
    learningGoals: ["Advanced JavaScript", "Animation", "Teaching Online"],
    location: "San Francisco",
    availability: ["weekday-evenings", "weekend-mornings"],
    posts: [
      {
        id: "p15",
        content: "Just redesigned my portfolio website with a focus on accessibility. Design should be for everyone!",
        timestamp: "2 days ago",
        likes: 58,
        comments: 14,
        tags: ["design", "accessibility", "portfolio"],
      },
      {
        id: "p16",
        content: "Leading a sunrise yoga session at the beach this Saturday. Come find your zen with me!",
        timestamp: "4 days ago",
        likes: 37,
        comments: 8,
        tags: ["yoga", "wellness", "mindfulness"],
      },
    ],
    featured: "Design & Wellness",
    rating: 4.7,
  },
]

// Function to calculate match percentage between current user and another person
function calculateMatchPercentage(person: any) {
  let totalScore = 0
  let maxPossibleScore = 0

  // 1. Skill overlap (what they can teach you)
  const skillOverlap = person.skills.filter((skill) => currentUser.learningGoals.includes(skill)).length
  const skillScore = skillOverlap * 15 // Each matching skill is worth 15 points
  totalScore += skillScore
  maxPossibleScore += Math.max(currentUser.learningGoals.length, person.skills.length) * 15

  // 2. Learning goals overlap (what you can teach them)
  const learningOverlap = person.learningGoals.filter((goal) => currentUser.skills.includes(goal)).length
  const learningScore = learningOverlap * 15 // Each matching learning goal is worth 15 points
  totalScore += skillScore
  maxPossibleScore += Math.max(currentUser.skills.length, person.learningGoals.length) * 15

  // 3. Interest similarity
  const interestOverlap = person.interests.filter((interest) => currentUser.interests.includes(interest)).length
  const interestScore = interestOverlap * 10 // Each matching interest is worth 10 points
  totalScore += interestScore
  maxPossibleScore += Math.max(currentUser.interests.length, person.interests.length) * 10

  // 4. Location proximity
  const locationScore = person.location === currentUser.location ? 20 : 0
  totalScore += locationScore
  maxPossibleScore += 20

  // 5. Availability compatibility
  const availabilityOverlap = person.availability.filter((time) => currentUser.availability.includes(time)).length
  const availabilityScore = availabilityOverlap * 10 // Each matching availability slot is worth 10 points
  totalScore += availabilityScore
  maxPossibleScore += Math.max(currentUser.availability.length, person.availability.length) * 10

  // Calculate final percentage
  const matchPercentage = Math.round((totalScore / maxPossibleScore) * 100)

  // Ensure percentage is between 0 and 100
  return Math.min(100, Math.max(0, matchPercentage))
}

// Process discover data to add calculated match percentages
const discoverData = rawDiscoverData.map((person) => ({
  ...person,
  matchPercentage: calculateMatchPercentage(person),
}))

// Sort options for each tab
const sortOptions = {
  friends: [
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
    { value: "last-active", label: "Last Active" },
    { value: "recently-added", label: "Recently Added" },
  ],
  requests: [
    { value: "recent", label: "Most Recent" },
    { value: "oldest", label: "Oldest First" },
    { value: "mutual-desc", label: "Most Mutual Friends" },
    { value: "mutual-asc", label: "Least Mutual Friends" },
  ],
  discover: [
    { value: "match-desc", label: "Highest Match" },
    { value: "match-asc", label: "Lowest Match" },
    { value: "mutual-desc", label: "Most Mutual Friends" },
    { value: "mutual-asc", label: "Least Mutual Friends" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
  ],
}

// Session storage key for scheduled sessions
const SCHEDULED_SESSIONS_KEY = "erudite_scheduled_sessions"

// Function to save a session to localStorage
const saveSession = (session) => {
  // Get existing sessions or initialize empty array
  const existingSessions = JSON.parse(localStorage.getItem(SCHEDULED_SESSIONS_KEY) || "[]")

  // Add new session
  existingSessions.push(session)

  // Save back to localStorage
  localStorage.setItem(SCHEDULED_SESSIONS_KEY, JSON.stringify(existingSessions))
}

export default function PeoplePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [friends, setFriends] = useState(friendsData)
  const [friendRequests, setFriendRequests] = useState(friendRequestsData)
  const [discover, setDiscover] = useState(discoverData)
  const [activeTab, setActiveTab] = useState("friends")
  const [selectedPerson, setSelectedPerson] = useState<FeaturedPerson | null>(null)
  const [showPersonDetail, setShowPersonDetail] = useState(false)
  const [showMessaging, setShowMessaging] = useState(false)
  const [showScheduling, setShowScheduling] = useState(false)
  const [selectedPersonForAction, setSelectedPersonForAction] = useState<any>(null)
  const [schedulingSuccess, setSchedulingSuccess] = useState(false)

  // Refs for form fields
  const skillRef = useRef<HTMLSelectElement>(null)
  const dateRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLSelectElement>(null)
  const durationRef = useRef<HTMLSelectElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const locationRef = useRef<HTMLSelectElement>(null)

  // Sort states
  const [friendsSort, setFriendsSort] = useState("name-asc")
  const [requestsSort, setRequestsSort] = useState("recent")
  const [discoverSort, setDiscoverSort] = useState("match-desc")

  const handleAcceptRequest = (id: string) => {
    const acceptedRequest = friendRequests.find((request) => request.id === id)
    if (acceptedRequest) {
      setFriends([
        ...friends,
        {
          ...acceptedRequest,
          status: "online",
          lastActive: "Just now",
          lastActiveTime: 0,
          dateAdded: new Date().toISOString().split("T")[0],
        },
      ])
      setFriendRequests(friendRequests.filter((request) => request.id !== id))
    }
  }

  const handleRejectRequest = (id: string) => {
    setFriendRequests(friendRequests.filter((request) => request.id !== id))
  }

  const handleAddFriend = (id: string) => {
    const personToAdd = discover.find((person) => person.id === id)
    if (personToAdd) {
      // Add to friends list
      setFriends([
        ...friends,
        {
          ...personToAdd,
          status: "online",
          lastActive: "Just now",
          lastActiveTime: 0,
          dateAdded: new Date().toISOString().split("T")[0],
        },
      ])
      // Remove from discover list
      setDiscover(discover.filter((person) => person.id !== id))
    }
  }

  const handleMessage = (person: any) => {
    // Add person to friends if not already there
    if (!friends.some((friend) => friend.id === person.id)) {
      const newFriend = {
        ...person,
        status: "online",
        lastActive: "Just now",
        lastActiveTime: 0,
        dateAdded: new Date().toISOString().split("T")[0],
      }
      setFriends([...friends, newFriend])

      // Remove from discover if they were there
      setDiscover(discover.filter((p) => p.id !== person.id))
    }

    // Open messaging interface
    setSelectedPersonForAction(person)
    setShowMessaging(true)
  }

  const handleSchedule = (person: any) => {
    // Add person to friends if not already there
    if (!friends.some((friend) => friend.id === person.id)) {
      const newFriend = {
        ...person,
        status: "online",
        lastActive: "Just now",
        lastActiveTime: 0,
        dateAdded: new Date().toISOString().split("T")[0],
      }
      setFriends([...friends, newFriend])

      // Remove from discover if they were there
      setDiscover(discover.filter((p) => p.id !== person.id))
    }

    // Open scheduling interface
    setSelectedPersonForAction(person)
    setShowScheduling(true)
  }

  const handleRemoveFriend = (id: string) => {
    setFriends(friends.filter((friend) => friend.id !== id))
  }

  const handleViewProfile = (person: any) => {
    setSelectedPerson({
      id: person.id,
      name: person.name,
      avatar: person.avatar.split("text=")[1] || "",
      skills: person.skills,
      rating: person.rating || 4.5,
      featured: person.featured || "Skill Sharer",
      bio: person.bio,
      interests: person.interests,
      posts: person.posts,
    })
    setShowPersonDetail(true)
  }

  const handleCloseProfile = () => {
    setShowPersonDetail(false)
    setSelectedPerson(null)
  }

  // Filter based on search query
  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredRequests = friendRequests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const filteredDiscover = discover.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Sort functions
  const sortedFriends = [...filteredFriends].sort((a, b) => {
    switch (friendsSort) {
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "last-active":
        return a.lastActiveTime - b.lastActiveTime
      case "recently-added":
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
      default:
        return 0
    }
  })

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    switch (requestsSort) {
      case "recent":
        return new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
      case "oldest":
        return new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
      case "mutual-desc":
        return b.mutualConnections - a.mutualConnections
      case "mutual-asc":
        return a.mutualConnections - b.mutualConnections
      default:
        return 0
    }
  })

  const sortedDiscover = [...filteredDiscover].sort((a, b) => {
    switch (discoverSort) {
      case "match-desc":
        return b.matchPercentage - a.matchPercentage
      case "match-asc":
        return a.matchPercentage - b.matchPercentage
      case "mutual-desc":
        return b.mutualConnections - a.mutualConnections
      case "mutual-asc":
        return a.mutualConnections - b.mutualConnections
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  // Get current sort option label
  const getCurrentSortLabel = () => {
    switch (activeTab) {
      case "friends":
        return sortOptions.friends.find((option) => option.value === friendsSort)?.label
      case "requests":
        return sortOptions.requests.find((option) => option.value === requestsSort)?.label
      case "discover":
        return sortOptions.discover.find((option) => option.value === discoverSort)?.label
      default:
        return "Sort"
    }
  }

  // Handle sort change
  const handleSortChange = (value: string) => {
    switch (activeTab) {
      case "friends":
        setFriendsSort(value)
        break
      case "requests":
        setRequestsSort(value)
        break
      case "discover":
        setDiscoverSort(value)
        break
    }
  }

  const handleMessageFromDetail = (person: FeaturedPerson) => {
    const personToAdd = discover.find((p) => p.id === person.id)
    if (personToAdd) {
      // First add them as a friend if they're not already
      if (!friends.some((friend) => friend.id === person.id)) {
        const newFriend = {
          ...personToAdd,
          status: "online",
          lastActive: "Just now",
          lastActiveTime: 0,
          dateAdded: new Date().toISOString().split("T")[0],
        }
        setFriends([...friends, newFriend])
        setDiscover(discover.filter((p) => p.id !== person.id))
      }
      // Close person detail and open messaging
      setShowPersonDetail(false)
      setSelectedPersonForAction(personToAdd)
      setShowMessaging(true)
    }
  }

  const handleScheduleFromDetail = (person: FeaturedPerson) => {
    const personToAdd = discover.find((p) => p.id === person.id)
    if (personToAdd) {
      // First add them as a friend if they're not already
      if (!friends.some((friend) => friend.id === person.id)) {
        const newFriend = {
          ...personToAdd,
          status: "online",
          lastActive: "Just now",
          lastActiveTime: 0,
          dateAdded: new Date().toISOString().split("T")[0],
        }
        setFriends([...friends, newFriend])
        setDiscover(discover.filter((p) => p.id !== person.id))
      }
      // Close person detail and open scheduling
      setShowPersonDetail(false)
      setSelectedPersonForAction(personToAdd)
      setShowScheduling(true)
    }
  }

  const handleConnectFromDetail = (person: FeaturedPerson) => {
    const personToAdd = discover.find((p) => p.id === person.id)
    if (personToAdd) {
      // First add them as a friend if they're not already
      if (!friends.some((friend) => friend.id === person.id)) {
        const newFriend = {
          ...personToAdd,
          status: "online",
          lastActive: "Just now",
          lastActiveTime: 0,
          dateAdded: new Date().toISOString().split("T")[0],
        }
        setFriends([...friends, newFriend])
        setDiscover(discover.filter((p) => p.id !== person.id))
      }
    }
  }

  // Handle scheduling form submission
  const handleScheduleSubmit = (e) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const isValid = form.checkValidity()

    if (isValid && selectedPersonForAction) {
      // Get form values
      const skill = skillRef.current?.value || ""
      const date = dateRef.current?.value || ""
      const time = timeRef.current?.value || ""
      const duration = durationRef.current?.value || ""
      const message = messageRef.current?.value || ""
      const location = locationRef.current?.value || ""

      // Format date for display
      const formattedDate = new Date(date)
      const displayDate = formattedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })

      // Create session object
      const newSession = {
        id: `session-${Date.now()}`,
        title: `${skill} ${selectedPersonForAction.name === "Current User" ? "Teaching" : "Learning"}`,
        date: `${displayDate}, ${time}`,
        duration: duration,
        participants: 2, // Just you and the other person
        location: location,
        type: selectedPersonForAction.name === "Current User" ? "teaching" : "learning",
        with: selectedPersonForAction.name,
        withId: selectedPersonForAction.id,
        withAvatar: selectedPersonForAction.avatar,
        dateObj: formattedDate,
        message: message,
        status: "confirmed",
      }

      // Save session to localStorage
      try {
        // Get existing sessions or initialize empty array
        const existingSessions = JSON.parse(localStorage.getItem("erudite_scheduled_sessions") || "[]")

        // Add new session
        existingSessions.push(newSession)

        // Save back to localStorage
        localStorage.setItem("erudite_scheduled_sessions", JSON.stringify(existingSessions))
      } catch (error) {
        console.error("Error saving session:", error)
      }

      // Add person to friends if not already there
      if (!friends.some((friend) => friend.id === selectedPersonForAction.id)) {
        const newFriend = {
          ...selectedPersonForAction,
          status: "online",
          lastActive: "Just now",
          lastActiveTime: 0,
          dateAdded: new Date().toISOString().split("T")[0],
        }
        setFriends([...friends, newFriend])
        setDiscover(discover.filter((p) => p.id !== selectedPersonForAction.id))
      }

      // Close the modal
      setShowScheduling(false)
      setSelectedPersonForAction(null)

      // Navigate to schedule page
      router.push(`/schedule?date=${date}`)
    } else {
      // Trigger HTML5 validation
      const invalidField = form.querySelector(":invalid") as HTMLElement
      if (invalidField) invalidField.focus()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20">
      <div className="container max-w-4xl mx-auto pt-6 px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] bg-clip-text text-transparent">
                Connect & Learn
              </h1>
              <p className="text-muted-foreground mt-1">Discover amazing people to learn with</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 gap-2 bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span>{getCurrentSortLabel()}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm">
                {activeTab === "friends" &&
                  sortOptions.friends.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className="flex items-center justify-between"
                    >
                      {option.label}
                      {friendsSort === option.value && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                {activeTab === "requests" &&
                  sortOptions.requests.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className="flex items-center justify-between"
                    >
                      {option.label}
                      {requestsSort === option.value && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
                {activeTab === "discover" &&
                  sortOptions.discover.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                      className="flex items-center justify-between"
                    >
                      {option.label}
                      {discoverSort === option.value && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search people, skills, interests..."
              className="pl-12 h-12 bg-white/80 backdrop-blur-sm border-white/20 shadow-lg focus:shadow-xl transition-all duration-300 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="friends" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
            <TabsTrigger
              value="friends"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--primary))] data-[state=active]:text-white"
            >
              Friends
              <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-600 rounded-full">
                {friends.length}
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="requests"
              className="relative data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--primary))] data-[state=active]:text-white"
            >
              Requests
              {friendRequests.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-lg"
                >
                  {friendRequests.length}
                </motion.span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="discover"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[hsl(var(--primary))] data-[state=active]:to-[hsl(var(--primary))] data-[state=active]:text-white"
            >
              Discover
            </TabsTrigger>
          </TabsList>

          {/* Friends Tab */}
          <TabsContent value="friends" className="space-y-4">
            <AnimatePresence>
              {sortedFriends.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-muted-foreground"
                >
                  <p className="text-lg">No friends found matching your search.</p>
                </motion.div>
              ) : (
                sortedFriends.map((friend, index) => (
                  <motion.div
                    key={friend.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleViewProfile(friend)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="relative flex-shrink-0">
                          <Avatar className="h-16 w-16 border-4 border-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary))] shadow-lg">
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} alt={friend.name} />
                            <AvatarFallback className="text-lg bg-gradient-to-r from-indigo-100 to-purple-100">
                              {friend.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-3 border-white shadow-lg ${
                              friend.status === "online" ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-xl text-gray-800">{friend.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium text-yellow-600">{friend.rating}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-3 text-sm">{friend.bio}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {friend.skills.slice(0, 3).map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                            {friend.skills.length > 3 && (
                              <Badge variant="outline" className="border-indigo-200 text-indigo-600">
                                +{friend.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>
                                {friend.status === "online" ? "Online now" : `Last active ${friend.lastActive}`}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{friend.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMessage(friend)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          <span>Message</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 px-4 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveFriend(friend.id)
                          }}
                        >
                          <UserX className="h-4 w-4 mr-2" />
                          <span>Remove</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <AnimatePresence>
              {sortedRequests.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-muted-foreground"
                >
                  <p className="text-lg">No pending friend requests.</p>
                </motion.div>
              ) : (
                sortedRequests.map((request, index) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleViewProfile(request)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-16 w-16 border-4 border-gradient-to-r from-orange-400 to-pink-400 shadow-lg flex-shrink-0">
                          <AvatarImage src={request.avatar || "/placeholder.svg"} alt={request.name} />
                          <AvatarFallback className="text-lg bg-gradient-to-r from-orange-100 to-pink-100">
                            {request.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-xl text-gray-800 mb-2">{request.name}</h3>
                          <p className="text-muted-foreground mb-3 text-sm">{request.bio}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {request.skills.slice(0, 3).map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-orange-100 to-pink-100 text-orange-700 border-orange-200"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                            {request.skills.length > 3 && (
                              <Badge variant="outline" className="border-orange-200 text-orange-600">
                                +{request.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span>
                              {request.mutualConnections} mutual friend{request.mutualConnections !== 1 ? "s" : ""}
                            </span>
                            <span>Requested {request.requestTime}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          className="h-10 px-6 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAcceptRequest(request.id)
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 px-6 border-gray-300 hover:bg-gray-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRejectRequest(request.id)
                          }}
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>

          {/* Discover Tab */}
          <TabsContent value="discover" className="space-y-4">
            <AnimatePresence>
              {sortedDiscover.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-muted-foreground"
                >
                  <p className="text-lg">No people found matching your search.</p>
                </motion.div>
              ) : (
                sortedDiscover.map((person, index) => (
                  <motion.div
                    key={person.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleViewProfile(person)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <Avatar className="h-16 w-16 border-4 border-gradient-to-r from-indigo-400 to-purple-400 shadow-lg flex-shrink-0">
                          <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />
                          <AvatarFallback className="text-lg bg-gradient-to-r from-indigo-100 to-purple-100">
                            {person.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-bold text-xl text-gray-800">{person.name}</h3>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.2 }}
                            >
                              <Badge
                                className={`px-3 py-1 text-sm font-medium ${
                                  person.matchPercentage >= 80
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                    : person.matchPercentage >= 60
                                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                      : "bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                                }`}
                              >
                                {person.matchPercentage}% match
                              </Badge>
                            </motion.div>
                          </div>
                          <p className="text-muted-foreground mb-3 text-sm">{person.bio}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {person.skills.slice(0, 3).map((skill, skillIndex) => (
                              <motion.div
                                key={skill}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                              >
                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-indigo-200"
                                >
                                  {skill}
                                </Badge>
                              </motion.div>
                            ))}
                            {person.skills.length > 3 && (
                              <Badge variant="outline" className="border-indigo-200 text-indigo-600">
                                +{person.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {person.mutualConnections} mutual friend{person.mutualConnections !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          className="h-10 px-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAddFriend(person.id)
                          }}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          <span>Connect</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-10 px-6 bg-blue-50 hover:bg-blue-100 text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleMessage(person)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          <span>Message</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-10 px-6 border-green-200 text-green-600 hover:bg-green-50"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSchedule(person)
                          }}
                        >
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Schedule</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>

      {/* Person Detail Modal */}
      <PersonDetail
        person={selectedPerson}
        isOpen={showPersonDetail}
        onClose={handleCloseProfile}
        onConnect={handleConnectFromDetail}
        onMessage={handleMessageFromDetail}
        onSchedule={handleScheduleFromDetail}
      />

      {/* Messaging Modal */}
      {showMessaging && selectedPersonForAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {selectedPersonForAction.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedPersonForAction.name}</h3>
                  <p className="text-sm text-muted-foreground">Online now</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setShowMessaging(false)}>
                ×
              </Button>
            </div>

            <div className="h-96 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                    Conversation started
                  </div>
                </div>
                <div className="flex">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {selectedPersonForAction.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white dark:bg-gray-700 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">
                      Hi! Thanks for connecting. I'm excited to help you learn {selectedPersonForAction.skills[0]}!
                    </p>
                    <span className="text-xs text-muted-foreground">Just now</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button>Send</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scheduling Modal */}
      {showScheduling && selectedPersonForAction && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Schedule with {selectedPersonForAction.name}</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowScheduling(false)}>
                ×
              </Button>
            </div>

            <form onSubmit={handleScheduleSubmit}>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select a skill <span className="text-red-500">*</span>
                  </label>
                  <select
                    ref={skillRef}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">-- Select a skill --</option>
                    {selectedPersonForAction.skills.map((skill) => (
                      <option key={skill} value={skill}>
                        {skill}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred date <span className="text-red-500">*</span>
                  </label>
                  <input
                    ref={dateRef}
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred time <span className="text-red-500">*</span>
                  </label>
                  <select
                    ref={timeRef}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">-- Select a time --</option>
                    <option>9:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>2:00 PM</option>
                    <option>3:00 PM</option>
                    <option>4:00 PM</option>
                    <option>5:00 PM</option>
                    <option>6:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration <span className="text-red-500">*</span>
                  </label>
                  <select
                    ref={durationRef}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">-- Select duration --</option>
                    <option>30 minutes</option>
                    <option>60 minutes</option>
                    <option>90 minutes</option>
                    <option>120 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <select
                    ref={locationRef}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">-- Select location --</option>
                    <option>Online</option>
                    <option>In-person</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    ref={messageRef}
                    rows={3}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Write a message to introduce yourself and your learning goals..."
                  />
                </div>
              </div>

              <div className="p-4 border-t flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowScheduling(false)}>
                  Cancel
                </Button>
                <Button type="submit">Schedule</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
