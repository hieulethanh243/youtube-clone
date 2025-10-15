import { getMoreVideos } from "@/libs/youtube";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const region = searchParams.get("region") || "VN";
    const max = parseInt(searchParams.get("max") || "12");
    const categoryId = searchParams.get("category") || "all";

    // ✅ Lấy danh sách IDs đã load (từ client gửi lên)
    const excludeIdsStr = searchParams.get("excludeIds") || "";
    const excludeIds = excludeIdsStr ? excludeIdsStr.split(",") : [];
    const data = await getMoreVideos(region, max, categoryId, excludeIds);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos", details: String(error) },
      { status: 500 }
    );
  }
}
