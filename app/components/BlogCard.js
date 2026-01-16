import { motion } from 'framer-motion';
import { User, Calendar, Clock, Heart, Eye } from 'lucide-react';

export default function BlogCard({ blog, liked, views, onLike, onView, onSelect }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.4 }}
      className="group relative"
      onClick={() => {
        onView(blog.id);
        onSelect(blog);
      }}
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-900/50 to-black/50 border border-white/10 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:border-white/20 cursor-pointer h-full">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {blog.image ? (
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-purple-900/30 flex items-center justify-center">
              <div className="text-4xl">🌍</div>
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          {/* Card Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 text-xs">
              Adventure
            </span>
            <span className="px-3 py-1 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 text-xs">
              Story
            </span>
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          {/* Author & Date */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {blog.authorPhoto ? (
                <img 
                  src={blog.authorPhoto} 
                  alt={blog.author}
                  className="w-8 h-8 rounded-full border border-white/20"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium">{blog.author || 'Anonymous Explorer'}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3 h-3" />
                  {blog.timeAgo}
                </div>
              </div>
            </div>
          </div>
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-300 transition-colors">
            {blog.title}
          </h3>
          {/* Excerpt */}
          <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
            {blog.content}
          </p>
          {/* Stats & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              <button 
                onClick={e => {
                  e.stopPropagation();
                  onLike(blog.id);
                }}
                className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-pink-400 text-pink-400' : ''}`} />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Eye className="w-4 h-4" />
                <span>{views || 0} views</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime || 3} min read</span>
              </div>
            </div>
            <div className="px-3 py-1 rounded-full bg-white/5 text-xs text-gray-400">
              Read →
            </div>
          </div>
        </div>
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
      </div>
    </motion.div>
  );
}
