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
    api.get(`posts/${id}/`)
      .then((res) => {
        setTitle(res.data.title || "");
        setExcerpt(res.data.excerpt || "");
        setContent(res.data.content || "");
      })
      .catch((err) => {
        setError("Failed to load post.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    try {
      await api.patch(
        `posts/${id}/`,
        new URLSearchParams({ title, content, excerpt }),
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      router.push(`/posts/${id}`);
    } catch (err) {
      setError("Failed to update post. Please make sure you are logged in as admin.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 mt-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Excerpt</label>
          <input
            type="text"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border p-2 w-full h-32"
          />
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2">
          Publish
        </button>
      </form>
      <Link href="/admin/dashboard" className="text-blue-600 mt-4 inline-block">
        Back to dashboard
      </Link>
    </div>
  );
}

