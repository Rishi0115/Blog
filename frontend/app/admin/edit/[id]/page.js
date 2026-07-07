"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`posts/${id}/`)
      .then((res) => {
        setTitle(res.data.title || "");
        setExcerpt(res.data.excerpt || "");
        setContent(res.data.content || "");
      })
      .catch(() => setError("Failed to load post."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    try {
      await api.patch(
        `posts/${id}/`,
        new URLSearchParams({ title, content, excerpt }),
        { headers: { Authorization: `Token ${token}` } }
      );
      router.push(`/posts/${id}`);
    } catch {
      setError("Failed to update post. Please make sure you are logged in as admin.");
    }
  };

  if (loading) {
    return (
      <div className="create-page">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  return (
    <div className="create-page">
      <h1 className="create-title">Edit post</h1>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-textarea"
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px" }}>
            Save changes
          </button>
        </div>
      </form>
      <Link href="/admin/dashboard" className="back-link">← Back to dashboard</Link>
    </div>
  );
}
