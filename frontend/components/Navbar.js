"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        myblog
      </Link>
      <div className="navbar-right">
        <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-ghost">
            Logout
          </button>
        ) : (
          <Link href="/login" className="btn btn-ghost">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
