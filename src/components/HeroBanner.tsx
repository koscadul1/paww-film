"use client";

import React from "react";
import Image from "next/image";
import { Play, Info, Sparkles, ShieldCheck, Zap, Film, Star } from "lucide-react";
import { Movie } from "@/types";

interface HeroBannerProps {
  movie: Movie | null;
  onSelectMovie: (movie: Movie) => void;
  onPlayMovie: (movie: Movie) => void;
}

export default function HeroBanner({
  movie,
  onSelectMovie,
  onPlayMovie,
}: HeroBannerProps) {
  if (!movie) {
    return (
      <div className="relative w-full h-[400px] md:h-[540px] bg-gradient-to-b from-zinc-900 via-black to-[#090a0f] animate-pulse flex items-center justify-center">
        <div className="text-zinc-500 text-sm flex items-center gap-2">
          <Sparkles className="w-5 h-5 animate-spin text-red-500" />
          <span>Memuat highlight sinematik pilihan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[440px] md:h-[580px] bg-black overflow-hidden select-none border-b border-white/[0.06]">
      
      {/* Background Backdrop Poster with Multiple Layer Gradient */}
      <div className="absolute inset-0">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-40 filter scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/80 to-transparent" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#090a0f]/90 to-transparent" />
      </div>

      {/* Decorative Accent Glow */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 z-10">
        <div className="max-w-2xl space-y-4">
          
          {/* Eyebrow Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-red-600 to-rose-600 text-white uppercase tracking-wider shadow-lg shadow-red-600/40">
              <Zap className="w-3 h-3 fill-current" />
              TAYANGAN UNGGULAN
            </span>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              100% Bebas Iklan
            </span>

            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-zinc-200 border border-white/10 backdrop-blur-md">
              4K Ultra HD
            </span>

            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-amber-300 bg-amber-500/15 border border-amber-500/30">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              Top Rated
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] drop-shadow-2xl">
            {movie.title}
          </h1>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-3 leading-relaxed drop-shadow font-normal max-w-xl">
            Rasakan pemutaran sinematik beresolusi tinggi langsung dari web browser Anda. Didukung multi-server provider Valora Film tanpa jeda buffering dan tanpa iklan yang mengganggu.
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3.5 pt-3">
            <button
              onClick={() => onPlayMovie(movie)}
              className="flex items-center gap-2.5 px-7 py-3 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white text-sm font-extrabold rounded-2xl shadow-xl shadow-red-600/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>Tonton Sekarang</span>
            </button>

            <button
              onClick={() => onSelectMovie(movie)}
              className="flex items-center gap-2 px-6 py-3 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-sm font-semibold rounded-2xl border border-white/[0.12] backdrop-blur-md transition-all hover:border-zinc-500 cursor-pointer"
            >
              <Info className="w-4 h-4 text-zinc-400" />
              <span>Detail Film</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
