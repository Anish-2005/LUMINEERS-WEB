"use client";

import { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Upload, 
  Globe, 
  MapPin, 
  Camera, 
  BookOpen,
  X,
  Send,
  User,
  LogOut
} from "lucide-react";

export default function BlogUpload() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useState(null);
  const [writingProgress, setWritingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("write");
  const [inspiration, setInspiration] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [tags, setTags] = useState([]);
  const fileInputRef = useRef(null);

  const travelInspirations = [
    "Describe a moment that took your breath away",
    "Share a local tradition you experienced",
    "Tell us about a stranger who became a friend",
    "What unexpected discovery changed your journey?",
    "Describe the taste of a memorable meal",
  ];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const progress = ((title.length + content.length) / 2000) * 100;
    setWritingProgress(Math.min(progress, 100));
    setCharacterCount(content.length);
  }, [title, content]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleInspire = () => {
    setInspiration(travelInspirations[Math.floor(Math.random() * travelInspirations.length)]);
  };

  const handleTagAdd = (tag) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };
  const handleTagRemove = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        imageUrl,
        tags,
        author: user?.displayName || "Anonymous",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
      setTitle("");
      setContent("");
      setImageUrl("");
      setTags([]);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      alert("Error uploading blog: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-900/80 rounded-xl shadow-lg p-8 mt-8 mb-12">
      <div className="flex items-center gap-3 mb-6">
        <Sparkles className="w-6 h-6 text-pink-400 animate-bounce" />
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400 text-transparent bg-clip-text">Share Your Travel Story</h2>
        <button
          className="ml-auto px-3 py-1 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white text-xs font-semibold shadow hover:scale-105 transition"
          onClick={handleInspire}
        >
          Inspire Me
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Content</label>
          <textarea
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            maxLength={1500}
            required
          />
          <div className="text-xs text-gray-400 mt-1">{characterCount}/1500 characters</div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
          />
          {imageUrl && (
            <img src={imageUrl} alt="Preview" className="mt-2 rounded-lg w-full max-h-64 object-cover" />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Tags</label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-2 py-1 rounded bg-pink-400 text-white text-xs font-semibold flex items-center gap-1">
                {tag}
                <button type="button" onClick={() => handleTagRemove(tag)}>
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              type="text"
              className="px-2 py-1 rounded bg-gray-800 text-white text-xs"
              placeholder="Add tag..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  handleTagAdd(e.target.value.trim());
                  e.target.value = "";
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow hover:scale-105 transition"
            disabled={loading}
          >
            <Upload className="inline w-5 h-5 mr-2" />
            {loading ? "Uploading..." : "Upload Blog"}
          </button>
          {success && (
            <span className="text-green-400 font-semibold">Blog uploaded!</span>
          )}
          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full"
              style={{ width: `${writingProgress}%` }}
            />
          </div>
        </div>
        {inspiration && (
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-pink-400/20 to-blue-400/20 text-white text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>{inspiration}</span>
            <button type="button" className="ml-auto" onClick={() => setInspiration("")}> <X className="w-4 h-4 text-pink-400" /> </button>
          </div>
        )}
      </form>
    </div>
  );
}
