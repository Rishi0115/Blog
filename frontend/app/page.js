"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PostCard from "@/components/PostCard";
import api from "@/lib/api";

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`posts/?page=${currentPage}`)
      .then((res) => {
        setPosts(res.data.results || []);
        setTotalCount(res.data.count || 0);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return (
    <div className="page">
      <div className="posts-header">
        <h1>Posts</h1>
        <div className="header-btns">
          <Link href="/create" className="btn btn-primary">
            Write Post
          </Link>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading posts...</p>
      ) : (
        <>
          <div className="search-wrap">
            <span className="search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="search-input"
            />
          </div>

          <div className="posts-grid">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="btn btn-outline"
            >
              ← Prev
            </button>
            <span className="pagination-info">
              {currentPage} / {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= totalPages}
              className="btn btn-outline"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}
