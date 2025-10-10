import { getTrendingVideos } from "@/libs/youtube";
import VideoGrid from "@/components/VideoGrid";

export default async function HomePage() {
  const data = await getTrendingVideos();
  const videos = data.items;

  return (
    <div>
      <VideoGrid items={videos} layout="grid" />
    </div>
  );
}
