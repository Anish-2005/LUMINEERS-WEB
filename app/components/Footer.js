"use client";

import { Heart, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState(2026);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());

    const onScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left */}
          <p className="text-sm text-gray-500 text-center md:text-left">
            © {year} Lumineers. Built with
            <Heart className="inline w-4 h-4 mx-1 text-red-400" />
            care.
          </p>

          {/* Right */}
          <nav className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
