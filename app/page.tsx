import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white px-6 text-center">
      
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Welcome to IrfanStore 🚀
      </h1>

      <p className="max-w-xl text-slate-300 mb-8">
        A modern e-commerce platform built with Next.js and Supabase.
        Explore products, manage your cart, and experience fast checkout.
      </p>

      <Link
        href="/shop"
        className="rounded-xl bg-indigo-500 px-8 py-3 font-medium hover:bg-indigo-600"
      >
        Start Shopping
      </Link>

    </div>
  );
}