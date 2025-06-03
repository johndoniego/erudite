const LIKED_POSTS_KEY = "erudite_liked_posts"

export function saveLike(postId: string): void {
  if (typeof window === "undefined") return

  const likedPosts = getLikedPosts()
  if (!likedPosts.includes(postId)) {
    likedPosts.push(postId)
    localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(likedPosts))
  }
}

export function unsaveLike(postId: string): void {
  if (typeof window === "undefined") return

  const likedPosts = getLikedPosts()
  const updatedLikes = likedPosts.filter((id) => id !== postId)
  localStorage.setItem(LIKED_POSTS_KEY, JSON.stringify(updatedLikes))
}

export function getLikedPosts(): string[] {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(LIKED_POSTS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error("Error parsing liked posts from localStorage:", error)
    return []
  }
}

export function isPostLiked(postId: string): boolean {
  return getLikedPosts().includes(postId)
}
