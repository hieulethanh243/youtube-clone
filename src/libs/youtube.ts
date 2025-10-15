/* eslint-disable @typescript-eslint/no-explicit-any */
const API_KEY = process.env.YOUTUBE_API_KEY!;
const BASE = process.env.YOUTUBE_API_BASE_URL!;

export async function getTrendingVideos(
  region = "VN",
  max = 24,
  categoryId?: string
) {
  const url = new URL(`${BASE}/videos`);
  url.searchParams.set("part", "snippet,statistics");
  url.searchParams.set("chart", "mostPopular");
  url.searchParams.set("regionCode", region);
  url.searchParams.set("maxResults", "50"); // ✅ Lấy 50 videos thay vì 24
  url.searchParams.set("key", API_KEY);
  if (categoryId && categoryId !== "all") {
    url.searchParams.set("videoCategoryId", categoryId);
  }

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch trending videos");
  const data = await res.json();

  // Lấy avatar kênh
  const channelIds = [
    ...new Set(data.items.map((v: any) => v.snippet.channelId)),
  ];
  const channelRes = await fetch(
    `${BASE}/channels?part=snippet&id=${channelIds.join(",")}&key=${API_KEY}`
  );
  const channelData = await channelRes.json();
  const channelMap = new Map<string, string>();
  channelData.items.forEach((c: any) =>
    channelMap.set(c.id, c.snippet.thumbnails.default.url)
  );

  const merged = data.items.map((v: any) => ({
    ...v,
    channelThumbnail: channelMap.get(v.snippet.channelId),
  }));

  // ✅ Shuffle và lấy random 24 videos
  const shuffled = merged.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, max);

  return { items: selected };
}

export async function searchVideos(query: string, max = 24) {
  // 1️⃣ Tìm danh sách video
  const res = await fetch(
    `${BASE}/search?part=snippet&type=video&maxResults=${max}&q=${encodeURIComponent(
      query
    )}&key=${API_KEY}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch search results");
  const data = await res.json();

  const videoIds = data.items.map((v: any) => v.id.videoId).join(",");
  if (!videoIds) return { items: [] };

  // 2️⃣ Lấy statistics + avatar
  const [statsRes, channelRes] = await Promise.all([
    fetch(`${BASE}/videos?part=statistics&id=${videoIds}&key=${API_KEY}`),
    fetch(
      `${BASE}/channels?part=snippet&id=${[
        ...new Set(data.items.map((v: any) => v.snippet.channelId)),
      ].join(",")}&key=${API_KEY}`
    ),
  ]);

  const [statsData, channelData] = await Promise.all([
    statsRes.json(),
    channelRes.json(),
  ]);

  const statsMap = new Map<string, any>();
  statsData.items.forEach((v: any) => statsMap.set(v.id, v.statistics));

  const channelMap = new Map<string, string>();
  channelData.items.forEach((c: any) =>
    channelMap.set(c.id, c.snippet.thumbnails.default.url)
  );

  // 3️⃣ Merge data
  const merged = data.items.map((v: any) => ({
    id: v.id.videoId,
    snippet: v.snippet,
    statistics: statsMap.get(v.id.videoId) || {},
    channelThumbnail: channelMap.get(v.snippet.channelId),
  }));

  return { items: merged };
}

export async function getVideoCategories(region = "VN") {
  const res = await fetch(
    `${BASE}/videoCategories?part=snippet&regionCode=${region}&key=${API_KEY}`,
    { next: { revalidate: 3600 } } // cache 1 tiếng
  );

  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();

  // Lọc bỏ category không có snippet.title hoặc bị ẩn
  return data.items
    .filter((c: any) => c.snippet?.assignable)
    .map((c: any) => ({
      id: c.id,
      title: c.snippet.title,
    }));
}

export async function getRelatedVideos(videoId: string) {
  console.log("🎬 [getRelatedVideos] videoId:", videoId);

  if (!videoId || typeof videoId !== "string") {
    throw new Error(`❌ Invalid videoId: ${videoId}`);
  }

  const url = new URL(`${BASE}/search`);
  url.searchParams.set("part", "snippet");
  url.searchParams.set("relatedToVideoId", videoId);
  url.searchParams.set("type", "video");
  url.searchParams.set("maxResults", "12");
  url.searchParams.set("key", API_KEY);

  console.log("🔗 Related Videos API URL:", url.toString());

  const res = await fetch(url.toString(), { cache: "no-store" });
  console.log("🚀 ~ getRelatedVideos ~ res:", res);
  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Related Videos Error:", errText);
    throw new Error("Failed to fetch related videos");
  }

  const data = await res.json();
  return data;
}

export async function getVideoDetail(videoId: string) {
  const BASE = process.env.YOUTUBE_API_BASE_URL!;
  const API_KEY = process.env.YOUTUBE_API_KEY!;

  const url = new URL(`${BASE}/videos`);
  url.searchParams.set("part", "snippet,statistics,contentDetails");
  url.searchParams.set("id", videoId);
  url.searchParams.set("key", API_KEY);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch video detail");
  return res.json();
}
