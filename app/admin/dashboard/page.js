import Link from "next/link";
import { posts } from "@/lib/posts";

export default function Dashboard() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Link href="/admin/create" className="bg-black text-white px-4 py-2">
          Create Post
        </Link>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Date</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-b">
              <td className="p-2">{post.id}</td>
              <td className="p-2">{post.title}</td>
              <td className="p-2">{post.date}</td>
              <td className="p-2 flex gap-2">
                <Link
                  href={`/admin/edit/${post.id}`}
                  className="border px-3 py-1"
                >
                  Edit
                </Link>
                <button type="button" className="border px-3 py-1">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
