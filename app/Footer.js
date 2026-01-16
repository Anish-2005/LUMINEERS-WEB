export default function Footer() {
    return (
        <footer className="relative">
            {/* Gradient Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
            <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                {/* Brand */}
                <h2 className="text-2xl font-extrabold tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">
                    LUMINEERS
                </h2>
                {/* Tagline */}
                <p className="mt-4 text-sm text-white/60 max-w-xl mx-auto leading-relaxed">
                    A quiet place for ideas, stories, and creations —  
                    built for those who explore, not rush.
                </p>
                {/* Soft Divider */}
                <div className="mt-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {/* Copyright */}
                <p className="mt-6 text-xs text-white/40 tracking-wide">
                    © 2026 Lumineers · Crafted with care, not noise
                </p>
            </div>
        </footer>
    );
}