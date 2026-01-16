"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Link from "next/link";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import FeaturedJourneys from "./components/FeaturedJourneys";

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
      <Hero cursorExpand={cursorExpand} setCursorExpand={setCursorExpand} isVisible={isVisible} />
      <FeaturedJourneys setCursorExpand={setCursorExpand} />
      <Footer />
    </div>
  );
}

