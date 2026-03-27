"use client";

import { motion } from "framer-motion";
import BlogGallery from "../components/BlogGallery";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function BlogsPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main>
        <section className="pb-10 pt-14 sm:pb-14 sm:pt-20">
          <div className="container-shell">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="surface-elevated p-8 sm:p-10"
            >
              <p className="badge mb-4">Curated travel journals</p>
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">The Chronicle</h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300">
                Explore stories from creators documenting routes, local culture, and practical travel insight from
                around the world.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="pb-20">
          <BlogGallery />
        </section>
      </main>
      <Footer />
    </div>
  );
}

