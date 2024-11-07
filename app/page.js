"use client";  // Enables client-side rendering for this component

import Head from 'next/head';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [hover, setHover] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorExpand, setCursorExpand] = useState(false);

  // Track cursor position
  useEffect(() => {
    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-indigo-800 to-black text-white font-sans">
      <Head>
        <title>Travel & Adventure Blog</title>
        <meta name="description" content="Explore the world with our travel stories" />
      </Head>

      {/* Custom Animated Cursor */}
      <div
        className={`animated-cursor ${cursorExpand ? 'expand' : ''}`}
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%)`,
        }}
      ></div>

      {/* Animated Heading Section */}
      <section className="relative flex justify-center items-center h-32">
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-500 to-green-600 animate-heading" >
          LUMINEERS
        </h2>
      </section>

      {/* Hero Section */}
      <section className="relative flex items-center justify-center h-screen overflow-hidden">
        <Image
          src="https://c4.wallpaperflare.com/wallpaper/435/1011/720/evening-relaxation-wallpaper-preview.jpg"
          alt="Travel Adventure"
          layout="fill"
          className="object-cover opacity-60"
        />
        <div className="absolute z-10 text-center p-4">
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wide mb-4 transition-transform duration-300 hover:scale-105 cursor-pointer"
            onMouseEnter={() => setCursorExpand(true)}
            onMouseLeave={() => setCursorExpand(false)}
          >
            Journey Beyond Limits
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto mb-8">
            Discover our stories and tips for your next adventure!
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-110 cursor-pointer"
            onMouseEnter={() => setCursorExpand(true)}
            onMouseLeave={() => setCursorExpand(false)}
          >
            Start Exploring
          </button>
        </div>
      </section>

      {/* Blog Highlights Section */}
      <section className="py-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 tracking-wide">Our Adventures</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className="relative rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer"
              onMouseEnter={() => {
                setHover(true);
                setCursorExpand(true);
              }}
              onMouseLeave={() => {
                setHover(false);
                setCursorExpand(false);
              }}
            >
              <Image
                src="https://c1.wallpaperflare.com/preview/967/926/391/bunting-wood-evening-fire.jpg"
                alt={`Adventure ${post}`}
                layout="responsive"
                width={500}
                height={300}
                className="object-cover w-full h-60"
              />
              <div
                className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 ${hover ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
              >
                <p className="text-lg font-semibold">Read More</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center">
        <p className="text-gray-400 text-sm">© 2024 Lumineers | All rights reserved.</p>
      </footer>
    </div>
  );
}
