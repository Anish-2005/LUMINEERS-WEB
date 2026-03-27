"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { Compass, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/upload", label: "Upload" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (nextUser) => setUser(nextUser));
    return () => unsub();
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinkClass = (isActive) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-blue-500/20 text-blue-200"
        : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/50 bg-slate-950/70 backdrop-blur-xl">
      <div className={`container-shell transition-all ${scrolled ? "py-3" : "py-4"}`}>
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-400/40 bg-blue-500/20">
              <Compass size={18} className="text-blue-200" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-100">Lumineers</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Travel Journal Platform</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <div className="inline-flex items-center gap-2 rounded-xl border border-slate-700/70 bg-slate-900/70 px-2.5 py-1.5">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      className="h-8 w-8 rounded-lg border border-slate-600/70 object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/80 text-xs font-bold">
                      {(user.displayName || "U").charAt(0)}
                    </span>
                  )}
                  <div className="max-w-[140px]">
                    <p className="truncate text-xs font-semibold text-slate-100">{user.displayName || "Explorer"}</p>
                    <p className="truncate text-[11px] text-slate-400">{user.email || "Signed in"}</p>
                  </div>
                </div>
                <button type="button" onClick={handleLogout} className="btn-secondary px-3 py-2 text-xs">
                  <LogOut size={14} />
                  Logout
                </button>
              </>
            ) : (
              <button type="button" onClick={handleLogin} className="btn-primary">
                Login with Google
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/80 p-2 text-slate-100 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="mt-3 space-y-3 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-3 md:hidden">
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="divider-line" />
            {user ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-300">Signed in as {user.displayName || "Explorer"}</p>
                <button type="button" onClick={handleLogout} className="btn-secondary w-full justify-center">
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            ) : (
              <button type="button" onClick={handleLogin} className="btn-primary w-full justify-center">
                Login with Google
              </button>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}
