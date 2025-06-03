import { Skeleton } from "@/components/ui/skeleton"
import { Sparkles, TrendingUp, Route, Lightbulb } from "lucide-react"

export default function SkillsLoading() {
  return (
    <div className="mobile-app">
      <div className="mobile-header">
        <Skeleton className="h-6 w-24" />
        <div className="flex-1"></div>
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <main className="main-content pb-6">
        <div className="page-content">
          <div className="card-container">
            {/* Page Header with Animated Background */}
            <div className="relative overflow-hidden rounded-xl mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10 opacity-80"></div>
              <div className="relative z-10 p-4">
                <div className="flex items-center">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full mr-3 shadow-sm">
                    <Sparkles className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <Skeleton className="h-6 w-32 bg-white/30" />
                    <Skeleton className="h-4 w-48 mt-1 bg-white/20" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Skeleton className="w-full h-12 rounded-lg" />
            </div>

            {/* Trending Skills Section */}
            <div className="mobile-card glass-card mb-5">
              <div className="mobile-card-header">
                <div className="mobile-card-title">
                  <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold">Trending Skills</span>
                </div>
              </div>
              <div className="mobile-card-content">
                <Skeleton className="w-full h-9 rounded-lg mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Array(4)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border border-border/30 rounded-xl p-3 shadow-sm">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full mr-3" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-3 w-32" />
                          </div>
                        </div>
                        <Skeleton className="h-4 w-full mt-3" />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Skill Paths Section */}
            <div className="mobile-card glass-card mb-5">
              <div className="mobile-card-header">
                <div className="mobile-card-title">
                  <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                    <Route className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold">Learning Paths</span>
                </div>
              </div>
              <div className="mobile-card-content">
                <div className="space-y-4">
                  {Array(2)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border border-border/30 rounded-xl p-4 shadow-sm">
                        <div className="flex items-start">
                          <Skeleton className="h-9 w-9 rounded-lg mr-3" />
                          <div className="flex-1">
                            <Skeleton className="h-5 w-40 mb-3" />
                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {Array(4)
                                .fill(0)
                                .map((_, j) => (
                                  <Skeleton key={j} className="h-5 w-16 rounded-full" />
                                ))}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <Skeleton className="h-3 w-24" />
                              <Skeleton className="h-4 w-16 rounded-full" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full mt-3" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Recommended For You Section */}
            <div className="mobile-card glass-card">
              <div className="mobile-card-header">
                <div className="mobile-card-title">
                  <div className="bg-primary/10 p-1.5 rounded-full mr-2">
                    <Lightbulb className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-semibold">Recommended For You</span>
                </div>
              </div>
              <div className="mobile-card-content">
                <div className="space-y-3">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="border border-border/30 rounded-xl p-3 shadow-sm">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full mr-3" />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <Skeleton className="h-4 w-32 mb-1" />
                              <Skeleton className="h-4 w-16 rounded-full ml-2" />
                            </div>
                            <Skeleton className="h-3 w-40" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
