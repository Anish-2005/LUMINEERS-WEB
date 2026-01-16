"use client";
import { useEffect, useState, useRef } from 'react';
import { db } from '../firebase';
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
import BlogCard from './BlogCard';
import BlogModal from './BlogModal';

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
    if (!date) return '';
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Pagination
  const paginatedBlogs = blogs
    .filter(blog =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => sortBy === 'newest' ? b.createdAt - a.createdAt : a.createdAt - b.createdAt)
    .slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-6">
        <Search className="w-5 h-5 text-blue-400" />
        <input
          type="text"
          placeholder="Search blogs..."
          className="px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Filter className="w-5 h-5 text-pink-400 ml-2" />
        <select
          className="px-2 py-1 rounded bg-gray-800 text-white"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <AnimatePresence>
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading blogs...</div>
        ) : paginatedBlogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No blogs found.</div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            ref={containerRef}
          >
            {paginatedBlogs.map(blog => (
              <BlogCard
                key={blog.id}
                blog={blog}
                liked={likedBlogs[blog.id]}
                viewCount={viewCounts[blog.id]}
                onLike={handleLike}
                onView={handleView}
                onClick={setSelectedBlog}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-semibold shadow hover:scale-105 transition"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <span className="text-white/70">Page {currentPage}</span>
        <button
          className="px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-semibold shadow hover:scale-105 transition"
          disabled={currentPage * blogsPerPage >= blogs.length}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      {/* Blog modal */}
      <AnimatePresence>
        {selectedBlog && (
          <BlogModal
            blog={selectedBlog}
            liked={likedBlogs[selectedBlog.id]}
            viewCount={viewCounts[selectedBlog.id]}
            onClose={() => setSelectedBlog(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
