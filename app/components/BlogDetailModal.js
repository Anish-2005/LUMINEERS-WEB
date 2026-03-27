import { motion, AnimatePresence } from "framer-motion";
import { User, Clock3, X } from "lucide-react";

export default function BlogDetailModal({ blog, onClose, formatDate }) {
  if (!blog) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2 }}
          className="surface-elevated relative max-h-[90vh] w-full max-w-4xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-600/80 bg-slate-950/70 text-slate-300 transition hover:text-white"
            aria-label="Close article"
          >
            <X size={16} />
          </button>

          {blog.image ? (
            <div className="relative h-64 border-b border-slate-700/60 md:h-80">
              <img
                src={blog.image}
                alt={blog.title}
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            </div>
          ) : null}

          <div className="p-6 md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {blog.authorPhoto ? (
                  <img
                    src={blog.authorPhoto}
                    alt={blog.author || "Author"}
                    className="h-11 w-11 rounded-lg border border-slate-600/70 object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-700/80 text-slate-200">
                    <User size={18} />
                  </div>
                )}
                <div>
                  <h4 className="text-base font-semibold text-slate-100">{blog.author || "Anonymous Explorer"}</h4>
                  <p className="text-xs uppercase tracking-[0.08em] text-slate-400">{formatDate(blog.createdAt)}</p>
                </div>
              </div>
              <p className="inline-flex items-center gap-1.5 text-sm text-slate-400">
                <Clock3 size={14} />
                {blog.readTime || 3} min read
              </p>
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">{blog.title}</h2>
            <article className="mt-6 whitespace-pre-line text-base leading-relaxed text-slate-200">{blog.content}</article>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
