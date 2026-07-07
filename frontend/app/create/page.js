"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to publish a post.");
      return;
    }
    try {
      await api.post(
        "posts/",
        new URLSearchParams({
          title,
          content,
          category: "General",
          excerpt,
          is_published: "true",
        }),
        { headers: { Authorization: `Token ${token}` } }
      );
      router.push("/");
    } catch {
      setError("Failed to publish post. Please login first.");
    }
  };

  return (
    <div className="create-page">
      <h1 className="create-title">Write a post</h1>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
            placeholder="Give your post a title..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="form-input"
            placeholder="A short summary..."
          />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
            placeholder="Write your post here..."
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px" }}>
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
