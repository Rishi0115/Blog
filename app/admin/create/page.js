import Link from "next/link";

export default function CreatePost() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input type="text" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Excerpt</label>
          <input type="text" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Content</label>
          <textarea className="border p-2 w-full h-32" />
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2">
          Publish
        </button>
      </form>
      <Link href="/admin/dashboard" className="text-blue-600 mt-4 inline-block">
        Back to dashboard
      </Link>
    </div>
  );
}
