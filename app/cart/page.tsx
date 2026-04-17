import { createClient } from "@/lib/supabase/server";
import { getCartItems } from "@/lib/queries/cart";
import CartItem from "@/components/cart/cart-item";
import CartSummary from "@/components/cart/cart-summary";
import Link from "next/link";

export default async function CartPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 to-slate-800 px-6 text-white">
        <h1 className="text-2xl font-bold">Please login to view your cart</h1>
        <Link
          href="/auth/login"
          className="rounded-xl bg-indigo-500 px-6 py-3 font-medium hover:bg-indigo-600"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const items = await getCartItems(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-slate-300">Your cart is empty</p>
            <Link
              href="/shop"
              className="mt-5 inline-block rounded-xl bg-indigo-500 px-6 py-3 font-medium hover:bg-indigo-600"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <CartSummary items={items} />
          </div>
        )}
      </div>
    </div>
  );
}