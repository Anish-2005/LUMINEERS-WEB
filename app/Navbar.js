import Link from "next/link";

export default function Navbar() {
  return (
    <header className="py-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
        LUMINEERS
      </h1>
      <nav className="flex gap-6 mt-4 md:mt-0">
        <Link href="/" className="text-lg font-semibold text-white/80 hover:text-pink-400 transition-colors">Home</Link>
        <Link href="/blogs" className="text-lg font-semibold text-white/80 hover:text-blue-400 transition-colors">Blogs</Link>
        <Link href="/upload" className="text-lg font-semibold text-white/80 hover:text-purple-400 transition-colors">Upload</Link>
      </nav>
    </header>
  );
}
