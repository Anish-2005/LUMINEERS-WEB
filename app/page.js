"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import Footer from "./Footer";

export default function Home() {
  const [cursorPos ] = useState({ x: 0, y: 0 });
  const [cursorExpand, setCursorExpand] = useState(false);


 
 // Navbar is now a component
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-900 to-black text-white relative overflow-hidden">
      <Head>
        <title>Lumineers — Travel & Adventure</title>
        <meta
          name="description"
          content="Lumineers is a modern travel and adventure blog featuring immersive stories, photography, and experiences from around the globe."
        />
      </Head>

      {/* Premium Cursor */}
      <div
        className={`fixed pointer-events-none z-50 rounded-full border border-white/30 transition-all duration-300 ${
          cursorExpand ? "w-12 h-12 bg-white/10" : "w-6 h-6"
        }`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: "translate(-50%, -50%)",
        }}
      />


      <Navbar />

      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <Image
          src="https://c4.wallpaperflare.com/wallpaper/435/1011/720/evening-relaxation-wallpaper-preview.jpg"
          alt="Adventure landscape"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-10 shadow-2xl text-center">
            <h2
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-pink-300 to-purple-400"
              onMouseEnter={() => setCursorExpand(true)}
              onMouseLeave={() => setCursorExpand(false)}
            >
              Journey Beyond Limits
            </h2>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
              Thoughtfully curated travel stories, breathtaking visuals, and
              real experiences — crafted for explorers, dreamers, and
              storytellers.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/blogs">
                <button
                  className="px-10 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all duration-300 shadow-lg hover:scale-105"
                  onMouseEnter={() => setCursorExpand(true)}
                  onMouseLeave={() => setCursorExpand(false)}
                >
                  Explore Blogs
                </button>
              </Link>

              <Link href="/upload">
                <button
                  className="px-10 py-3 rounded-xl font-semibold border border-white/40 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setCursorExpand(true)}
                  onMouseLeave={() => setCursorExpand(false)}
                >
                  Share Your Story
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
