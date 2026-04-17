import { createClient } from "@/lib/supabase/server";
import { getCartItems } from "@/lib/queries/cart";
import { getAddresses } from "@/lib/queries/addresses";
import OrderSummary from "@/components/checkout/order-summary";
import CheckoutForm from "./submit-form";
import Link from "next/link";

export default async function CheckoutPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 to-slate-800 px-6 text-white">
        <h1 className="text-2xl font-bold">Please login to checkout</h1>
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
  const addresses = await getAddresses(user.id);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 to-slate-800 px-6 text-white">
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <Link
          href="/shop"
          className="rounded-xl bg-indigo-500 px-6 py-3 font-medium hover:bg-indigo-600"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <CheckoutForm addresses={addresses} user={user} />
          </div>

          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}