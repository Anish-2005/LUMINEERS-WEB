"use client";

import { useState, useEffect, useRef } from "react";
import { db, auth } from "./firebase";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !user) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        image: imageUrl,
        author: user.displayName,
        authorPhoto: user.photoURL,
        authorId: user.uid,
        tags,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setContent("");
      setImageUrl("");
      setTags([]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      alert("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const handleAddTag = (tag) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInspirationClick = () => {
    const randomInspiration = travelInspirations[Math.floor(Math.random() * travelInspirations.length)];
    setInspiration(randomInspiration);
  };

  // Loading screen animation
  if (!user) {
    return (
      <div className="relative min-h-[80vh] flex items-center justify-center px-4">
        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[2px] h-[2px] bg-blue-400 rounded-full"
              initial={{ x: Math.random() * 100 + 'vw', y: Math.random() * 100 + 'vh' }}
              animate={{
                x: [null, Math.random() * 100 + 'vw'],
                y: [null, Math.random() * 100 + 'vh'],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 max-w-md w-full"
        >
          <div className="text-center mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <Globe className="w-20 h-20 text-blue-400" />
            </motion.div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Join the Chronicle
            </h1>
            <p className="text-gray-300 text-lg">
              Share your journey with fellow explorers. Your story awaits.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <button
              onClick={handleLogin}
              className="relative w-full px-8 py-4 rounded-3xl bg-gray-900/90 backdrop-blur-xl border border-white/10 flex items-center justify-center gap-3 text-xl font-semibold hover:bg-gray-900/70 transition-all"
            >
              <img 
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
                alt="Google" 
                className="w-6 h-6"
              />
              Continue with Google
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-400 text-sm">
              <Sparkles className="inline w-4 h-4 mr-2" />
              Your first story unlocks exclusive badges
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[80vh] px-4 py-8">
      {/* Interactive background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Floating elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-gray-600"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? <MapPin size={24} /> : i % 3 === 1 ? <Camera size={24} /> : <BookOpen size={24} />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10"
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative group"
            >
              <img
                src={user.photoURL}
                alt="author"
                className="w-16 h-16 rounded-2xl border-2 border-white/20 shadow-xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.div>
            <div>
              <p className="text-sm text-gray-400 flex items-center gap-2">
                <User size={14} />
                Writing as
              </p>
              <h2 className="text-2xl font-bold">{user.displayName}</h2>
              <p className="text-sm text-gray-500">Explorer Level: Adventurer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress indicator */}
            <div className="hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${writingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="text-sm text-gray-400">{Math.round(writingProgress)}%</span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all"
            >
              <LogOut size={16} />
              Logout
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left sidebar - Tools */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Inspiration Card */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="text-yellow-400" />
                <h3 className="font-semibold">Need Inspiration?</h3>
              </div>
              <AnimatePresence mode="wait">
                {inspiration && (
                  <motion.p
                    key={inspiration}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-gray-300 mb-4 italic"
                  >
                    "{inspiration}"
                  </motion.p>
                )}
              </AnimatePresence>
              <button
                onClick={handleInspirationClick}
                className="w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
              >
                Generate Prompt
              </button>
            </div>

            {/* Tags */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Add Tags</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <motion.span
                    key={tag}
                    layout
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-red-400"
                    >
                      <X size={12} />
                    </button>
                  </motion.span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["Adventure", "Culture", "Food", "Nature", "Urban", "Solo"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    disabled={tags.includes(tag)}
                    className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors text-sm text-center"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Story Stats</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Characters</span>
                    <span className={characterCount > 1500 ? "text-green-400" : ""}>
                      {characterCount}/2000
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${(characterCount / 2000) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <BookOpen size={14} />
                    {Math.ceil(content.split(" ").length / 200)} min read
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              {/* Form tabs */}
              <div className="border-b border-white/10">
                <div className="flex">
                  {["write", "preview", "publish"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-4 text-center font-medium transition-colors relative ${
                        activeTab === tab 
                          ? "text-white" 
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Title */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Story Title</label>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Untitled Journey..."
                      className="w-full text-3xl md:text-4xl font-bold bg-transparent border-none focus:outline-none placeholder-white"
                      required
                    />
                    <div className="mt-2 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Your Narrative</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Begin your tale here... Let the words flow like a river through uncharted lands."
                      className="w-full min-h-[300px] bg-transparent border-none focus:outline-none resize-none placeholder-white text-lg leading-relaxed"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="text-sm text-gray-100 mb-2 block flex items-center gap-2">
                      <Camera size={16} />
                      Cover Image URL
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://your-journey-image.com"
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-blue-500/50 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      >
                        Browse
                      </button>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {imageUrl && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group overflow-hidden rounded-2xl"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                      <img
                        src={imageUrl}
                        alt="preview"
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <p className="text-sm text-gray-300">Cover Preview</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 transition-all shadow-lg flex items-center justify-center gap-3 group"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Launching Your Story...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Publish to The Chronicle
                        <Sparkles className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </>
                    )}
                  </motion.button>

                  {/* Success message */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center py-4 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                      >
                        <div className="flex items-center justify-center gap-3">
                          <Sparkles className="text-green-400" />
                          <span className="text-green-400 font-semibold">
                            Your story is now traveling the world!
                          </span>
                          <Sparkles className="text-green-400" />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}