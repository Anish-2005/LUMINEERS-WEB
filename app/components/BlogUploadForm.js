import { motion } from "framer-motion";
import { Camera, Send, Sparkles } from "lucide-react";
import BlogUploadImagePreview from "./BlogUploadImagePreview";
import BlogUploadSuccessMessage from "./BlogUploadSuccessMessage";

export default function BlogUploadForm({
  title,
  setTitle,
  content,
  setContent,
  imageUrl,
  setImageUrl,
  fileInputRef,
  loading,
  handleSubmit,
  success,
}) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Story Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Journey..."
              className="w-full text-3xl md:text-4xl font-bold bg-transparent border-none focus:outline-none placeholder-white"
              required
            />
            <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          </div>
          {/* Content */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Your Narrative</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Begin your tale here... Let the words flow like a river through uncharted lands."
              className="w-full min-h-[300px] bg-transparent border-none focus:outline-none resize-none placeholder-white text-lg leading-relaxed"
              required
            />
          </div>
          {/* Image URL */}
          <div>
            <label className="text-sm text-gray-100 mb-2 block flex items-center gap-2">
              <Camera size={16} />
              Cover Image URL
            </label>
            <div className="flex gap-4">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://your-journey-image.com"
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                Browse
              </button>
            </div>
          </div>
          {/* Image Preview */}
          <BlogUploadImagePreview imageUrl={imageUrl} />
          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-3 group"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Launching Your Story...
              </>
            ) : (
              <>
                <Send size={20} />
                Publish to The Chronicle
                <Sparkles className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            )}
          </motion.button>
          {/* Success message */}
          <BlogUploadSuccessMessage success={success} />
        </form>
      </div>
    </div>
  );
}
