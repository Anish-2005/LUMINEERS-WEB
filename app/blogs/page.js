"use client";
import { motion } from 'framer-motion';
import BlogGallery from '../BlogGallery';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { useEffect, useState } from 'react';

export default function BlogsPage() {
  const [stars, setStars] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const arr = Array.from({ length: 30 }, (_, i) => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${i * 0.2}s`,
      key: i,
    }));
    setStars(arr);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950/20 to-black text-white font-sans relative overflow-x-hidden">
      {/* Animated Background - only render after mount to avoid hydration error */}
      {hasMounted ? (
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
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
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6 text-center relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
                  The Chronicles
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                Dive into authentic travel stories from adventurers around the globe. 
                Each journey is a new perspective waiting to be discovered.
              </p>
              
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-20">
          <BlogGallery />
        </section>

        <Footer />
      </div>
    </div>
  );
}