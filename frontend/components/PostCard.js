import Link from "next/link";

export default function PostCard({ post }) {
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <article className="border rounded p-6">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="text-sm text-gray-500 mt-1">{formattedDate}</p>
      <p className="mt-2">{post.excerpt}</p>
      <Link href={`/posts/${post.id}`} className="text-blue-600 mt-2 inline-block">
        Read More
      </Link>
    </article>
  );
}

