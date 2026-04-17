import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="text-white p-10">
        Error loading orders: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <h1 className="mb-8 text-3xl font-bold">All Orders</h1>

        {orders.length === 0 ? (
          <p className="text-slate-400">No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/admin/orders/${order.id}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  
                  <div>
                    <h2 className="text-lg font-semibold">
                      #{order.order_number}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Status: {order.order_status}
                    </p>
                    <p className="text-sm text-slate-400">
                      Payment: {order.payment_status}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-indigo-300">
                      Rs. {order.total_amount}
                    </p>
                    <p className="text-sm text-slate-400">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}