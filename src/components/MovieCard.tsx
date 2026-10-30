"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Film, Sparkles } from "lucide-react";
import { Movie } from "@/types";

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  onPlay: (movie: Movie) => void;
}

export default function MovieCard({ movie, onSelect, onPlay }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      onClick={() => onSelect(movie)}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-zinc-900/40 border border-white/[0.06] hover:border-red-500/60 transition-all duration-300 hover:shadow-2xl hover:shadow-red-950/40 cursor-pointer transform hover:-translate-y-2 select-none"
    >
      {/* Poster Media Box */}
      <div className="relative aspect-[2/3] w-full bg-zinc-950 overflow-hidden">
        
        {/* Placeholder skeleton while loading */}
        {!isLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-tr from-zinc-900 to-zinc-800 animate-pulse" />
        )}

        {!imageError && movie.image ? (
          <Image
            src={movie.image}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className={`object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setImageError(true);
              setIsLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-zinc-600 bg-zinc-900">
            <Film className="w-10 h-10 mb-2 stroke-1 text-zinc-700" />
            <span className="text-xs text-center line-clamp-2 text-zinc-400 font-medium">
              {movie.title}
            </span>
          </div>
        )}

        {/* Ambient Top & Bottom Overlays */}
        <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(movie);
            }}
            className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-xl shadow-red-600/60 mb-3 self-center transform scale-75 group-hover:scale-100 transition-all duration-300 cursor-pointer"
            title="Tonton Sekarang"
          >
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </button>
          <span className="text-[11px] text-zinc-200 font-semibold text-center tracking-wide">
            Lihat Detail & Server
          </span>
        </div>

        {/* Quality Badge */}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-black text-white border border-white/10 uppercase tracking-wider">
          4K HDR
        </div>

        {/* Zero Ads Badge */}
        <div className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-md bg-emerald-500/20 backdrop-blur-md text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
          No Ads
        </div>
      </div>

      {/* Movie Info Details */}
      <div className="p-3 flex flex-col flex-1 justify-between bg-[#0e1017]">
        <h3 className="text-xs font-bold text-zinc-200 line-clamp-1 group-hover:text-red-400 transition-colors leading-snug">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-2 font-medium">
          <span className="capitalize text-zinc-400">{movie.provider || "Valora"}</span>
          <span className="text-zinc-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-red-500" />
            Sinematik
          </span>
        </div>
      </div>
    </div>
  );
}
