"use client";

import { useEffect, useRef, useState } from "react";

interface YouTubePlayerProps {
  videoId: string;
  title: string;
}

export default function YouTubePlayer({ videoId, title }: YouTubePlayerProps) {
  const [showPlayer, setShowPlayer] = useState(true); // ✅ Autoplay: true
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // ⚡ Lazy load player khi user click thumbnail
  const handlePlay = () => {
    setShowPlayer(true);
  };

  useEffect(() => {
    if (!showPlayer || !iframeRef.current) return;

    // 🎯 Auto-skip ads (detect và click nút Skip)
    const skipInterval = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (!iframe || !iframe.contentWindow) return;

        // Gửi message để skip ad (nếu có)
        iframe.contentWindow.postMessage(
          '{"event":"command","func":"skipAd","args":""}',
          "*"
        );
      } catch (e) {
        // Cross-origin restriction, không thể access iframe
        console.log("Cannot access iframe due to CORS");
      }
    }, 1000);

    return () => clearInterval(skipInterval);
  }, [showPlayer]);

  // 🎨 Tham số iframe để giảm quảng cáo & UI clutter
  const iframeParams = new URLSearchParams({
    autoplay: "1",
    mute: "0",
    modestbranding: "1", // Ẩn logo YouTube
    rel: "0", // Không hiện video gợi ý cuối video
    iv_load_policy: "3", // Tắt annotations
    playsinline: "1",
    enablejsapi: "1", // Enable JS API để control
    origin: typeof window !== "undefined" ? window.location.origin : "",
  });

  return (
    <div className="aspect-video w-full rounded-xl overflow-hidden bg-black relative group">
      {!showPlayer ? (
        // 📸 Thumbnail với nút Play (lazy load)
        <div
          className="w-full h-full cursor-pointer relative"
          onClick={handlePlay}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition">
              <svg
                className="w-8 h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        // 🎥 YouTube iframe player
        <>
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?${iframeParams.toString()}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full youtube-player"
          ></iframe>

          <style jsx>{`
            .youtube-player :global(.ytp-ad-overlay-container),
            .youtube-player :global(.ytp-ad-text-overlay),
            .youtube-player :global(.ytp-ad-player-overlay) {
              display: none !important;
              opacity: 0 !important;
              pointer-events: none !important;
            }
          `}</style>
        </>
      )}
    </div>
  );
}
