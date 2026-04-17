import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getOrderById } from "@/lib/queries/orders";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsPage({ params }: Props) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Please login to view order details
      </div>
    );
  }

  const { id } = await params;
  const order = await getOrderById(Number(id));

  if (!order) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            href="/account/orders"
            className="text-sm text-indigo-300 hover:text-indigo-200"
          >
            ← Back to Orders
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                Order #{order.order_number}
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                Created on {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-sm text-slate-400">
                Order Status:{" "}
                <span className="font-medium text-white">
                  {order.order_status}
                </span>
              </p>
              <p className="text-sm text-slate-400">
                Payment Status:{" "}
                <span className="font-medium text-white">
                  {order.payment_status}
                </span>
              </p>
            </div>
          </div>

          {order.addresses && (
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
              <h2 className="text-lg font-semibold">Delivery Address</h2>
              <div className="mt-3 text-sm text-slate-300">
                <p className="font-medium text-white">{order.addresses.full_name}</p>
                <p>{order.addresses.phone}</p>
                <p>{order.addresses.line1}</p>
                {order.addresses.line2 && <p>{order.addresses.line2}</p>}
                <p>
                  {order.addresses.city}
                  {order.addresses.district
                    ? `, ${order.addresses.district}`
                    : ""}
                </p>
                {order.addresses.postal_code && (
                  <p>{order.addresses.postal_code}</p>
                )}
                <p>{order.addresses.country}</p>
              </div>
            </div>
          )}

          <div className="mt-8">
            <h2 className="text-lg font-semibold">Items</h2>

            <div className="mt-4 space-y-3">
              {order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{item.product_name}</p>
                    <p className="text-sm text-slate-400">
                      Rs. {item.unit_price} × {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-indigo-300">
                    Rs. {item.line_total}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
            <h2 className="text-lg font-semibold">Payment</h2>

            {order.payments && order.payments.length > 0 ? (
              <div className="mt-3 space-y-2 text-sm text-slate-300">
                {order.payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between"
                  >
                    <p>
                      {payment.provider}
                      {payment.payment_method
                        ? ` - ${payment.payment_method}`
                        : ""}
                    </p>
                    <p className="font-medium text-white">
                      {payment.status} | Rs. {payment.amount}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-400">No payment records found</p>
            )}
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-slate-300">
                <span>Subtotal</span>
                <span>Rs. {order.subtotal}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Delivery Fee</span>
                <span>Rs. {order.delivery_fee}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-white">
                <span>Total</span>
                <span>Rs. {order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}