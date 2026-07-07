import Link from "next/link";

export default function AdminLogin() {
  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Admin login</h1>
        <form>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="admin@example.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn btn-primary form-submit">
            Login
          </button>
        </form>
        <p className="form-footer">
          Don&apos;t have an admin account?{" "}
          <Link href="/admin/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
