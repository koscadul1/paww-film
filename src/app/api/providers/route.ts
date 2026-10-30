import { NextResponse } from "next/server";
import { getProvidersList } from "@/lib/providerBridge";

export async function GET() {
  try {
    const providers = getProvidersList();
    return NextResponse.json({ success: true, providers });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
