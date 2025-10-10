export interface VideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      default: { url: string };
      medium: { url: string };
      high: { url: string };
    };
  };
  statistics?: {
    viewCount?: string;
    likeCount?: string;
  };
  channelThumbnail?: string; // ➕ thêm trường này để chứa avatar
}

export interface SearchItem {
  id: { videoId: string };
  snippet: VideoItem["snippet"];
}
