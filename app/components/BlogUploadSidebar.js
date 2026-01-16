import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, BookOpen, Camera, MapPin } from "lucide-react";

export default function BlogUploadSidebar({ inspiration, handleInspirationClick, tags, handleAddTag, handleRemoveTag, characterCount, content }) {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Inspiration Card */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-yellow-400" />
          <h3 className="font-semibold">Need Inspiration?</h3>
        </div>
        <AnimatePresence mode="wait">
          {inspiration && (
            <motion.p
              key={inspiration}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-300 mb-4 italic"
            >
              "{inspiration}"
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={handleInspirationClick}
          className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
        >
          Generate Prompt
        </button>
      </div>
      {/* Tags */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Add Tags</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              layout
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-red-400"
              >
                <X size={12} />
              </button>
            </motion.span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {["Adventure", "Culture", "Food", "Nature", "Urban", "Solo"].map((tag) => (
            <button
              key={tag}
              onClick={() => handleAddTag(tag)}
              disabled={tags.includes(tag)}
              className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors text-sm text-center"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      {/* Stats */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Story Stats</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Characters</span>
              <span className={characterCount > 1500 ? "text-green-400" : ""}>
                {characterCount}/2000
              </span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                initial={{ width: 0 }}
                animate={{ width: `${(characterCount / 2000) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-sm text-gray-400">
            <p className="flex items-center gap-2">
              <BookOpen size={14} />
              {Math.ceil(content.split(" ").length / 200)} min read
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
