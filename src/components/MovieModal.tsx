"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X, Play, Star, Tv, Loader2, Sparkles, Server, Download, ExternalLink } from "lucide-react";
import { Movie, MovieDetail, PlayTarget } from "@/types";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlayTarget: (target: PlayTarget) => void;
}

export default function MovieModal({
  movie,
  onClose,
  onPlayTarget,
}: MovieModalProps) {
  const [meta, setMeta] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Array<{ title: string; episodeNumber?: number; seasonNumber?: number; link: string }>>([]);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);

  useEffect(() => {
    if (!movie) return;

    let isMounted = true;
    setLoading(true);
    setMeta(null);
    setEpisodes([]);

    const fetchDetail = async () => {
      try {
        const provider = movie.provider || "valorafilm";
        const res = await fetch(
          `/api/meta?provider=${encodeURIComponent(provider)}&link=${encodeURIComponent(movie.link)}`
        );
        const data = await res.json();
        if (isMounted && data.success && data.meta) {
          setMeta(data.meta);

          // If Cinemeta or meta returned episodes directly
          if (data.meta.episodes && data.meta.episodes.length > 0) {
            setEpisodes(data.meta.episodes);
          } else {
            // Check if there is an episodesLink to fetch
            const firstEpisodeLink = data.meta.linkList?.find(
              (l: { episodesLink?: string }) => l.episodesLink
            )?.episodesLink;

            if (firstEpisodeLink) {
              setLoadingEpisodes(true);
              try {
                const epRes = await fetch(
                  `/api/meta?provider=${encodeURIComponent(provider)}&episodeUrl=${encodeURIComponent(firstEpisodeLink)}`
                );
                const epData = await epRes.json();
                if (isMounted && epData.success && epData.episodes) {
                  setEpisodes(epData.episodes);
                }
              } catch (err) {
                console.error("Failed to fetch episodes:", err);
              } finally {
                if (isMounted) setLoadingEpisodes(false);
              }
            }
          }
        }
      } catch (err) {
        console.error("Error loading movie detail:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [movie]);

  if (!movie) return null;

  const handleStartPlay = () => {
    onPlayTarget({
      title: meta?.title || movie.title,
      tmdbId: meta?.tmdbId,
      imdbId: meta?.imdbId,
      type: (meta?.type === "series" ? "series" : "movie"),
      season: 1,
      episode: 1,
      directUrl: meta?.linkList?.[0]?.directLinks?.[0]?.link || movie.link,
    });
  };

  const handlePlayEpisode = (ep: { title: string; episodeNumber?: number; seasonNumber?: number; link: string }) => {
    onPlayTarget({
      title: `${meta?.title || movie.title} - ${ep.title}`,
      tmdbId: meta?.tmdbId,
      imdbId: meta?.imdbId,
      type: "series",
      season: ep.seasonNumber || 1,
      episode: ep.episodeNumber || 1,
      directUrl: ep.link,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#10121a] border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[90vh]">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all hover:scale-105 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {loading ? (
          <div className="py-36 flex flex-col items-center justify-center gap-4 text-zinc-400">
            <Loader2 className="w-10 h-10 animate-spin text-red-500" />
            <div className="text-center space-y-1">
              <p className="text-sm font-semibold text-white">Memuat Informasi Sinematik...</p>
              <p className="text-xs text-zinc-500">Menghubungkan ke provider {movie.provider || "Valora"}</p>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto flex-1 scrollbar-thin">
            {/* Backdrop & Header Banner */}
            <div className="relative h-64 sm:h-96 w-full bg-zinc-950 overflow-hidden">
              <Image
                src={meta?.image || movie.image}
                alt={movie.title}
                fill
                priority
                className="object-cover object-top opacity-55 filter scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-[#10121a]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#10121a] via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex items-end gap-6">
                <div className="relative w-28 sm:w-40 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl shrink-0 hidden sm:block bg-zinc-900">
                  <Image
                    src={movie.image}
                    alt={movie.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-gradient-to-r from-red-600 to-rose-600 text-white uppercase tracking-wider">
                      {meta?.type || "Movie"}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-zinc-900/90 text-zinc-300 border border-white/10">
                      {movie.provider || "ValoraFilm"}
                    </span>
                    {meta?.rating && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {meta.rating}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Bebas Iklan
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight drop-shadow-md">
                    {meta?.title || movie.title}
                  </h2>

                  {/* Quick Play CTA */}
                  <div className="pt-2">
                    <button
                      onClick={handleStartPlay}
                      className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-black rounded-xl shadow-lg shadow-red-600/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>Putar Sekarang di Web Player</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Synopsis Section */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-red-500" />
                  Sinopsis & Alur Cerita
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                  {meta?.synopsis ||
                    "Tidak ada sinopsis resmi yang terlampir. Anda dapat langsung memilih server pemutaran di bawah untuk memulai streaming."}
                </p>
              </div>

              {/* Streaming Servers / Qualities */}
              {meta?.linkList && meta.linkList.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Server className="w-4 h-4 text-red-500" />
                    Pilihan Kualitas & Tautan File
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {meta.linkList.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-zinc-900/70 border border-white/[0.08] hover:border-red-500/50 rounded-2xl p-4 flex flex-col justify-between gap-3 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-bold text-zinc-200 line-clamp-2">
                            {item.title}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={handleStartPlay}
                            className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-red-600/30 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Tonton di Web Player</span>
                          </button>

                          {/* Cloud Download / Host Link */}
                          {item.directLinks && item.directLinks.length > 0 && (
                            <a
                              href={item.directLinks[0].link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold rounded-xl border border-white/[0.08] transition-colors"
                              title="Buka tautan file cloud langsung"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Unduh File ({item.quality || "HD"}) ↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Episodes List if series */}
              {loadingEpisodes && (
                <div className="flex items-center gap-2.5 text-xs text-zinc-400 py-4 bg-zinc-900/40 p-4 rounded-2xl border border-white/[0.05]">
                  <Loader2 className="w-4 h-4 animate-spin text-red-500" />
                  <span>Memuat daftar episode lengkap untuk serial ini...</span>
                </div>
              )}

              {episodes.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <Tv className="w-4 h-4 text-red-500" />
                    Daftar Episode ({episodes.length} Episode)
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
                    {episodes.map((ep, eIdx) => (
                      <button
                        key={eIdx}
                        onClick={() => handlePlayEpisode(ep)}
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/80 hover:bg-red-600/20 hover:border-red-500/50 border border-white/[0.06] text-left transition-colors group cursor-pointer"
                      >
                        <span className="text-xs font-medium text-zinc-300 group-hover:text-white line-clamp-1">
                          {ep.title}
                        </span>
                        <Play className="w-3.5 h-3.5 text-red-500 shrink-0 ml-1.5 group-hover:scale-110 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quick Play */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={handleStartPlay}
                  className="flex items-center gap-2.5 px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-extrabold rounded-2xl shadow-xl shadow-red-600/30 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Buka di Web Player Sekarang</span>
                </button>

                <span className="text-xs text-zinc-500">
                  Disediakan oleh provider {movie.provider || "ValoraFilm"} · Didukung server resolusi multi-kualitas.
                </span>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
