"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Link from "next/link";
import Footer from "./Footer";

export default function Home() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorExpand, setCursorExpand] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Mouse tracking for custom cursor
  useEffect(() => {
    const updateCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const updateScrollProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", updateCursor);
    window.addEventListener("scroll", updateScrollProgress);
    
    // Trigger entrance animation
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  // Scroll progress indicator
  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent">
      <div 
        className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950/30 to-black text-white relative overflow-hidden">
      <Head>
        <title>Lumineers — Travel & Adventure</title>
        <meta
          name="description"
          content="Lumineers is a modern travel and adventure blog featuring immersive stories, photography, and experiences from around the globe."
        />
      </Head>

      {/* Scroll Progress Indicator */}
      <ProgressBar />

      {/* Premium Cursor with trail effect */}
      <div className="fixed pointer-events-none z-50">
        {/* Main cursor */}
        <div
          className={`rounded-full absolute transition-all duration-150 ease-out ${
            cursorExpand 
              ? "w-12 h-12 bg-gradient-to-r from-blue-400/20 to-purple-400/20 border border-white/40 backdrop-blur-sm" 
              : "w-6 h-6 bg-white/90 border border-white"
          }`}
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Cursor trail */}
        <div
          className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 absolute transition-all duration-300 ease-out"
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            transform: "translate(-50%, -50%)",
            opacity: cursorExpand ? 0.5 : 0.3,
          }}
        />
      </div>


      <Navbar />

      {/* Hero Section */}
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

      {/* Content Preview Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Journeys
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover stories that transport you to distant lands and hidden gems
            </p>
          </div>

          {/* Placeholder for blog cards - Same as original but enhanced */}
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div 
                key={item}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:scale-105 hover:border-white/20 cursor-pointer"
                onMouseEnter={() => setCursorExpand(true)}
                onMouseLeave={() => setCursorExpand(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-300 transition-colors">
                    Adventure Awaits
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    Explore breathtaking destinations through immersive storytelling
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

