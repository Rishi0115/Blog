import Link from "next/link";

export default function PostCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article className="post-card">
      {formattedDate && <p className="post-card-date">{formattedDate}</p>}
      <h2 className="post-card-title">{post.title}</h2>
      <p className="post-card-excerpt">{post.excerpt}</p>
      <div className="post-card-footer">
        <Link href={`/posts/${post.id}`} className="read-more">
          Read more <span className="read-more-arrow">→</span>
        </Link>
      </div>
    </article>
  );
}
