"use client";

import { BackgroundBeams } from "@/components/ui/background-beams";
import { ArrowLeft } from "lucide-react";

export default function ArticleLoading() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundBeams className="opacity-20" />

      {/* Breadcrumb Skeleton */}
      <div className="border-b border-border relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <ArrowLeft className="w-4 h-4" />
            <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Article Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Category Skeleton */}
        <div className="mb-4">
          <div className="w-20 h-6 bg-primary/20 rounded-full animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 space-y-3">
          <div className="w-full h-8 bg-muted rounded animate-pulse"></div>
          <div className="w-3/4 h-8 bg-muted rounded animate-pulse"></div>
        </div>

        {/* Meta Information Skeleton */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-20 h-4 bg-muted rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-muted rounded animate-pulse"></div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <div className="relative w-full h-96 md:h-[500px] bg-muted rounded-xl mb-8 animate-pulse"></div>

        {/* Article Content Skeleton */}
        <div className="space-y-6">
          {/* Paragraph Skeletons */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-muted rounded animate-pulse"></div>
            </div>
          ))}

          {/* Image Skeleton */}
          <div className="w-full h-64 bg-muted rounded-lg animate-pulse my-8"></div>

          {/* More Paragraph Skeletons */}
          {[...Array(4)].map((_, i) => (
            <div key={i + 8} className="space-y-2">
              <div className="w-full h-4 bg-muted rounded animate-pulse"></div>
              <div className="w-5/6 h-4 bg-muted rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Article Footer Skeleton */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-muted rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
                <div className="w-32 h-3 bg-muted rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-32 h-10 bg-primary/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
