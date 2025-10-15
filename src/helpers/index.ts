import { VideoItem } from "@/types/youtube";

export function getVideoId(v: VideoItem): string {
  if (typeof v.id === "object" && "videoId" in v.id) {
    return v.id.videoId;
  }
  return v.id;
}
