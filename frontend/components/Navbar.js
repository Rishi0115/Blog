"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
    window.location.reload();
  };

  return (
    <nav className="border-b p-4 flex gap-4">
      <Link href="/">Home</Link>
      {isLoggedIn && (
        <button onClick={handleLogout} className="text-red-600 hover:underline">
          Logout
        </button>
      )}
    </nav>
  );
}

