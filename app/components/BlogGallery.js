
"use client";
import { useEffect, useState, useRef, lazy, Suspense, useMemo, useCallback } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';

import BlogGalleryControls from './BlogGalleryControls';
import BlogGrid from './BlogGrid';
import Pagination from './Pagination';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

const BlogDetailModal = lazy(() => import('./BlogDetailModal'));

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
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      const blogData = snap.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        readTime: Math.ceil((doc.data().content?.length || 0) / 200)
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

  const formatDate = useCallback((date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }, []);

  const getTimeAgo = useCallback((date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(date);
  }, [formatDate]);


  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'newest') return b.createdAt - a.createdAt;
        if (sortBy === 'oldest') return a.createdAt - b.createdAt;
        return 0;
      })
      .map(blog => ({ ...blog, timeAgo: getTimeAgo(blog.createdAt) }));
  }, [blogs, searchTerm, sortBy, getTimeAgo]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!blogs.length) {
    return <EmptyState />;
  }

  return (
    <div className="relative" ref={containerRef}>
      <BlogGalleryControls
        searchTerm={searchTerm}
        setSearchTerm={term => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredBlogs.length}
      />
      <div className="max-w-7xl mx-auto px-6">
        <BlogGrid
          blogs={paginatedBlogs}
          likedBlogs={likedBlogs}
          viewCounts={viewCounts}
          onLike={handleLike}
          onView={handleView}
          onSelect={setSelectedBlog}
        />
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <BlogDetailModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          formatDate={formatDate}
        />
      </Suspense>
    </div>
  );
};