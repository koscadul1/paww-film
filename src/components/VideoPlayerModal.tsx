"use client";

import React, { useState, useEffect } from "react";
import { X, ExternalLink, RefreshCw, Server, Film, AlertCircle, ChevronLeft, ChevronRight, ShieldCheck, ShieldAlert } from "lucide-react";
import { PlayTarget } from "@/types";

interface VideoPlayerModalProps {
  playTarget: PlayTarget | null;
  onClose: () => void;
  onNextEpisode?: () => void;
  onPrevEpisode?: () => void;
  hasEpisodes?: boolean;
}

export default function VideoPlayerModal({
  playTarget,
  onClose,
  onNextEpisode,
  onPrevEpisode,
  hasEpisodes = false,
}: VideoPlayerModalProps) {
  const [selectedServer, setSelectedServer] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [antiPopup, setAntiPopup] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  }, [playTarget, selectedServer, antiPopup]);

  if (!playTarget) return null;

  const id = playTarget.tmdbId || playTarget.imdbId;
  const isSeries = playTarget.type === "series";
  const season = playTarget.season || 1;
  const episode = playTarget.episode || 1;

  // Generate URLs for multiple reliable streaming servers
  const getServerUrl = (serverIndex: number): string => {
    // If a direct video file/m3u8 was passed
    if (playTarget.directUrl && (playTarget.directUrl.endsWith(".mp4") || playTarget.directUrl.endsWith(".m3u8"))) {
      return playTarget.directUrl;
    }

    if (id) {
      if (serverIndex === 1) {
        // VidLink (Super fast, clean player with subtitle support)
        return isSeries
          ? `https://vidlink.pro/tv/${id}/${season}/${episode}?primaryColor=ef4444&autoplay=false`
          : `https://vidlink.pro/movie/${id}?primaryColor=ef4444&autoplay=false`;
      }
      if (serverIndex === 2) {
        // 2Embed
        return isSeries
          ? `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`
          : `https://www.2embed.cc/embed/${id}`;
      }
      if (serverIndex === 3) {
        // MultiEmbed
        return isSeries
          ? `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`
          : `https://multiembed.mov/?video_id=${id}&tmdb=1`;
      }
      if (serverIndex === 4) {
        // AutoEmbed
        return isSeries
          ? `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`
          : `https://player.autoembed.cc/embed/movie/${id}`;
      }
    }

    // Fallback to direct URL if available
    return playTarget.directUrl || "";
  };

  const currentStreamUrl = getServerUrl(selectedServer);

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 bg-[#0c0d13]/90 border-b border-white/[0.08] gap-3 z-10">
        
        {/* Title and Episode indicator */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <div className="flex flex-col">
            <h2 className="text-xs sm:text-sm font-bold text-white line-clamp-1 flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-red-500" />
              {playTarget.title}
            </h2>
            {isSeries && (
              <span className="text-[10px] text-zinc-400 font-semibold">
                Season {season} · Episode {episode}
              </span>
            )}
          </div>
        </div>

        {/* Server Selector Buttons */}
        <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-xl border border-white/[0.06] overflow-x-auto">
          <span className="text-[10px] font-bold text-zinc-500 px-2 flex items-center gap-1 hidden sm:flex">
            <Server className="w-3 h-3" /> Server:
          </span>
          {[
            { id: 1, name: "VidLink (Cepat)" },
            { id: 2, name: "2Embed" },
            { id: 3, name: "MultiEmbed" },
            { id: 4, name: "AutoEmbed" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedServer(s.id);
                setLoading(true);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedServer === s.id
                  ? "bg-red-600 text-white shadow-md shadow-red-600/30"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Action Controls & Anti-Popups Toggle */}
        <div className="flex items-center gap-2">
          
          {/* Anti-Popup Sandbox Shield Button */}
          <button
            onClick={() => setAntiPopup(!antiPopup)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              antiPopup
                ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/25"
                : "bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500/25"
            }`}
            title="Klik untuk mengaktifkan / menonaktifkan blokir popup iklan"
          >
            {antiPopup ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Anti-Iklan: Aktif</span>
                <span className="sm:hidden">Anti-Iklan</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Anti-Iklan: Mati</span>
                <span className="sm:hidden">Iklan Aktif</span>
              </>
            )}
          </button>

          {hasEpisodes && onPrevEpisode && (
            <button
              onClick={onPrevEpisode}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.06] transition-colors"
              title="Episode Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          {hasEpisodes && onNextEpisode && (
            <button
              onClick={onNextEpisode}
              className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/[0.06] transition-colors"
              title="Episode Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          <a
            href={currentStreamUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold border border-white/[0.08] transition-colors"
            title="Buka pemutar di tab baru"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tab Baru ↗</span>
          </a>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Video Player Screen */}
      <div className="relative flex-1 flex items-center justify-center bg-black p-2 sm:p-6 overflow-hidden">
        {currentStreamUrl ? (
          <div className="w-full h-full max-w-6xl rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl relative bg-zinc-950 flex flex-col">
            
            {loading && (
              <div className="absolute inset-0 bg-[#090a0f] flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
                <RefreshCw className="w-8 h-8 animate-spin text-red-500" />
                <p className="text-xs text-zinc-400 font-semibold">
                  Menghubungkan ke Server {selectedServer}...
                </p>
              </div>
            )}

            <iframe
              key={`${currentStreamUrl}-${selectedServer}-${antiPopup}`}
              src={currentStreamUrl}
              className="w-full flex-1 border-0"
              allowFullScreen
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              sandbox={
                antiPopup
                  ? "allow-scripts allow-same-origin allow-forms"
                  : undefined
              }
              title={playTarget.title}
              onLoad={() => setLoading(false)}
            />

            {/* Bottom Tip bar */}
            <div className="px-4 py-2.5 bg-[#0c0d13] border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-zinc-400 gap-2">
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full inline-block ${antiPopup ? "bg-emerald-400" : "bg-amber-400"}`} />
                {antiPopup
                  ? "Proteksi Anti-Iklan Aktif: Pop-up & tab baru otomatis diblokir oleh browser."
                  : "Perhatian: Proteksi Anti-Iklan dinonaktifkan."}
              </span>
              <span className="text-zinc-500">
                Jika video tidak berputar dengan anti-iklan, Anda dapat mematikannya lewat tombol perisai hijau di kanan atas.
              </span>
            </div>

          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 text-center p-8 bg-zinc-900/60 rounded-3xl border border-white/[0.08] max-w-md">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <h3 className="text-sm font-bold text-white">Sumber Video Tidak Ditemukan</h3>
            <p className="text-xs text-zinc-400">
              Judul ini belum memiliki ID streaming yang valid di database. Anda dapat mencoba tautan unduhan langsung pada modal detail.
            </p>
          </div>
        )}
      </div>

      {/* Player Footer Bar */}
      <div className="px-6 py-2.5 bg-[#08090d] text-center text-[11px] text-zinc-500 border-t border-white/[0.05]">
        Valora Film Cinematic Player · Multi-Quality HD & 4K Streaming
      </div>

    </div>
  );
}
