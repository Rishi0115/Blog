import Link from "next/link";
import { posts } from "@/lib/posts";

export default function PostPage({ params }) {
  const post = posts.find((p) => p.id === params.id);

  if (!post) {
    return (
      <div className="mx-auto max-w-6xl px-4">
        <p>Post not found.</p>
        <Link href="/" className="text-blue-600">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4">
      <article>
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
        <p className="mt-4">{post.content}</p>

        <div className="flex gap-2 mt-6">
          <Link href={`/admin/edit/${post.id}`} className="border px-4 py-2">
            Edit
          </Link>
          <button type="button" className="border px-4 py-2">
            Delete
          </button>
        </div>

        <Link href="/" className="text-blue-600 mt-4 inline-block">
          Back to home
        </Link>
      </article>
    </div>
  );
}
