/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { memo } from "react";
import { User, CalendarDays, Clock3, Heart, Eye, MapPin } from "lucide-react";

const BlogCard = memo(function BlogCard({ blog, liked, views, onLike, onView, onSelect }) {
  const authorName = blog.author || "Anonymous Explorer";
  const excerpt = (blog.content || "").trim();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 14 }}
      transition={{ duration: 0.35 }}
      className="group relative h-full"
      onClick={() => {
        onView(blog.id);
        onSelect(blog);
      }}
    >
      <article className="surface relative flex h-full cursor-pointer flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-slate-500/70">
        <div className="relative h-56 overflow-hidden border-b border-slate-700/60">
          {blog.image ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
              <MapPin className="h-10 w-10 text-slate-500" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
          <div className="absolute left-4 top-4 flex gap-2">
            <span className="badge">Adventure</span>
            <span className="badge">Story</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {blog.authorPhoto ? (
                <img
                  src={blog.authorPhoto}
                  alt={authorName}
                  className="h-8 w-8 rounded-lg border border-slate-600/70 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-700/70 text-slate-200">
                  <User className="h-4 w-4" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-slate-100">{authorName}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarDays className="h-3 w-3" />
                  {blog.timeAgo}
                </div>
              </div>
            </div>
          </div>

          <h3 className="mb-3 line-clamp-2 text-xl font-semibold tracking-tight text-slate-100 transition-colors group-hover:text-blue-200">
            {blog.title}
          </h3>
          <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-300">
            {excerpt || "No content preview available for this story yet."}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-slate-700/70 pt-4">
            <div className="flex items-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(blog.id);
                }}
                className="flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-rose-300"
              >
                <Heart className={`h-4 w-4 ${liked ? "fill-rose-300 text-rose-300" : ""}`} />
                <span>{liked ? "Liked" : "Like"}</span>
              </button>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <Eye className="h-4 w-4" />
                <span>{views || 0} views</span>
              </div>
              <div className="hidden items-center gap-1.5 text-sm text-slate-400 sm:flex">
                <Clock3 className="h-4 w-4" />
                <span>{blog.readTime || 3} min read</span>
              </div>
            </div>
            <span className="rounded-full border border-slate-600/70 bg-slate-900/80 px-3 py-1 text-xs text-slate-300">
              Read
            </span>
          </div>
        </div>
      </article>
    </motion.div>
  );
});

BlogCard.displayName = "BlogCard";

export default BlogCard;
