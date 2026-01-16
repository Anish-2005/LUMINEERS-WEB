"use client";
import { User, MapPin, Calendar, Clock, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
export default function BlogCard({ blog, liked, viewCount, onLike, onView, onClick }) {
  return (
    <motion.div
      className="bg-gray-900/80 rounded-xl shadow-lg p-6 flex flex-col gap-4 relative"
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      layout
      onClick={() => { onClick(blog); onView(blog.id); }}
    >
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-pink-400" />
        <span className="text-xs text-white/70 font-semibold">{blog.author || 'Anonymous'}</span>
        <MapPin className="w-4 h-4 text-blue-400 ml-2" />
        <span className="text-xs text-white/70">{blog.location || 'Unknown'}</span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{blog.title}</h3>
      <p className="text-sm text-gray-300 line-clamp-4">{blog.content}</p>
      <div className="flex items-center gap-3 mt-2">
        <Calendar className="w-4 h-4 text-purple-400" />
        <span className="text-xs text-white/60">{blog.createdAt.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
        <Clock className="w-4 h-4 text-cyan-400 ml-2" />
        <span className="text-xs text-white/60">{blog.readTime} min read</span>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <button
          className={`flex items-center gap-1 text-xs font-semibold ${liked ? 'text-pink-400' : 'text-white/60'}`}
          onClick={e => { e.stopPropagation(); onLike(blog.id); }}
        >
          <Heart className="w-4 h-4" /> {liked ? 'Liked' : 'Like'}
        </button>
        <span className="flex items-center gap-1 text-xs text-white/60">
          <Eye className="w-4 h-4" /> {viewCount || 0} views
        </span>
      </div>
    </motion.div>
  );
}
