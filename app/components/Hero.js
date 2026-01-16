"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
export default function Hero({ cursorExpand, setCursorExpand, isVisible }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Enhanced Effects */}
      <div className="absolute inset-0">
        <Image
          src="https://c4.wallpaperflare.com/wallpaper/435/1011/720/evening-relaxation-wallpaper-preview.jpg"
          alt="Adventure landscape"
          fill
          priority
          className={`object-cover transition-all duration-1000 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        {/* Multi-layer Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 via-transparent to-purple-950/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      {/* Hero Content with Enhanced Animations */}
      <div className="relative z-10 w-full max-w-6xl px-6">
        <div className={`backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Decorative Elements */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full" />
          <div className="text-center space-y-8">
            {/* Main Heading with Staggered Animation */}
            <div className="overflow-hidden">
              <h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight bg-gradient-to-r from-blue-300 via-pink-300 to-purple-400 bg-clip-text text-transparent transition-all duration-700"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  opacity: isVisible ? 1 : 0,
                }}
                onMouseEnter={() => setCursorExpand(true)}
                onMouseLeave={() => setCursorExpand(false)}
              >
                Journey Beyond Limits
              </h1>
            </div>
            {/* Subheading with Delay */}
            <div className="overflow-hidden">
              <p 
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light transition-all duration-700 delay-300"
                style={{
                  transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                  opacity: isVisible ? 1 : 0,
                }}
              >
                Thoughtfully curated travel stories, breathtaking visuals, and 
                real experiences — crafted for explorers, dreamers, and storytellers.
              </p>
            </div>
            {/* CTA Buttons with Hover Effects */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-4">
              <Link href="/blogs" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
                <button
                  className="relative px-12 py-4 rounded-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 group-hover:scale-105"
                  onMouseEnter={() => setCursorExpand(true)}
                  onMouseLeave={() => setCursorExpand(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className="group-hover:translate-x-1 transition-transform">Explore Blogs</span>
                    <span className="group-hover:rotate-90 transition-transform">→</span>
                  </span>
                </button>
              </Link>
              <Link href="/upload" className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/10 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                <button
                  className="relative px-12 py-4 rounded-2xl font-semibold border-2 border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 group-hover:shadow-lg"
                  onMouseEnter={() => setCursorExpand(true)}
                  onMouseLeave={() => setCursorExpand(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className="group-hover:translate-x-1 transition-transform">Share Your Story</span>
                    <span className="group-hover:rotate-90 transition-transform">↗</span>
                  </span>
                </button>
              </Link>
            </div>
            {/* Scroll Indicator */}
            <div className="pt-12 animate-bounce">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-gray-400 tracking-widest">SCROLL TO EXPLORE</span>
                <div className="w-px h-12 bg-gradient-to-b from-blue-400/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
