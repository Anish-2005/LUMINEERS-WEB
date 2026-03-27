"use client";

import { motion } from "framer-motion";
import BlogUpload from "../components/BlogUpload";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function UploadPageClient() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="pb-20 pt-12 sm:pt-16">
        <div className="container-shell">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mb-8 surface-elevated p-7 sm:mb-10 sm:p-10"
          >
            <p className="badge mb-4">Author workspace</p>
            <h1 className="bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-4xl font-semibold tracking-tight text-transparent md:text-5xl">
              Publish a New Journey
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300">
              Draft, refine, and publish a travel story with structured metadata, visuals, and clear reading flow.
            </p>
          </motion.section>
        </div>
        <BlogUpload />
      </main>
      <Footer />
    </div>
  );
}
