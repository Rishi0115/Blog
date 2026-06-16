export default function AdminLogin() {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" className="border p-2 w-full" />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input type="password" className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-black text-white px-4 py-2">
          Login
        </button>
      </form>
    </div>
  );
}
