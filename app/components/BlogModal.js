"use client";
import { User, MapPin, Calendar, Clock, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
export default function BlogModal({ blog, liked, viewCount, onClose }) {
  if (!blog) return null;
  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-2xl w-full relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-white/60 hover:text-pink-400"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-white mb-4">{blog.title}</h2>
        <div className="flex items-center gap-2 mb-2">
          <User className="w-4 h-4 text-pink-400" />
          <span className="text-xs text-white/70 font-semibold">{blog.author || 'Anonymous'}</span>
          <MapPin className="w-4 h-4 text-blue-400 ml-2" />
          <span className="text-xs text-white/70">{blog.location || 'Unknown'}</span>
        </div>
        <p className="text-sm text-gray-300 mb-4 whitespace-pre-line">{blog.content}</p>
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-white/60">{blog.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
          <Clock className="w-4 h-4 text-cyan-400 ml-2" />
          <span className="text-xs text-white/60">{blog.readTime} min read</span>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className={`flex items-center gap-1 text-xs font-semibold ${liked ? 'text-pink-400' : 'text-white/60'}`}
          >
            <Heart className="w-4 h-4" /> {liked ? 'Liked' : 'Like'}
          </span>
          <span className="flex items-center gap-1 text-xs text-white/60">
            <Eye className="w-4 h-4" /> {viewCount || 0} views
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
