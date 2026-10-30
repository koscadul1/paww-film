"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, Download, Film, Tv, Sparkles, Layers, SlidersHorizontal } from "lucide-react";

interface NavbarProps {
  currentProvider: string;
  onProviderChange: (provider: string) => void;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  activeCategory: string;
}

const PROVIDERS = [
  { id: "valorafilm", name: "Valora Film (Utama)", tag: "Stabil" },
  { id: "flixhq", name: "FlixHQ (Movies & TV)", tag: "Global" },
  { id: "hiAnime", name: "HiAnime (Anime)", tag: "Anime" },
  { id: "movieBox", name: "MovieBox", tag: "Cepat" },
  { id: "netflixMirror", name: "Netflix Mirror", tag: "Series" },
  { id: "primeMirror", name: "Prime Mirror", tag: "HD" },
  { id: "uhd", name: "UHD 4K Movies", tag: "4K" },
  { id: "topmovies", name: "Top Movies", tag: "Multi" },
];

export default function Navbar({
  currentProvider,
  onProviderChange,
  onSearch,
  onCategorySelect,
  activeCategory,
}: NavbarProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#090a0f]/80 border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => onCategorySelect("")}
              className="flex items-center gap-3.5 group text-left cursor-pointer"
            >
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-rose-600 to-orange-500 p-[1.5px] shadow-lg shadow-red-600/30 group-hover:shadow-red-500/50 transition-all duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-[#0d0e14] rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image
                    src="/icon.png"
                    alt="Valora Film Logo"
                    width={32}
                    height={32}
                    className="object-contain transform group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xl tracking-tight text-white">
                    VALORA<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">FILM</span>
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    WEB
                  </span>
                </div>
                <span className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase">
                  Ad-Free Cinematic Stream
                </span>
              </div>
            </button>

            {/* Navigation Category Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-zinc-900/60 p-1 rounded-2xl border border-white/[0.06] backdrop-blur-md">
              <button
                onClick={() => onCategorySelect("")}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === ""
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Beranda
                </span>
              </button>
              <button
                onClick={() => onCategorySelect("category/movies-by-genres/action")}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory.includes("action")
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5" />
                  Film Aksi
                </span>
              </button>
              <button
                onClick={() => onCategorySelect("web-series/netflix")}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory.includes("netflix")
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Tv className="w-3.5 h-3.5" />
                  Serial Netflix
                </span>
              </button>
              <button
                onClick={() => onCategorySelect("category/movies-by-genres/animation")}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory.includes("animation")
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                Anime & Kartun
              </button>
            </nav>
          </div>

          {/* Search Input Bar */}
          <div className="flex-1 max-w-sm hidden md:block">
            <form onSubmit={handleSubmit} className="relative group">
              <input
                type="text"
                placeholder="Cari judul film, anime, atau serial..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-zinc-900/80 text-xs text-white placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-2xl border border-white/[0.08] focus:outline-none focus:border-red-500 focus:bg-zinc-900 focus:ring-2 focus:ring-red-500/20 transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-red-500 transition-colors" />
            </form>
          </div>

          {/* Right Controls: Provider Switcher & Download APK */}
          <div className="flex items-center gap-3">
            
            {/* Provider Switcher Dropdown */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-1.5 bg-zinc-900/80 border border-white/[0.08] hover:border-zinc-700 rounded-2xl px-3 py-1.5 transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
                <select
                  value={currentProvider}
                  onChange={(e) => onProviderChange(e.target.value)}
                  className="bg-transparent text-zinc-200 text-xs font-semibold focus:outline-none cursor-pointer pr-1"
                  title="Ganti Server Provider"
                >
                  {PROVIDERS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-zinc-900 text-zinc-200">
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* GitHub Link */}
            <a
              href="https://github.com/B7ByteMe/valorafilm"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white bg-zinc-900/70 hover:bg-zinc-800 px-3.5 py-2 rounded-2xl border border-white/[0.08] transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </a>

            {/* Download APK Pill */}
            <a
              href="https://github.com/B7ByteMe/valorafilm/releases/download/v1.0.3/ValoraFilm-arm64-v8a-v1.0.3.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-lg shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Unduh APK v1.0.3</span>
              <span className="sm:hidden">APK</span>
            </a>

          </div>

        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSubmit} className="relative">
            <input
              type="text"
              placeholder="Cari film, serial, anime..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-zinc-900 text-xs text-white placeholder-zinc-500 pl-10 pr-4 py-2.5 rounded-2xl border border-white/[0.08] focus:outline-none focus:border-red-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>
        </div>

      </div>
    </header>
  );
}
