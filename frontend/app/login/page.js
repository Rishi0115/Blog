"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("auth/login/", new URLSearchParams({ username, password }));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      alert("Login successful!");
      router.push("/");
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Welcome back</h1>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              placeholder="Enter your username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary form-submit">
            Login
          </button>
        </form>
        <p className="form-footer">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </p>
        <p className="form-footer">
          Admin? <Link href="/admin/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
