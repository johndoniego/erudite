export interface Post {
  id: string
  skillId: string
  author: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
  comments: number
  tags: string[]
}

const mockPosts: Post[] = [
  {
    id: "js-post-1",
    skillId: "javascript",
    author: "Alex Chen",
    authorAvatar: "AC",
    content:
      "Just finished building my first React app! The component lifecycle was tricky at first but starting to make sense. Any tips for state management?",
    timestamp: "2 hours ago",
    likes: 15,
    comments: 0,
    tags: ["react", "beginner", "state-management"],
  },
  {
    id: "js-post-2",
    skillId: "javascript",
    author: "Sarah Kim",
    authorAvatar: "SK",
    content:
      "ES6 arrow functions vs regular functions - when should you use each? Here's a quick comparison I made for beginners.",
    timestamp: "5 hours ago",
    likes: 23,
    comments: 0,
    tags: ["es6", "functions", "tutorial"],
  },
  {
    id: "ml-post-1",
    skillId: "machine-learning",
    author: "David Rodriguez",
    authorAvatar: "DR",
    content:
      "Just completed my first neural network from scratch! Understanding backpropagation was challenging but incredibly rewarding.",
    timestamp: "1 day ago",
    likes: 42,
    comments: 8,
    tags: ["neural-networks", "backpropagation", "python"],
  },
  {
    id: "python-post-1",
    skillId: "python",
    author: "Emily Zhang",
    authorAvatar: "EZ",
    content: "Python decorators explained with practical examples. These can really clean up your code!",
    timestamp: "3 hours ago",
    likes: 31,
    comments: 5,
    tags: ["decorators", "clean-code", "tutorial"],
  },
]

export const getPosts = async (skillId?: string): Promise<Post[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))

  if (skillId) {
    return mockPosts.filter((post) => post.skillId === skillId)
  }

  return mockPosts
}
