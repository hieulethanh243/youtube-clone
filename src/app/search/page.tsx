import { searchVideos } from "@/libs/youtube";
import VideoGrid from "@/components/VideoGrid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";
  if (!query) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Type something to search videos 🔍
      </div>
    );
  }

  const data = await searchVideos(query);
  const videos = data.items;

  return (
    <div className="pt-2">
      <h1 className="text-xl font-semibold mb-4">
        Results for: <span className="text-blue-600">{query}</span>
      </h1>
      <VideoGrid items={videos} layout="list" />
    </div>
  );
}
