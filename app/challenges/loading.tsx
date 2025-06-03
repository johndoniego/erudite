import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, Calendar } from "lucide-react"

export default function ChallengesLoading() {
  return (
    <div className="page-container">
      <div className="p-4 space-y-6">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily" className="flex items-center" disabled>
              <Flame className="mr-2 h-4 w-4" /> Daily Challenges
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center" disabled>
              <Calendar className="mr-2 h-4 w-4" /> Calendar
            </TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            {/* Progress card skeleton */}
            <Card>
              <CardHeader className="pb-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-60 mt-1" />
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-2 w-full" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Challenge cards skeletons */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <Skeleton className="h-4 w-full mt-2" />
                      <Skeleton className="h-4 w-3/4 mt-1" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="px-4 py-2 border-t flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-28" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
