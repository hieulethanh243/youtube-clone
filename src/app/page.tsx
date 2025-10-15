import { getTrendingVideos } from "@/libs/youtube";
import InfiniteScroll from "@/components/InfiniteScroll";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryId = searchParams.category || "all";
  const data = await getTrendingVideos("VN", 24, categoryId);

  return (
    <div>
      <InfiniteScroll
        initialVideos={data.items}
        region="VN"
        categoryId={categoryId}
      />
    </div>
  );
}
