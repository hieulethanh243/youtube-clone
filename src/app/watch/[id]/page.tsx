import { getVideoDetail } from "@/libs/youtube";
import RelatedVideos from "@/components/RelatedVideos";
import Image from "next/image";
import YouTubePlayer from "@/components/YoutubePlayer";

export default async function WatchPage({
  params,
}: {
  params: { id: string };
}) {
  const videoId = params.id;

  // ✅ Fetch video detail server-side
  const detail = await getVideoDetail(videoId);
  const video = detail.items?.[0];

  if (!video) {
    return (
      <div className="p-6 text-center text-gray-400">
        ❌ Video not found or unavailable.
      </div>
    );
  }

  const { snippet, statistics } = video;
  const views = Intl.NumberFormat("en", { notation: "compact" }).format(
    Number(statistics.viewCount || 0)
  );

  const likes = Intl.NumberFormat("en", { notation: "compact" }).format(
    Number(statistics.likeCount || 0)
  );

  const date = new Date(snippet.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 max-w-[1600px] mx-auto">
      <div className="flex-1 min-w-0">
        <YouTubePlayer videoId={videoId} title={snippet.title} />

        <h1 className="text-lg md:text-xl font-semibold mt-4">
          {snippet.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-3 mt-2">
          <div className="flex items-center gap-3">
            <Image
              src={snippet.thumbnails.default?.url || "/default-avatar.png"}
              alt={snippet.channelTitle}
              width={44}
              height={44}
              className="rounded-full"
            />
            <div>
              <p className="font-medium text-sm">{snippet.channelTitle}</p>
              <p className="text-xs text-gray-500">6.9M subscribers</p>
            </div>
            <button className="ml-3 px-4 py-1.5 bg-white dark:bg-white/10 rounded-full text-sm font-medium">
              Subscribe
            </button>
          </div>

          <div className="flex items-center gap-3 text-gray-500">
            <button className="hover:text-white flex items-center gap-1">
              👍 {likes}
            </button>
            <button className="hover:text-white">👎</button>
            <button className="hover:text-white">🔗 Share</button>
          </div>
        </div>

        <div className="text-sm text-gray-400 mt-3">
          {views} views • {date}
        </div>

        <p className="text-sm text-gray-300 mt-3 whitespace-pre-line">
          {snippet.description}
        </p>
      </div>

      <aside className="w-full md:w-[380px] flex-shrink-0">
        <RelatedVideos videoId={videoId} />
      </aside>
    </div>
  );
}
