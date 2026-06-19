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
    api.get(`posts/${id}/`)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      router.push("/");
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <p>Post not found.</p>
        <Link href="/" className="text-blue-600">
          Back to home
        </Link>
      </div>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="mx-auto max-w-6xl px-4">
      <article>
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
        <p className="mt-4">{post.content}</p>

        <div className="flex gap-2 mt-6">
          <button type="button" onClick={handleEdit} className="border px-4 py-2">
            Edit
          </button>
          <button type="button" onClick={handleDelete} className="border px-4 py-2">
            Delete
          </button>
        </div>

        <Link href="/" className="text-blue-600 mt-4 inline-block">
          Back to home
        </Link>
      </article>
    </div>
  );
}

