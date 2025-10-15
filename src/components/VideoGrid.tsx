/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";

interface VideoGridProps {
  items: any[];
  layout?: "grid" | "list";
  enableInfiniteScroll?: boolean; // ✅ Optional infinite scroll
  region?: string;
  categoryId?: string;
}

export default function VideoGrid({
  items,
  layout = "grid",
  enableInfiniteScroll = true,
  region = "VN",
  categoryId = "all",
}: VideoGridProps) {
  const [videos, setVideos] = useState(items);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  // 📜 Load more videos
  const loadMore = async () => {
    if (isLoading || !hasMore || !enableInfiniteScroll) return;

    setIsLoading(true);

    try {
      // ✅ Gửi danh sách video IDs đã có để tránh trùng
      const excludeIds = videos.map((v) => v.id).join(",");

      const params = new URLSearchParams({
        region,
        max: "12",
        excludeIds, // ✅ Thêm excludeIds
        ...(categoryId !== "all" && { category: categoryId }),
      });

      const res = await fetch(`/api/videos?${params}`);
      const data = await res.json();

      if (!data.items || data.items.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prev) => [...prev, ...data.items]);
        setPage((p) => p + 1);
      }
    } catch (error) {
      console.error("❌ Load more error:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  };

  // 👀 Intersection Observer
  useEffect(() => {
    if (!enableInfiniteScroll) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, page, enableInfiniteScroll]);

  const gridClass =
    layout === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6"
      : "flex flex-col gap-4";
  return (
    <>
      <div className={gridClass}>
        {videos.map((video: any, index: number) => (
          <VideoCard key={`${video.id}-${index}`} v={video} layout={layout} />
        ))}
      </div>

      {/* 🎯 Infinite scroll trigger */}
      {enableInfiniteScroll && (
        <div ref={observerRef} className="py-8 text-center min-h-[100px]">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-gray-500">Loading more videos...</span>
            </div>
          )}

          {!isLoading && hasMore && (
            <div className="text-gray-400 text-sm">
              Scroll for more • {videos.length} videos loaded
            </div>
          )}

          {!hasMore && videos.length > 0 && (
            <p className="text-gray-500">🏁 No more videos</p>
          )}
        </div>
      )}
    </>
  );
}
