"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const handleLogout = async () => {
    await signOut(auth);
  };

  const navItems = [
    { href: "/", label: "Home", color: "from-pink-400 to-rose-400" },
    { href: "/blogs", label: "Blogs", color: "from-blue-400 to-cyan-400" },
    { href: "/upload", label: "Upload", color: "from-purple-400 to-violet-400" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "py-4 backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-xl" 
        : "py-6"
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo with enhanced effects */}
          <Link 
            href="/" 
            className="relative group"
            onMouseEnter={() => setHovered("logo")}
            onMouseLeave={() => setHovered("")}
          >
            <div className="relative flex items-center gap-2">
              {/* Inline SVG favicon */}
              <span className="w-8 h-8 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="lumineerGradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F472B6"/>
                      <stop offset="50%" stopColor="#8B5CF6"/>
                      <stop offset="100%" stopColor="#38BDF8"/>
                    </linearGradient>
                    <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF"/>
                      <stop offset="100%" stopColor="#A855F7"/>
                    </radialGradient>
                    <filter id="softGlow">
                      <feGaussianBlur stdDeviation="6" result="blur"/>
                      <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="128" cy="128" r="92" stroke="url(#lumineerGradient)" strokeWidth="3" opacity="0.5"/>
                  <circle cx="128" cy="128" r="64" stroke="url(#lumineerGradient)" strokeWidth="2" opacity="0.35"/>
                  <path d="M128 86 L138 118 L170 128 L138 138 L128 170 L118 138 L86 128 L118 118 Z" fill="url(#coreGlow)" filter="url(#softGlow)"/>
                  <circle cx="190" cy="90" r="5" fill="#38BDF8"/>
                  <circle cx="70" cy="170" r="4" fill="#F472B6"/>
                </svg>
              </span>
              <h1 className="text-4xl md:text-5xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 transition-all duration-500 group-hover:tracking-[0.25em]">
                LUMINEERS
              </h1>
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
            
            {/* Glow effect */}
            <div className={`absolute -inset-2 bg-gradient-to-r from-pink-400/20 via-purple-400/20 to-blue-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              hovered === "logo" ? "animate-pulse" : ""
            }`} />
          </Link>

          {/* Navigation with improved UX */}
          <nav className="flex items-center gap-8 mt-4 md:mt-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group"
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered("")}
                >
                  {/* Background glow on hover */}
                  <div className={`absolute -inset-2 bg-gradient-to-r ${item.color} blur-md rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  
                  {/* Main link */}
                  <div className="relative">
                    <span className={`text-lg font-medium transition-all duration-300 ${
                      isActive 
                        ? `bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-semibold`
                        : "text-white/70 group-hover:text-white"
                    }`}>
                      {item.label}
                    </span>
                    
                    {/* Animated indicator */}
                    <div className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r ${item.color} transition-all duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    } origin-left`} />
                    
                    {/* Floating dots */}
                    <div className="absolute -top-2 -right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${item.color}`} />
                      <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${item.color}`} />
                    </div>
                  </div>

                  {/* Micro-interaction indicator */}
                  <div className={`absolute -inset-1 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                    hovered === item.label ? "scale-100" : "scale-95"
                  }`} />
                </Link>
              );
            })}
            
            {/* Separator for visual hierarchy */}
            <div className="hidden md:block h-6 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
            
            {/* User status indicator or login button */}
            {user ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="relative">
                  {/* Online indicator */}
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75" />
                  </div>
                  {/* Placeholder avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400/20 to-blue-400/20 border border-white/10 flex items-center justify-center">
                    <span className="text-sm font-semibold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent">
                      ✨
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <p className="text-xs text-white/60">Welcome back,</p>
                  <p className="text-sm font-medium">Explorer</p>
                </div>
                <button
                  className="ml-2 px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-semibold shadow hover:scale-105 transition"
                  onClick={handleLogout}
                >Logout</button>
              </div>
            ) : (
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-sm font-semibold shadow hover:scale-105 transition"
                onClick={handleLogin}
              >Login with Google</button>
            )}
          </nav>
        </div>

        {/* Mobile menu indicator */}
        <div className="md:hidden mt-4">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex justify-center mt-3">
            <div className="flex gap-2">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    pathname === item.href 
                      ? `bg-gradient-to-r ${item.color} scale-125` 
                      : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}