import Link from "next/link";

export default function Signup() {
  return (
    <div className="form-page">
      <div className="form-card">
        <h1 className="form-title">Create account</h1>
        <form>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" placeholder="Your name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="Create a password" />
          </div>
          <button type="submit" className="btn btn-primary form-submit">
            Sign Up
          </button>
        </form>
        <p className="form-footer">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
