import Image from "next/image";
import type { VideoItem } from "@/types/youtube";

export default function VideoCard({
  v,
  layout = "grid", // "grid" | "list"
}: {
  v: VideoItem;
  layout?: "grid" | "list";
}) {
  const thumb =
    v.snippet.thumbnails.high?.url || v.snippet.thumbnails.medium.url;
  const avatar = v.channelThumbnail || "/default-avatar.png";
  const views = Intl.NumberFormat("en", { notation: "compact" }).format(
    Number(v.statistics?.viewCount ?? 0)
  );
  const date = new Date(v.snippet.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  if (layout === "list") {
    return (
      <a
        href={`/video/${v.id}`}
        className="flex gap-3 md:gap-4 group rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-900 transition"
      >
        {/* Thumbnail */}
        <div className="relative w-48 md:w-72 aspect-video flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={thumb}
            alt={v.snippet.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-start gap-1">
          <h3 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-red-600">
            {v.snippet.title}
          </h3>
          <p className="text-xs text-gray-500">{`${views} views · ${date}`}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={avatar}
                alt={v.snippet.channelTitle}
                width={32}
                height={32}
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-gray-500">{v.snippet.channelTitle}</p>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2 mt-1">
            {v.snippet.description}
          </p>
        </div>
      </a>
    );
  }

  // GRID layout (Home)
  return (
    <a href={`/video/${v.id}`} className="group block">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Image
          src={thumb}
          alt={v.snippet.title}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform"
        />
      </div>

      <div className="flex gap-3 mt-3">
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
          <Image
            src={avatar}
            alt={v.snippet.channelTitle}
            width={36}
            height={36}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold leading-snug line-clamp-2">
            {v.snippet.title}
          </h3>
          <p className="text-sm text-gray-500">{v.snippet.channelTitle}</p>
          <p className="text-xs text-gray-500">{`${views} views · ${date}`}</p>
        </div>
      </div>
    </a>
  );
}
