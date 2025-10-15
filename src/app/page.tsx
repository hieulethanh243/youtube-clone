import { getTrendingVideos } from "@/libs/youtube";
import InfiniteScroll from "@/components/InfiniteScroll";
import { Suspense } from "react";
import CategoryBar from "@/components/CategoryBar";

export default async function HomePage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categoryId = searchParams.category || "all";
  const data = await getTrendingVideos("VN", 24, categoryId);

  return (
    <div>
      <Suspense fallback={null}>
        <CategoryBar />
      </Suspense>

      <InfiniteScroll
        initialVideos={data.items}
        region="VN"
        categoryId={categoryId}
      />
    </div>
  );
}
