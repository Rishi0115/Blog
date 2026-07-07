"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`posts/${id}/`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEdit = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      alert("Please login through admin id to edit posts.");
      return;
    }
    if (role !== "admin") {
      alert("You are not admin. You are not allowed to edit this post.");
      return;
    }
    router.push(`/admin/edit/${post.id}`);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token) {
      alert("Please login through admin id to delete posts.");
      return;
    }
    if (role !== "admin") {
      alert("You are not admin. You are not allowed to delete this post.");
      return;
    }
    try {
      await api.delete(`posts/${post.id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      router.push("/");
    } catch {
      alert("Failed to delete post.");
    }
  };

  if (loading) {
    return (
      <div className="post-detail-page">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-detail-page">
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>Post not found.</p>
        <Link href="/" className="back-link">← Back to home</Link>
      </div>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="post-detail-page">
      <article>
        <h1 className="post-title">{post.title}</h1>
        {formattedDate && <p className="post-date">{formattedDate}</p>}
        <p className="post-content">{post.content}</p>
        <div className="post-actions">
          <button type="button" onClick={handleEdit} className="btn btn-outline">
            Edit
          </button>
          <button type="button" onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        </div>
      </article>
      <Link href="/" className="back-link">← Back to home</Link>
    </div>
  );
}
