"use client";

import { ArrowUpRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";

const footerLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-gray-900/80">
      <div className="container-shell py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-1.5 text-sm text-gray-300">
              <span>&copy; {year} Lumineers.</span>
              <span>Built with</span>
              <Heart size={14} className="text-rose-300" />
              <span>for explorers.</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">Professional storytelling infrastructure for travel creators.</p>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            {footerLinks.map((item) => (
              <a key={item.label} href={item.href} className="inline-flex items-center gap-1 text-gray-400 transition hover:text-white">
                {item.label}
                <ArrowUpRight size={13} />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

