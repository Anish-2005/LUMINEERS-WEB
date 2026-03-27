import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, BookOpen, Hash } from "lucide-react";

const suggestedTags = ["Adventure", "Culture", "Food", "Nature", "Urban", "Solo"];

export default function BlogUploadSidebar({
  inspiration,
  handleInspirationClick,
  tags,
  handleAddTag,
  handleRemoveTag,
  characterCount,
  content,
}) {
  const readTime = Math.max(Math.ceil(content.trim().split(/\s+/).filter(Boolean).length / 200), 1);
  const completion = Math.min((characterCount / 2000) * 100, 100);

  return (
    <aside className="space-y-4 lg:col-span-1">
      <section className="surface p-5">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-200">Writing prompt</h3>
        </div>
        <AnimatePresence mode="wait">
          {inspiration ? (
            <motion.p
              key={inspiration}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="mb-3 rounded-xl border border-slate-700/70 bg-slate-900/75 px-3 py-2 text-sm text-slate-300"
            >
              {inspiration}
            </motion.p>
          ) : (
            <p className="mb-3 text-sm text-slate-400">Generate a focused prompt when you need momentum.</p>
          )}
        </AnimatePresence>
        <button onClick={handleInspirationClick} className="btn-secondary w-full justify-center text-xs uppercase tracking-[0.08em]">
          Generate prompt
        </button>
      </section>

      <section className="surface p-5">
        <div className="mb-3 flex items-center gap-2">
          <Hash className="h-4 w-4 text-blue-300" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-200">Tags</h3>
        </div>
        <div className="mb-3 flex min-h-[36px] flex-wrap gap-2">
          {tags.length ? (
            tags.map((tag) => (
              <motion.span
                key={tag}
                layout
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-1 rounded-full border border-blue-400/35 bg-blue-500/15 px-2.5 py-1 text-xs text-blue-100"
              >
                {tag}
                <button onClick={() => handleRemoveTag(tag)} className="text-blue-100/80 hover:text-white">
                  <X size={12} />
                </button>
              </motion.span>
            ))
          ) : (
            <p className="text-xs text-slate-500">Add up to 5 tags.</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {suggestedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleAddTag(tag)}
              disabled={tags.includes(tag)}
              className="rounded-lg border border-slate-700/70 bg-slate-900/75 px-2 py-2 text-xs text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-35"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      <section className="surface p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-200">Story metrics</h3>
        <div className="mt-4 space-y-4 text-sm text-slate-300">
          <div>
            <div className="mb-1 flex items-center justify-between text-xs uppercase tracking-[0.08em] text-slate-400">
              <span>Character count</span>
              <span>{characterCount} / 2000</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: `${completion}%` }}
              />
            </div>
          </div>
          <p className="inline-flex items-center gap-2 text-slate-300">
            <BookOpen size={14} />
            Estimated read time: {readTime} min
          </p>
        </div>
      </section>
    </aside>
  );
}
