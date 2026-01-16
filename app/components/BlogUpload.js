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

import BlogUploadAuthPrompt from "./BlogUploadAuthPrompt";
import BlogUploadHeader from "./BlogUploadHeader";
import BlogUploadSidebar from "./BlogUploadSidebar";
import BlogUploadForm from "./BlogUploadForm";

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
    return <BlogUploadAuthPrompt handleLogin={handleLogin} />;
  }

  return (
    <div className="relative min-h-[80vh] px-4 py-8">
      {/* Interactive background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gray-600"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {i % 3 === 0 ? "📍" : i % 3 === 1 ? "📷" : "📖"}
          </div>
        ))}
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <BlogUploadHeader user={user} writingProgress={writingProgress} handleLogout={handleLogout} />
        <div className="grid lg:grid-cols-3 gap-8">
          <BlogUploadSidebar
            inspiration={inspiration}
            handleInspirationClick={handleInspirationClick}
            tags={tags}
            handleAddTag={handleAddTag}
            handleRemoveTag={handleRemoveTag}
            characterCount={characterCount}
            content={content}
          />
          <div className="lg:col-span-2">
            {/* Tabs can be re-added here if needed */}
            <BlogUploadForm
              title={title}
              setTitle={setTitle}
              content={content}
              setContent={setContent}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
              fileInputRef={fileInputRef}
              loading={loading}
              handleSubmit={handleSubmit}
              success={success}
            />
          </div>
        </div>
      </div>
    </div>
  );
}