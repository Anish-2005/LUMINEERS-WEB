import { motion, AnimatePresence } from 'framer-motion';
import { User, Clock } from 'lucide-react';

export default function BlogDetailModal({ blog, onClose, formatDate }) {
  if (!blog) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-gray-900 border border-white/10 backdrop-blur-xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            ✕
          </button>
          {/* Modal Content */}
          {blog.image && (
            <div className="relative h-64 md:h-80">
              <img 
                src={blog.image} 
                alt={blog.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </div>
          )}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                {blog.authorPhoto ? (
                  <img 
                    src={blog.authorPhoto} 
                    alt={blog.author}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-lg">{blog.author || 'Anonymous Explorer'}</h4>
                  <p className="text-sm text-gray-400">{formatDate(blog.createdAt)}</p>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <Clock className="inline w-4 h-4 mr-1" />
                {blog.readTime || 3} min read
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {blog.title}
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {blog.content}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
