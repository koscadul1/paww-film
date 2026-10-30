import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/lib/providerBridge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const provider = searchParams.get("provider") || "valorafilm";
  const page = parseInt(searchParams.get("page") || "1", 10);

  if (!query) {
    return NextResponse.json({ success: true, count: 0, posts: [] });
  }

  try {
    const posts = await searchMovies(query, provider, page);
    return NextResponse.json({ success: true, count: posts.length, posts });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message, posts: [] }, { status: 500 });
  }
}
