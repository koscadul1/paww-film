import { NextRequest, NextResponse } from "next/server";
import { fetchStream } from "@/lib/providerBridge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const link = searchParams.get("link");
  const type = searchParams.get("type") || "movie";
  const provider = searchParams.get("provider") || "valorafilm";

  if (!link) {
    return NextResponse.json({ success: false, error: "Missing link parameter" }, { status: 400 });
  }

  try {
    const stream = await fetchStream(link, type, provider);
    return NextResponse.json({ success: true, stream });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
