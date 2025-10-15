/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import VideoCard from "./VideoCard";

interface InfiniteScrollProps {
  initialVideos: any[];
  region?: string;
  categoryId?: string;
}

export default function InfiniteScroll({
  initialVideos,
  region = "VN",
  categoryId = "all",
}: InfiniteScrollProps) {
  const [videos, setVideos] = useState(initialVideos);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);

  // 📜 Load more videos
  const loadMore = async () => {
    if (isLoading) {
      return;
    }

    if (!hasMore) {
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        region,
        max: "12",
        ...(categoryId !== "all" && { category: categoryId }),
      });

      const url = `/api/videos?${params}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.items || data.items.length === 0) {
        setHasMore(false);
      } else {
        setVideos((prev) => [...prev, ...data.items]);
        setPage((p) => p + 1);
      }
    } catch (error) {
      console.error("❌ Load more error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 👀 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // Load trước khi scroll đến cuối
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    } else {
    }

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoading, page]); // ✅ Thêm dependencies

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {videos.map((video: any, index: number) => (
          <VideoCard key={`${video.id}-${index}`} v={video} />
        ))}
      </div>

      <div
        ref={observerRef}
        className="py-8 text-center min-h-[100px]"
        style={{ minHeight: "100px" }}
      >
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
}
