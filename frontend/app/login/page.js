import Link from "next/link";

export default function Login() {
  return (
    <div className="mx-auto max-w-6xl px-4 flex items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              className="border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        <p className="text-sm text-center mt-2 text-gray-500">
          Are you an admin?{" "}
          <Link href="/admin/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
