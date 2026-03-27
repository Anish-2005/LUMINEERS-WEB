"use client";

import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
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
  const [inspiration, setInspiration] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [tags, setTags] = useState([]);

  const travelInspirations = [
    "Describe the moment the destination felt real.",
    "Share one local ritual that changed your perspective.",
    "Capture a conversation that defined the journey.",
    "Write about a detour that became the highlight.",
    "Document the sensory memory you still carry home.",
  ];

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (nextUser) => setUser(nextUser));
    return () => unsub();
  }, []);

  useEffect(() => {
    const progress = ((title.length + content.length) / 2200) * 100;
    setWritingProgress(Math.min(progress, 100));
    setCharacterCount(content.length);
  }, [title, content]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
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
      setTimeout(() => setSuccess(false), 2600);
    } catch (error) {
      console.error("Failed to publish story:", error);
      alert("Unable to publish the story right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = (tag) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags((prev) => [...prev, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleInspirationClick = () => {
    const nextPrompt = travelInspirations[Math.floor(Math.random() * travelInspirations.length)];
    setInspiration(nextPrompt);
  };

  if (!user) {
    return (
      <div className="container-shell">
        <BlogUploadAuthPrompt handleLogin={handleLogin} />
      </div>
    );
  }

  return (
    <section className="container-shell">
      <div className="relative overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-950/75 p-4 sm:p-6 lg:p-8">
        <div className="pointer-events-none absolute left-8 top-0 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-8 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative z-10">
          <BlogUploadHeader user={user} writingProgress={writingProgress} handleLogout={handleLogout} />
          <div className="grid gap-6 lg:grid-cols-3">
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
              <BlogUploadForm
                title={title}
                setTitle={setTitle}
                content={content}
                setContent={setContent}
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                loading={loading}
                handleSubmit={handleSubmit}
                success={success}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
