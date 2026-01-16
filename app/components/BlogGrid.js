import { AnimatePresence } from 'framer-motion';
import { memo } from 'react';
import BlogCard from './BlogCard';

const BlogGrid = memo(function BlogGrid({ blogs, likedBlogs, viewCounts, onLike, onView, onSelect }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <AnimatePresence>
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            liked={likedBlogs[blog.id]}
            views={viewCounts[blog.id]}
            onLike={onLike}
            onView={onView}
            onSelect={onSelect}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

BlogGrid.displayName = 'BlogGrid';

export default BlogGrid;
