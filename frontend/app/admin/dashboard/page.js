import Link from "next/link";
import { posts } from "@/lib/posts";

export default function Dashboard() {
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Dashboard</h1>
        <Link href="/admin/create" className="btn btn-primary">
          Create Post
        </Link>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td style={{ color: "var(--text-muted)", width: "50px" }}>{post.id}</td>
              <td>{post.title}</td>
              <td style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}>{post.date}</td>
              <td>
                <div className="table-actions">
                  <Link href={`/admin/edit/${post.id}`} className="btn btn-outline" style={{ fontSize: "0.8rem", padding: "5px 12px" }}>
                    Edit
                  </Link>
                  <button type="button" className="btn btn-danger" style={{ fontSize: "0.8rem", padding: "5px 12px" }}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
