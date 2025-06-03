import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BottomNav from "@/app/components/BottomNav"

export default function PeopleLoading() {
  return (
    <div className="pb-20 min-h-screen bg-gradient-to-b from-background to-background/80">
      <div className="container max-w-md mx-auto pt-4">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>

        <Skeleton className="h-10 w-full mb-4" />

        <Tabs defaultValue="friends" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="friends" disabled>
              Friends
            </TabsTrigger>
            <TabsTrigger value="requests" disabled>
              Requests
            </TabsTrigger>
            <TabsTrigger value="discover" disabled>
              Discover
            </TabsTrigger>
          </TabsList>

          <TabsContent value="friends" className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-4 border border-border/50 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-48 mb-2" />
                      <div className="flex gap-1 mt-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-5 w-14" />
                      </div>
                      <Skeleton className="h-3 w-24 mt-2" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  )
}
