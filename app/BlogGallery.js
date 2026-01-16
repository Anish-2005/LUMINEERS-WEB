"use client";
import { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

export default function BlogGallery() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setBlogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  if (loading) return <div className="text-center text-gray-400 py-10">Loading blogs...</div>;
  if (!blogs.length) return <div className="text-center text-gray-400 py-10">No blogs yet. Be the first to share your adventure!</div>;

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="relative rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer bg-gray-900 bg-opacity-70 shadow-lg animate-fade-in">
          {blog.image && (
            <img src={blog.image} alt={blog.title} className="object-cover w-full h-60" />
          )}
          <div className="p-4">
            <h4 className="text-xl font-bold mb-2 text-gradient">{blog.title}</h4>
            <p className="text-gray-300 text-sm line-clamp-4">{blog.content}</p>
            {blog.author && <p className="text-xs text-gray-400 mt-2">By {blog.author}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
