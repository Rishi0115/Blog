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
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      router.push("/");
    } catch (err) {
      setError("Failed to publish post. Please login first.");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="text-2xl font-bold mb-4">Write Post</h1>
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
    </div>
  );
}

