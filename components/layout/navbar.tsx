import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-slate-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="text-2xl font-bold text-indigo-400">
          IrfanStore
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-300">
            Home
          </Link>
          <Link href="/shop" className="hover:text-indigo-300">
            Shop
          </Link>
          <Link href="/cart" className="hover:text-indigo-300">
            Cart
          </Link>
          <Link href="/account" className="hover:text-indigo-300">
            Account
          </Link>
          <Link href="/admin" className="hover:text-indigo-300">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}