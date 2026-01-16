"use client";
import BlogUpload from '../components/BlogUpload';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

import { useEffect, useState } from 'react';
export default function UploadPage() {
  const [stars, setStars] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    const arr = Array.from({ length: 100 }, (_, i) => ({
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
      key: i,
    }));
    setStars(arr);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/20 to-black text-white font-sans relative overflow-hidden">
      {/* Animated star background - only render after mount to avoid hydration error */}
      {hasMounted ? (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
          {stars.map(star => (
            <div
              key={star.key}
              className="absolute w-[1px] h-[1px] bg-white rounded-full animate-twinkle"
              style={{
                left: star.left,
                top: star.top,
                animationDelay: star.animationDelay,
              }}
            />
          ))}
        </div>
      ) : null}
      <div className="relative z-10">
        <Navbar />
        <section className="py-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                Chronicle Your Journey
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Weave your memories into stories that inspire fellow explorers across the globe
            </p>
          </motion.div>
          <BlogUpload />
        </section>
        <Footer />
      </div>
    </div>
  );
}
