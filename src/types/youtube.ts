export interface VideoItem {
  id: string | { videoId: string }; // 👈 thêm dòng này
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      medium: { url: string };
      high?: { url: string };
    };
  };
  statistics?: {
    viewCount?: string;
  };
  channelThumbnail?: string;
}

export interface SearchItem {
  id: { videoId: string };
  snippet: VideoItem["snippet"];
}
