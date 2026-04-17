import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Please login as admin
      </div>
    );
  }

  // 🔥 Optional: later check role from profiles table
  // if (user.role !== "admin") return ...

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-3">

          <Link
            href="/admin/products"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="mt-2 text-sm text-slate-300">
              Manage all products
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">Categories</h2>
            <p className="mt-2 text-sm text-slate-300">
              Manage categories
            </p>
          </Link>

          <Link
            href="/admin/brands"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">Brands</h2>
            <p className="mt-2 text-sm text-slate-300">
              Manage brands
            </p>
          </Link>

          <Link
            href="/admin/orders"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="mt-2 text-sm text-slate-300">
              Manage customer orders
            </p>
          </Link>

        </div>

      </div>
    </div>
  );
}