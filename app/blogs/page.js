"use client";
import { motion } from 'framer-motion';
import BlogGallery from '../BlogGallery';
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-blue-950/20 to-black text-white font-sans relative overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

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
              
              {/* Stats Bar */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {[
                  { label: 'Active Explorers', value: '4.2K+' },
                  { label: 'Countries', value: '164' },
                  { label: 'Stories', value: '∞' },
                  { label: 'Continents', value: '7' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
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