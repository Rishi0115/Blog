import Link from "next/link";

export default function AdminCreatePost() {
  return (
    <div className="create-page">
      <h1 className="create-title">Create post</h1>
      <form className="create-form">
        <div className="form-group">
          <label className="form-label">Title</label>
          <input type="text" className="form-input" placeholder="Post title..." />
        </div>
        <div className="form-group">
          <label className="form-label">Excerpt</label>
          <input type="text" className="form-input" placeholder="Short summary..." />
        </div>
        <div className="form-group">
          <label className="form-label">Content</label>
          <textarea className="form-textarea" placeholder="Write your post..." />
        </div>
        <div>
          <button type="submit" className="btn btn-primary" style={{ padding: "10px 24px" }}>
            Publish
          </button>
        </div>
      </form>
      <Link href="/admin/dashboard" className="back-link">← Back to dashboard</Link>
    </div>
  );
}
