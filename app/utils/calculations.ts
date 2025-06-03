/**
 * Utility functions for various calculations throughout the app
 */

// User level calculation
export function calculateUserLevel(xp: number): number {
  // Base XP required for level 1
  const baseXp = 100
  // XP growth factor between levels (increases by this multiplier each level)
  const growthFactor = 1.5

  if (xp < baseXp) return 1

  // Calculate level using logarithmic formula
  // This creates a curve where each level requires more XP than the previous
  const level = Math.floor(1 + Math.log(xp / baseXp) / Math.log(growthFactor))
  return Math.max(1, level)
}

// Calculate XP required for a specific level
export function calculateRequiredXp(level: number): number {
  if (level <= 1) return 0

  const baseXp = 100
  const growthFactor = 1.5

  // Inverse of the level calculation formula
  return Math.round(baseXp * Math.pow(growthFactor, level - 1))
}

// Calculate progress percentage within current level
export function calculateLevelProgress(xp: number): number {
  const currentLevel = calculateUserLevel(xp)
  const currentLevelXp = calculateRequiredXp(currentLevel)
  const nextLevelXp = calculateRequiredXp(currentLevel + 1)

  const xpInCurrentLevel = xp - currentLevelXp
  const xpRequiredForNextLevel = nextLevelXp - currentLevelXp

  return Math.min(100, Math.round((xpInCurrentLevel / xpRequiredForNextLevel) * 100))
}

// Match percentage calculation between two users
export function calculateMatchPercentage(currentUser: any, otherUser: any): number {
  let totalScore = 0
  let maxPossibleScore = 0

  // 1. Skill overlap (what they can teach you)
  const skillOverlap = otherUser.skills.filter((skill: string) => currentUser.learningGoals.includes(skill)).length
  const skillScore = skillOverlap * 15 // Each matching skill is worth 15 points
  totalScore += skillScore
  maxPossibleScore += Math.max(currentUser.learningGoals.length, otherUser.skills.length) * 15

  // 2. Learning goals overlap (what you can teach them)
  const learningOverlap = otherUser.learningGoals.filter((goal: string) => currentUser.skills.includes(goal)).length
  const learningScore = learningOverlap * 15 // Each matching learning goal is worth 15 points
  totalScore += learningScore
  maxPossibleScore += Math.max(currentUser.skills.length, otherUser.learningGoals.length) * 15

  // 3. Interest similarity
  const interestOverlap = otherUser.interests.filter((interest: string) =>
    currentUser.interests.includes(interest),
  ).length
  const interestScore = interestOverlap * 10 // Each matching interest is worth 10 points
  totalScore += interestScore
  maxPossibleScore += Math.max(currentUser.interests.length, otherUser.interests.length) * 10

  // 4. Location proximity
  const locationScore = otherUser.location === currentUser.location ? 20 : 0
  totalScore += locationScore
  maxPossibleScore += 20

  // 5. Availability compatibility
  const availabilityOverlap = otherUser.availability.filter((time: string) =>
    currentUser.availability.includes(time),
  ).length
  const availabilityScore = availabilityOverlap * 10 // Each matching availability slot is worth 10 points
  totalScore += availabilityScore
  maxPossibleScore += Math.max(currentUser.availability.length, otherUser.availability.length) * 10

  // Calculate final percentage
  const matchPercentage = Math.round((totalScore / maxPossibleScore) * 100)

  // Ensure percentage is between 0 and 100
  return Math.min(100, Math.max(0, matchPercentage))
}

// Calculate community activity score
export function calculateCommunityActivityScore(community: any): number {
  const postsWeight = 2
  const commentsWeight = 1
  const membersWeight = 0.5
  const ageInDaysWeight = -0.1 // Newer communities get higher scores

  // Calculate age in days (assume community.createdAt is a date string)
  const createdAt = new Date(community.createdAt || Date.now())
  const ageInDays = Math.max(1, Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)))

  // Calculate posts per member ratio (with minimum to avoid division by zero)
  const membersCount = Math.max(1, community.members || 0)
  const postsPerMember = (community.posts || 0) / membersCount

  // Calculate activity score
  const score =
    (community.posts || 0) * postsWeight +
    (community.comments || 0) * commentsWeight +
    membersCount * membersWeight +
    ageInDays * ageInDaysWeight +
    postsPerMember * 10 // Bonus for engaged communities

  return Math.max(0, Math.round(score))
}

// Calculate skill rating based on endorsements and usage
export function calculateSkillRating(endorsements: number, usageCount: number): number {
  const endorsementWeight = 0.7
  const usageWeight = 0.3

  // Normalize values (assuming max endorsements is 50 and max usage is 100)
  const normalizedEndorsements = Math.min(1, endorsements / 50)
  const normalizedUsage = Math.min(1, usageCount / 100)

  // Calculate weighted score
  const weightedScore = normalizedEndorsements * endorsementWeight + normalizedUsage * usageWeight

  // Convert to 5-star scale
  return Math.round((weightedScore * 4 + 1) * 10) / 10 // 1-5 scale with one decimal
}

// Calculate achievement progress
export function calculateAchievementProgress(currentValue: number, targetValue: number): number {
  return Math.min(100, Math.round((currentValue / targetValue) * 100))
}

// Calculate streak bonus multiplier
export function calculateStreakBonus(streakDays: number): number {
  // Base multiplier is 1.0
  // Every 5 days adds 0.1 to the multiplier, up to 2.0 (50 days)
  const bonusIncrement = Math.floor(streakDays / 5) * 0.1
  return Math.min(2.0, 1.0 + bonusIncrement)
}

// Calculate community rank based on activity score
export function calculateCommunityRank(activityScore: number): string {
  if (activityScore >= 1000) return "Trending"
  if (activityScore >= 500) return "Active"
  if (activityScore >= 200) return "Growing"
  if (activityScore >= 100) return "New"
  return "Quiet"
}

// Calculate XP earned from an activity
export function calculateActivityXp(
  activityType: string,
  streakDays = 0,
  quality = 1, // 1-5 scale for quality of contribution
): number {
  // Base XP values for different activities
  const baseXpValues: Record<string, number> = {
    session_completed: 50,
    skill_shared: 30,
    comment_posted: 5,
    post_created: 15,
    profile_updated: 10,
    community_joined: 5,
    feedback_given: 10,
    challenge_completed: 25,
    daily_login: 5,
  }

  // Get base XP for the activity type
  const baseXp = baseXpValues[activityType] || 0

  // Apply streak bonus
  const streakMultiplier = calculateStreakBonus(streakDays)

  // Apply quality multiplier (1.0 to 1.5 based on quality)
  const qualityMultiplier = 1 + (quality - 1) / 10

  // Calculate final XP
  return Math.round(baseXp * streakMultiplier * qualityMultiplier)
}
