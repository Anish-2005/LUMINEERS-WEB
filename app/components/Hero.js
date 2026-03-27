"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, NotebookPen } from "lucide-react";

const trustedBy = ["Independent Creators", "Travel Collectives", "Editorial Teams", "Adventure Clubs"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pt-24">
      <div className="container-shell">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="surface-elevated relative p-8 sm:p-10">
            <span className="badge mb-5">Editorial storytelling platform</span>
            <h1 className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-4xl font-semibold leading-tight tracking-tight text-transparent sm:text-5xl lg:text-6xl">
              Build world-class travel stories that feel like premium digital magazines.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300">
              Lumineers helps creators publish, organize, and discover travel narratives with a clean, immersive
              reading and authoring experience.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/blogs" className="btn-primary">
                Explore Stories
                <ArrowRight size={16} />
              </Link>
              <Link href="/upload" className="btn-secondary">
                Publish a Journey
                <NotebookPen size={16} />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {trustedBy.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-gray-900/70 px-3 py-2 text-center">
                  <p className="text-xs font-medium uppercase tracking-[0.08em] text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-elevated relative overflow-hidden">
            <div className="relative h-[420px] w-full sm:h-[520px]">
              <Image
                src="https://c4.wallpaperflare.com/wallpaper/435/1011/720/evening-relaxation-wallpaper-preview.jpg"
                alt="Remote scenic travel destination"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/75 p-4 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-400">Latest spotlight</p>
              <h3 className="mt-1 text-lg font-semibold text-white">Midnight Fjords, Northern Routes</h3>
              <p className="mt-1 text-sm text-gray-300">A documentary-style exploration of Norway&apos;s winter coast.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

