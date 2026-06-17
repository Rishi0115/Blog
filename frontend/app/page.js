"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/posts";

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">Posts</h1>
        <div className="flex gap-2">
          <Link href="/login" className="border px-4 py-2">
            Login
          </Link>
          <Link href="/create" className="bg-black text-white px-4 py-2">
            Write Post
          </Link>
        </div>
      </div>
      {loading ? (
        <p className="text-center text-gray-500 mt-10">Loading posts...</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="border p-2 w-full rounded mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="border px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= totalPages}
              className="border px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
