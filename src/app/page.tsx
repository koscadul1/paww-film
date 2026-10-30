"use client";

import React, { useEffect, useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import VideoPlayerModal from "@/components/VideoPlayerModal";
import AndroidAppSection from "@/components/AndroidAppSection";
import { Movie, PlayTarget } from "@/types";
import { Loader2, Film, ChevronLeft, ChevronRight, Filter, AlertCircle, RefreshCw, CheckCircle2, XCircle, HelpCircle, ChevronDown } from "lucide-react";

const GENRES = [
  { label: "Semua", filter: "" },
  { label: "Serial Netflix", filter: "web-series/netflix" },
  { label: "Amazon Prime", filter: "web-series/amazon-prime-video" },
  { label: "Apple TV+", filter: "web-series/apple-tv" },
  { label: "Aksi (Action)", filter: "category/movies-by-genres/action" },
  { label: "Komedi (Comedy)", filter: "category/movies-by-genres/comedy" },
  { label: "Horor (Horror)", filter: "category/movies-by-genres/horror" },
  { label: "Animasi & Anime", filter: "category/movies-by-genres/animation" },
  { label: "Drama", filter: "category/movies-by-genres/drama" },
  { label: "Sci-Fi", filter: "category/movies-by-genres/sci-fi" },
];

const FAQS = [
  {
    q: "Apakah video di Valora Film benar-benar bisa diputar?",
    a: "Bisa banget! Pemutar web Valora Film dilengkapi 4 server streaming alternatif (VidLink HD, 2Embed, MultiEmbed, AutoEmbed) dengan dukungan audio ganda dan subtitle. Cukup klik 'Putar Sekarang di Web Player' pada film atau serial yang diinginkan.",
  },
  {
    q: "Bagaimana jika salah satu server streaming lambat atau macet?",
    a: "Pada pemutar video di layar Anda, klik tab pilihan server di bagian atas (Server 1 / Server 2 / Server 3). Anda bisa berganti server instan tanpa harus keluar dari video.",
  },
  {
    q: "Apakah Valora Film sepenuhnya bebas iklan?",
    a: "Ya! Valora Film dirancang dengan prinsip Zero-Ads. Baik aplikasi Android resmi maupun web streaming tidak menampilkan popup, banner, atau iklan video yang mengganggu saat menonton.",
  },
  {
    q: "Bagaimana cara mengunduh versi Android resmi?",
    a: "Anda dapat langsung mengunduh file APK Valora Film v1.0.3 melalui tombol 'Unduh APK' di bagian atas atau showcase Android di halaman ini.",
  },
];

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [provider, setProvider] = useState<string>("valorafilm");
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [currentPlayTarget, setCurrentPlayTarget] = useState<PlayTarget | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const fetchMoviesList = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      let url = "";
      if (searchQuery.trim()) {
        url = `/api/search?provider=${encodeURIComponent(provider)}&q=${encodeURIComponent(
          searchQuery
        )}&page=${page}`;
      } else {
        url = `/api/movies?provider=${encodeURIComponent(provider)}&filter=${encodeURIComponent(
          activeFilter
        )}&page=${page}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (data.success && Array.isArray(data.posts)) {
        setMovies(data.posts);
      } else {
        setErrorMsg(data.error || "Gagal memuat daftar film");
        setMovies([]);
      }
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Koneksi terputus ke server provider");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [provider, activeFilter, searchQuery, page]);

  useEffect(() => {
    fetchMoviesList();
  }, [fetchMoviesList]);

  const handleProviderChange = (newProvider: string) => {
    setProvider(newProvider);
    setPage(1);
    setActiveFilter("");
    setSearchQuery("");
  };

  const handleCategorySelect = (filter: string) => {
    setActiveFilter(filter);
    setSearchQuery("");
    setPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveFilter("");
    setPage(1);
  };

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handlePlayTarget = (target: PlayTarget) => {
    setCurrentPlayTarget(target);
  };

  const handleNextEpisode = () => {
    if (!currentPlayTarget || currentPlayTarget.type !== "series") return;
    setCurrentPlayTarget({
      ...currentPlayTarget,
      episode: (currentPlayTarget.episode || 1) + 1,
    });
  };

  const handlePrevEpisode = () => {
    if (!currentPlayTarget || currentPlayTarget.type !== "series") return;
    if ((currentPlayTarget.episode || 1) <= 1) return;
    setCurrentPlayTarget({
      ...currentPlayTarget,
      episode: (currentPlayTarget.episode || 1) - 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-red-600 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar
        currentProvider={provider}
        onProviderChange={handleProviderChange}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
        activeCategory={activeFilter}
      />

      {/* Hero Banner (Only shown when not searching) */}
      {!searchQuery && (
        <HeroBanner
          movie={movies.length > 0 ? movies[0] : null}
          onSelectMovie={(m) => setSelectedMovie(m)}
          onPlayMovie={handlePlayMovie}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Shelf Header & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08] pb-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <Film className="w-6 h-6 text-red-500" />
              {searchQuery
                ? `Hasil Pencarian: "${searchQuery}"`
                : activeFilter
                ? "Katalog Kategori"
                : "Tayangan Unggulan Terbaru"}
            </h2>
            <p className="text-xs text-zinc-400 font-medium">
              Server aktif: <span className="text-red-400 font-bold">{provider}</span> · Menampilkan halaman {page}
            </p>
          </div>

          {/* Genre Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-zinc-500 shrink-0 ml-1 hidden sm:block" />
            {GENRES.map((g) => (
              <button
                key={g.filter}
                onClick={() => handleCategorySelect(g.filter)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === g.filter && !searchQuery
                    ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-600/35 scale-102"
                    : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/[0.06]"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="py-32 flex flex-col items-center justify-center gap-4 text-zinc-400">
            <Loader2 className="w-10 h-10 animate-spin text-red-500" />
            <span className="text-sm font-semibold text-zinc-300">Mengambil data film dari server {provider}...</span>
          </div>
        )}

        {/* Error Notification */}
        {!loading && errorMsg && (
          <div className="p-8 rounded-3xl bg-red-950/20 border border-red-500/30 text-center space-y-4 max-w-md mx-auto shadow-2xl">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <p className="text-sm text-zinc-300 font-medium">{errorMsg}</p>
            <button
              onClick={() => fetchMoviesList()}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white inline-flex items-center gap-2 shadow-lg shadow-red-600/40 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Coba Lagi</span>
            </button>
          </div>
        )}

        {/* Grid Movies */}
        {!loading && !errorMsg && movies.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {movies.map((movie, index) => (
              <MovieCard
                key={`${movie.link}-${index}`}
                movie={movie}
                onSelect={(m) => setSelectedMovie(m)}
                onPlay={handlePlayMovie}
              />
            ))}
          </div>
        )}

        {/* Empty Search Result */}
        {!loading && !errorMsg && movies.length === 0 && (
          <div className="py-28 text-center space-y-4">
            <Film className="w-16 h-16 text-zinc-700 mx-auto stroke-1" />
            <h3 className="text-lg font-bold text-zinc-300">
              Tidak ada konten ditemukan
            </h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              Coba ganti provider di menu kanan atas atau gunakan kata kunci pencarian yang lebih umum.
            </p>
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && movies.length > 0 && (
          <div className="flex items-center justify-center gap-3 pt-6 pb-2">
            <button
              disabled={page <= 1}
              onClick={() => {
                setPage((prev) => Math.max(1, prev - 1));
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-white/[0.08] text-xs font-bold text-zinc-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <span className="text-xs font-bold px-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-red-500/30 text-red-400">
              Halaman {page}
            </span>

            <button
              onClick={() => {
                setPage((prev) => prev + 1);
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-zinc-900 border border-white/[0.08] text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Official Android App Showcase */}
        <AndroidAppSection />

        {/* Comparison Section (Valora Film vs Others) */}
        <section className="my-16 max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Mengapa Memilih Valora Film?
            </h3>
            <p className="text-xs text-zinc-400">
              Bandingkan fitur pemutaran Valora Film dengan situs streaming web konvensional.
            </p>
          </div>

          <div className="rounded-3xl bg-zinc-900/60 border border-white/[0.08] overflow-hidden shadow-2xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/50 border-b border-white/[0.08] text-zinc-400">
                <tr>
                  <th className="p-4 sm:p-5 font-bold">Fitur Utama</th>
                  <th className="p-4 sm:p-5 font-bold text-red-400">Valora Film</th>
                  <th className="p-4 sm:p-5 font-bold text-zinc-500">Situs Streaming Lain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05] text-zinc-300">
                <tr>
                  <td className="p-4 sm:p-5 font-medium">Bebas Iklan & Pop-up</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> 100% Zero Ads
                  </td>
                  <td className="p-4 sm:p-5 text-red-400">
                    <span className="flex items-center gap-2">
                      <XCircle className="w-4 h-4" /> Banyak pop-up & malware
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium">Kualitas Resolusi</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Hingga 4K HDR
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400">Terbatas 480p / 720p</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium">Pilihan Multi-Server</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> 47+ Provider Ekstensi
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400">1 Server tunggal</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-medium">Aplikasi Android Native</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Tersedia (v1.0.3)
                  </td>
                  <td className="p-4 sm:p-5 text-zinc-400">Tidak ada / Web view lambat</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="my-16 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white flex items-center justify-center gap-2.5">
              <HelpCircle className="w-6 h-6 text-red-500" />
              Pertanyaan yang Sering Diajukan (FAQ)
            </h3>
            <p className="text-xs text-zinc-400">
              Segala hal yang perlu Anda ketahui mengenai Valora Film.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, fIdx) => (
              <div
                key={fIdx}
                className="rounded-2xl bg-zinc-900/70 border border-white/[0.07] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === fIdx ? null : fIdx)}
                  className="w-full p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-zinc-200 hover:text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      openFaq === fIdx ? "rotate-180 text-red-500" : ""
                    }`}
                  />
                </button>
                {openFaq === fIdx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#07080c] py-12 px-4 text-center text-xs text-zinc-500 space-y-3">
        <div className="flex items-center justify-center gap-2 font-black text-base text-white">
          <span>VALORA<span className="text-red-500">FILM</span></span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
            Open Source
          </span>
        </div>
        <p className="text-xs text-zinc-400">
          © 2026 Valora Film. Proyek media streaming open-source tanpa iklan.
        </p>
        <p className="text-[11px] text-zinc-600 max-w-xl mx-auto leading-relaxed">
          Penafian: Valora Film tidak menghosting atau mengunggah konten media apa pun di servernya sendiri. Seluruh data dan tautan streaming diperoleh dari integrasi provider pihak ketiga yang terbuka.
        </p>
      </footer>

      {/* Movie Details Modal */}
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onPlayTarget={handlePlayTarget}
      />

      {/* Video Player Modal */}
      <VideoPlayerModal
        playTarget={currentPlayTarget}
        onClose={() => setCurrentPlayTarget(null)}
        onNextEpisode={handleNextEpisode}
        onPrevEpisode={handlePrevEpisode}
        hasEpisodes={currentPlayTarget?.type === "series"}
      />

    </div>
  );
}
