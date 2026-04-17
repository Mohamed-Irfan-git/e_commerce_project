import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getOrders } from "@/lib/queries/orders";
import OrderCard from "@/components/account/order-card";

export default async function OrdersPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Please login to view orders
      </div>
    );
  }

  const orders = await getOrders(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
            <p className="text-slate-300">No orders found</p>
            <Link
              href="/shop"
              className="mt-5 inline-block rounded-xl bg-indigo-500 px-6 py-3 font-medium hover:bg-indigo-600"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                href={`/account/orders/${order.id}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}