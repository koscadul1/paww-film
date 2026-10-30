"use client";

import React from "react";
import Image from "next/image";
import { Download, Smartphone, ShieldCheck, Zap, Radio, Layers, Cpu, PlayCircle, Sparkles } from "lucide-react";

export default function AndroidAppSection() {
  return (
    <section className="relative my-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#12141d] via-[#0d0e14] to-[#08090d] border border-white/[0.09] p-8 sm:p-14 shadow-2xl">
        
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-red-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Info & Specs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>APLIKASI RESMI ANDROID · TERBARU v1.0.3</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Streaming Sinematik <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-orange-400">
                100% Bebas Iklan.
              </span>
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-xl font-normal">
              Rasakan pengalaman menonton tanpa gangguan di smartphone Anda dengan Valora Film. Dibangun secara native menggunakan arsitektur ARM64-v8a untuk performa instan, decoding 4K HDR, dan integrasi pemutar video modern.
            </p>

            {/* Spec Features Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.05]">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Zero Ads</span>
                  <span className="text-[10px] text-zinc-400">Tanpa jeda iklan</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.05]">
                <Cpu className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">ARM64-v8a</span>
                  <span className="text-[10px] text-zinc-400">Native 64-bit engine</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.05]">
                <PlayCircle className="w-5 h-5 text-sky-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">ExoPlayer</span>
                  <span className="text-[10px] text-zinc-400">Optimal startup buffer</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.05]">
                <Layers className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">Multi-Provider</span>
                  <span className="text-[10px] text-zinc-400">47+ Sumber aktif</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.05]">
                <Radio className="w-5 h-5 text-rose-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">In-App Updater</span>
                  <span className="text-[10px] text-zinc-400">Auto rilis terbaru</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-zinc-900/60 border border-white/[0.05]">
                <Smartphone className="w-5 h-5 text-indigo-400 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white">External Player</span>
                  <span className="text-[10px] text-zinc-400">VLC / MX support</span>
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://github.com/B7ByteMe/valorafilm/releases/download/v1.0.3/ValoraFilm-arm64-v8a-v1.0.3.apk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-red-600/35 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Valora Film v1.0.3 (APK)</span>
              </a>

              <a
                href="https://github.com/B7ByteMe/valorafilm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-sm font-semibold rounded-2xl border border-white/[0.1] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub Releases ↗</span>
              </a>
            </div>

            <p className="text-[11px] text-zinc-500 font-medium">
              Terverifikasi aman · Bebas pelacak · Kompatibel dengan Android 8.0 Oreo hingga Android 15.
            </p>
          </div>

          {/* Right Column: App Presentation Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-zinc-950/90 border border-white/[0.1] p-8 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-xl">
              
              <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-tr from-red-600 to-rose-500 p-[2px] shadow-2xl shadow-red-600/40 mb-6">
                <div className="w-full h-full bg-[#0d0e14] rounded-3xl flex items-center justify-center p-3 overflow-hidden">
                  <Image
                    src="/icon.png"
                    alt="Valora Film Android App"
                    width={112}
                    height={112}
                    className="object-contain"
                  />
                </div>
              </div>

              <h3 className="text-white font-black text-xl">Valora Film Android</h3>
              <p className="text-zinc-400 text-xs mt-1">Edisi Native Media Player</p>

              <div className="mt-5 w-full bg-zinc-900/80 rounded-2xl p-4 border border-white/[0.05] space-y-2 text-left text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Versi Rilis</span>
                  <span className="text-white font-bold">v1.0.3 Stabil</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Target Arsitektur</span>
                  <span className="text-red-400 font-semibold">ARM64-v8a</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Kebijakan Iklan</span>
                  <span className="text-emerald-400 font-semibold">100% Zero Ads</span>
                </div>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Build Terverifikasi & Aktif</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
