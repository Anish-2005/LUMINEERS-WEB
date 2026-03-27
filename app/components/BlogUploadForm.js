import { motion } from "framer-motion";
import { Send, Sparkles, Image as ImageIcon } from "lucide-react";
import BlogUploadImagePreview from "./BlogUploadImagePreview";
import BlogUploadSuccessMessage from "./BlogUploadSuccessMessage";

export default function BlogUploadForm({
  title,
  setTitle,
  content,
  setContent,
  imageUrl,
  setImageUrl,
  loading,
  handleSubmit,
  success,
}) {
  return (
    <div className="surface-elevated overflow-hidden">
      <div className="border-b border-slate-700/60 px-6 py-4 sm:px-8">
        <h2 className="text-lg font-semibold text-slate-100">Story Draft</h2>
        <p className="mt-1 text-sm text-slate-400">Complete your title, narrative, and optional cover image.</p>
      </div>
      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="label">Story title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Crossing the Dolomites at dawn"
              className="input-field text-lg font-semibold"
              required
            />
          </div>

          <div>
            <label className="label">Narrative</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your complete experience, practical notes, and key moments from the trip."
              className="textarea-field"
              required
            />
          </div>

          <div>
            <label className="label inline-flex items-center gap-2">
              <ImageIcon size={14} />
              Cover image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/cover-image.jpg"
              className="input-field"
            />
          </div>

          <BlogUploadImagePreview imageUrl={imageUrl} />

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="btn-primary w-full justify-center py-3 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white"
                />
                Publishing story...
              </>
            ) : (
              <>
                <Send size={17} />
                Publish to The Chronicle
                <Sparkles size={16} />
              </>
            )}
          </motion.button>

          <BlogUploadSuccessMessage success={success} />
        </form>
      </div>
    </div>
  );
}
