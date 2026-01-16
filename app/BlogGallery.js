"use client";
import { useEffect, useState, useRef } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  User, 
  MapPin, 
  Clock, 
  Heart, 
  Eye,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from 'lucide-react';

export default function BlogGallery() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [viewCounts, setViewCounts] = useState({});
  const containerRef = useRef(null);
  const blogsPerPage = 9;

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const blogData = snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        readTime: Math.ceil((doc.data().content?.length || 0) / 200) // 200 words per minute
      }));
      setBlogs(blogData);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLike = (blogId) => {
    setLikedBlogs(prev => ({
      ...prev,
      [blogId]: !prev[blogId]
    }));
  };

  const handleView = (blogId) => {
    setViewCounts(prev => ({
      ...prev,
      [blogId]: (prev[blogId] || 0) + 1
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
  };

  const filteredBlogs = blogs
    .filter(blog => 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt - a.createdAt;
      if (sortBy === 'oldest') return a.createdAt - b.createdAt;
      return 0;
    });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center mb-6">
          <div className="text-5xl">🌌</div>
        </div>
        <h3 className="text-2xl font-bold mb-3">The Adventure Awaits</h3>
        <p className="text-gray-400 max-w-md">
          No stories have been shared yet. Be the first explorer to document your journey!
        </p>
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      {/* Controls */}
      <div className="sticky top-20 z-40 backdrop-blur-xl bg-gray-900/80 border-b border-white/10 mb-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search adventures, authors, or destinations..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <Filter className="w-4 h-4" />
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              <div className="text-sm text-gray-400">
                {filteredBlogs.length} {filteredBlogs.length === 1 ? 'story' : 'stories'} found
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {paginatedBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative"
                onClick={() => {
                  handleView(blog.id);
                  setSelectedBlog(blog);
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
                            {getTimeAgo(blog.createdAt)}
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
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(blog.id);
                          }}
                          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-pink-400 transition-colors"
                        >
                          <Heart className={`w-4 h-4 ${likedBlogs[blog.id] ? 'fill-pink-400 text-pink-400' : ''}`} />
                          <span>{likedBlogs[blog.id] ? 'Liked' : 'Like'}</span>
                        </button>
                        
                        <div className="flex items-center gap-1.5 text-sm text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span>{viewCounts[blog.id] || 0} views</span>
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
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    currentPage === pageNum
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'border border-white/10 hover:bg-white/5'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Detail Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedBlog(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl bg-gray-900 border border-white/10 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                ✕
              </button>

              {/* Modal Content */}
              {selectedBlog.image && (
                <div className="relative h-64 md:h-80">
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                </div>
              )}

              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {selectedBlog.authorPhoto ? (
                      <img 
                        src={selectedBlog.authorPhoto} 
                        alt={selectedBlog.author}
                        className="w-12 h-12 rounded-full border-2 border-white/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <User className="w-6 h-6" />
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-lg">{selectedBlog.author || 'Anonymous Explorer'}</h4>
                      <p className="text-sm text-gray-400">{formatDate(selectedBlog.createdAt)}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-400">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {selectedBlog.readTime || 3} min read
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedBlog.title}
                </h2>

                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                    {selectedBlog.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}