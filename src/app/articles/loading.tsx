import { SearchingSkeleton } from "@/components/ui/search-loading";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-muted rounded-lg w-48 mb-4"></div>
              <div className="h-6 bg-muted rounded-lg w-96"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Skeleton */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="animate-pulse flex-1 max-w-md">
                <div className="h-10 bg-muted rounded-lg"></div>
              </div>
              <div className="animate-pulse">
                <div className="h-10 bg-muted rounded-lg w-48"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <SearchingSkeleton />
        </div>
      </div>
    </div>
  );
}
