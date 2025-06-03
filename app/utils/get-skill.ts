// Mock skill data
const skills = [
  {
    id: "machine-learning",
    name: "Machine Learning",
    description:
      "Learn the fundamentals of machine learning, including algorithms, data preprocessing, and model evaluation.",
    followers: 1250,
    trend: "Rising",
    createdAt: "2023-01-15",
    category: "Technology",
    difficulty: "Intermediate",
    icon: "/code-icon.png",
  },
  {
    id: "javascript",
    name: "JavaScript",
    description:
      "Master JavaScript programming from basics to advanced concepts including ES6+, async programming, and frameworks.",
    followers: 3200,
    trend: "Hot",
    createdAt: "2022-10-15",
    category: "Technology",
    difficulty: "Beginner",
    icon: "/code-icon.png",
  },
  {
    id: "web-development",
    name: "Web Development",
    description: "Master modern web development with HTML, CSS, JavaScript, and popular frameworks.",
    followers: 2100,
    trend: "Hot",
    createdAt: "2022-11-20",
    category: "Technology",
    difficulty: "Beginner",
    icon: "/code-icon.png",
  },
  {
    id: "react",
    name: "React",
    description: "Build modern user interfaces with React, including hooks, state management, and component patterns.",
    followers: 2800,
    trend: "Hot",
    createdAt: "2022-12-05",
    category: "Technology",
    difficulty: "Intermediate",
    icon: "/code-icon.png",
  },
  {
    id: "python",
    name: "Python",
    description: "Learn Python programming for web development, data science, automation, and more.",
    followers: 2950,
    trend: "Rising",
    createdAt: "2022-09-20",
    category: "Technology",
    difficulty: "Beginner",
    icon: "/code-icon.png",
  },
  {
    id: "data-science",
    name: "Data Science",
    description: "Explore data analysis, visualization, and statistical modeling techniques.",
    followers: 980,
    trend: "Stable",
    createdAt: "2023-03-10",
    category: "Technology",
    difficulty: "Advanced",
    icon: "/code-icon.png",
  },
  {
    id: "guitar-playing",
    name: "Guitar Playing",
    description: "Learn to play guitar from basic chords to advanced techniques.",
    followers: 750,
    trend: "Rising",
    createdAt: "2023-02-05",
    category: "Music",
    difficulty: "Beginner",
    icon: "/music-icon.png",
  },
  {
    id: "cooking",
    name: "Cooking",
    description: "Master culinary skills from basic techniques to gourmet dishes.",
    followers: 1500,
    trend: "Hot",
    createdAt: "2022-12-01",
    category: "Lifestyle",
    difficulty: "Beginner",
    icon: "/placeholder-icon.png",
  },
  {
    id: "photography",
    name: "Photography",
    description: "Learn photography techniques, composition, lighting, and post-processing.",
    followers: 1200,
    trend: "Stable",
    createdAt: "2023-01-20",
    category: "Creative",
    difficulty: "Beginner",
    icon: "/placeholder-icon.png",
  },
  {
    id: "fitness",
    name: "Fitness & Exercise",
    description: "Build strength, endurance, and overall health through structured fitness programs.",
    followers: 1800,
    trend: "Rising",
    createdAt: "2022-11-10",
    category: "Health",
    difficulty: "Beginner",
    icon: "/fitness-icon.png",
  },
]

export async function getSkill(id: string) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  const skill = skills.find((s) => s.id === id)
  if (!skill) {
    throw new Error(`Skill with id ${id} not found`)
  }

  return skill
}

export async function getAllSkills() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  return skills
}
