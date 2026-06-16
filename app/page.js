import Link from "next/link";
import PostCard from "@/components/PostCard";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        <div className="flex gap-2">
          <Link href="/login" className="border px-4 py-2">
            Login
          </Link>
          <Link href="/create" className="bg-black text-white px-4 py-2">
            Write Post
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
