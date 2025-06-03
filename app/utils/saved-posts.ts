export interface SavedPost {
  id: string
  title?: string
  author: string
  authorAvatar?: string
  content: string
  timestamp: string
  likes: number
  comments: number
  type: "skill" | "community"
  sourceId: string
  sourceName: string
}

// Get saved posts from localStorage
export const getSavedPosts = (): SavedPost[] => {
  if (typeof window === "undefined") return []

  try {
    const savedPosts = localStorage.getItem("savedPosts")
    return savedPosts ? JSON.parse(savedPosts) : []
  } catch (error) {
    console.error("Error parsing saved posts:", error)
    return []
  }
}

// Save a post
export const savePost = (post: SavedPost): void => {
  if (typeof window === "undefined") return

  const savedPosts = getSavedPosts()

  // Check if post is already saved
  if (!savedPosts.some((p) => p.id === post.id)) {
    const updatedPosts = [...savedPosts, post]
    localStorage.setItem("savedPosts", JSON.stringify(updatedPosts))
  }
}

// Unsave a post
export const unsavePost = (postId: string): void => {
  if (typeof window === "undefined") return

  const savedPosts = getSavedPosts()
  const updatedPosts = savedPosts.filter((post) => post.id !== postId)
  localStorage.setItem("savedPosts", JSON.stringify(updatedPosts))
}

// Check if a post is saved
export const isPostSaved = (postId: string): boolean => {
  const savedPosts = getSavedPosts()
  return savedPosts.some((post) => post.id === postId)
}
