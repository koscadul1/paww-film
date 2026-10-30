import { NextRequest, NextResponse } from "next/server";
import { fetchMeta, fetchEpisodes } from "@/lib/providerBridge";
import axios from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const link = searchParams.get("link");
  const provider = searchParams.get("provider") || "valorafilm";
  const episodeUrl = searchParams.get("episodeUrl");

  if (episodeUrl) {
    try {
      const episodes = await fetchEpisodes(episodeUrl, provider);
      return NextResponse.json({ success: true, episodes });
    } catch (error: unknown) {
      const err = error as Error;
      return NextResponse.json({ success: false, error: err.message, episodes: [] }, { status: 500 });
    }
  }

  if (!link) {
    return NextResponse.json({ success: false, error: "Missing link parameter" }, { status: 400 });
  }

  try {
    const meta = await fetchMeta(link, provider);
    if (!meta) {
      return NextResponse.json({ success: false, error: "Meta not found" }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const enrichedMeta: any = { ...meta };

    // Extract IMDb ID if not set
    if (!enrichedMeta.imdbId && enrichedMeta.image) {
      const match = enrichedMeta.image.match(/tt\d+/);
      if (match) enrichedMeta.imdbId = match[0];
    }

    // If tmdbId is missing but imdbId is present, try Cinemeta
    if (!enrichedMeta.tmdbId && enrichedMeta.imdbId) {
      try {
        const type = enrichedMeta.type === "series" ? "series" : "movie";
        const cinemetaUrl = `https://v3-cinemeta.strem.io/meta/${type}/${enrichedMeta.imdbId}.json`;
        const cRes = await axios.get(cinemetaUrl, { timeout: 4000 });
        if (cRes.data?.meta?.moviedb_id) {
          enrichedMeta.tmdbId = cRes.data.meta.moviedb_id;
        }
        if (cRes.data?.meta?.videos && (!enrichedMeta.episodes || enrichedMeta.episodes.length === 0)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          enrichedMeta.episodes = cRes.data.meta.videos.map((v: any) => ({
            title: `S${v.season || 1} E${v.episode || v.number || 1} - ${v.name || v.title || 'Episode'}`,
            episodeNumber: v.episode || v.number || 1,
            seasonNumber: v.season || 1,
            link: v.id || "",
          }));
        }
      } catch (e) {
        console.warn("Could not enrich with Cinemeta:", (e as Error).message);
      }
    }

    return NextResponse.json({ success: true, meta: enrichedMeta });
  } catch (error: unknown) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
