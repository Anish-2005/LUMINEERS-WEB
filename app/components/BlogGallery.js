"use client";
import { useEffect, useState, useRef, lazy, Suspense, useMemo, useCallback } from "react";
import { db } from "../firebase";
import { collection, query, orderBy, onSnapshot, limit } from "firebase/firestore";
import BlogGalleryControls from "./BlogGalleryControls";
import BlogGrid from "./BlogGrid";
import Pagination from "./Pagination";
import LoadingSpinner from "./LoadingSpinner";
import EmptyState from "./EmptyState";

const BlogDetailModal = lazy(() => import("./BlogDetailModal"));

export default function BlogGallery() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [viewCounts, setViewCounts] = useState({});
  const containerRef = useRef(null);
  const blogsPerPage = 9;

  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"), limit(100));
    const unsub = onSnapshot(q, (snap) => {
      const blogData = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        readTime: Math.max(Math.ceil((doc.data().content?.length || 0) / 200), 1),
      }));
      setBlogs(blogData);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLike = (blogId) => {
    setLikedBlogs((prev) => ({
      ...prev,
      [blogId]: !prev[blogId],
    }));
  };

  const handleView = (blogId) => {
    setViewCounts((prev) => ({
      ...prev,
      [blogId]: (prev[blogId] || 0) + 1,
    }));
  };

  const formatDate = useCallback((date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return blogs
      .filter((blog) => {
        if (!normalizedSearch) return true;
        const title = blog.title?.toLowerCase() || "";
        const content = blog.content?.toLowerCase() || "";
        const author = blog.author?.toLowerCase() || "";

        return (
          title.includes(normalizedSearch) ||
          content.includes(normalizedSearch) ||
          author.includes(normalizedSearch)
        );
      })
      .sort((a, b) => {
        if (sortBy === "newest") return b.createdAt - a.createdAt;
        if (sortBy === "oldest") return a.createdAt - b.createdAt;
        return 0;
      })
      .map((blog) => ({ ...blog, timeAgo: getTimeAgo(blog.createdAt) }));
  }, [blogs, searchTerm, sortBy, getTimeAgo]);

  useEffect(() => {
    const total = Math.max(Math.ceil(filteredBlogs.length / blogsPerPage), 1);
    if (currentPage > total) {
      setCurrentPage(total);
    }
  }, [currentPage, filteredBlogs.length]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  if (loading) {
    return (
      <div className="container-shell">
        <LoadingSpinner />
      </div>
    );
  }

  if (!blogs.length) {
    return (
      <div className="container-shell">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="relative" ref={containerRef}>
      <BlogGalleryControls
        searchTerm={searchTerm}
        setSearchTerm={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        setSortBy={setSortBy}
        filteredCount={filteredBlogs.length}
      />
      <div className="container-shell">
        <BlogGrid
          blogs={paginatedBlogs}
          likedBlogs={likedBlogs}
          viewCounts={viewCounts}
          onLike={handleLike}
          onView={handleView}
          onSelect={setSelectedBlog}
        />
        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
      <Suspense
        fallback={
          <div className="fixed inset-x-0 bottom-6 z-40 mx-auto w-fit rounded-xl border border-slate-600/80 bg-slate-900/95 px-4 py-2 text-xs text-slate-300">
            Loading story...
          </div>
        }
      >
        <BlogDetailModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
          formatDate={formatDate}
        />
      </Suspense>
    </div>
  );
}
