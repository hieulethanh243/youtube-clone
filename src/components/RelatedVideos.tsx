/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import VideoCard from "@/components/VideoCard";

export default function RelatedVideos({ videoId }: { videoId: string }) {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!videoId) return;

    const fetchRelated = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_YOUTUBE_API_BASE_URL}/search?part=snippet&relatedToVideoId=${videoId}&type=video&maxResults=15&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        );
        const data = await res.json();
        setVideos(data.items || []);
      } catch (err) {
        console.error("❌ Fetch related videos failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [videoId]);

  if (loading)
    return (
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[94px] bg-gray-300 dark:bg-neutral-800 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );

  if (!videos.length) return <p>No related videos found.</p>;

  return (
    <div className="flex flex-col gap-4">
      {videos.map((v) => (
        <VideoCard key={v.id.videoId} v={v} layout="list" />
      ))}
    </div>
  );
}
