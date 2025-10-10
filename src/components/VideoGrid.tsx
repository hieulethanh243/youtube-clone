/* eslint-disable @typescript-eslint/no-explicit-any */
import VideoCard from "./VideoCard";

export default function VideoGrid({
  items,
  layout = "grid",
}: {
  items: any[];
  layout?: "grid" | "list";
}) {
  if (layout === "list") {
    return (
      <div className="flex flex-col gap-5">
        {items.map((v, i) => (
          <VideoCard key={i} v={v} layout="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {items.map((v, i) => (
        <VideoCard key={i} v={v} layout="grid" />
      ))}
    </div>
  );
}
