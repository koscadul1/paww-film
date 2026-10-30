import { NextRequest, NextResponse } from "next/server";
import { fetchPosts } from "@/lib/providerBridge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const provider = searchParams.get("provider") || "valorafilm";
  const filter = searchParams.get("filter") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  try {
    const posts = await fetchPosts(provider, filter, page);
    return NextResponse.json({ success: true, count: posts.length, posts });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message, posts: [] }, { status: 500 });
  }
}
