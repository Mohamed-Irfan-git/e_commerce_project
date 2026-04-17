import Link from "next/link";
import { getOrderById } from "@/lib/queries/orders";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetails({ params }: Props) {
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

        <Link
          href="/admin/orders"
          className="mb-6 inline-block text-indigo-300 hover:text-indigo-200"
        >
          ← Back
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

          <h1 className="text-2xl font-bold mb-4">
            Order #{order.order_number}
          </h1>

          <p className="text-sm text-slate-400">
            Status: {order.order_status}
          </p>
          <p className="text-sm text-slate-400">
            Payment: {order.payment_status}
          </p>

          {/* Items */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-3">Items</h2>

            <div className="space-y-3">
              {order.order_items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between rounded-xl border border-white/10 p-4"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-slate-400">
                      {item.quantity} × Rs. {item.unit_price}
                    </p>
                  </div>

                  <p className="font-semibold text-indigo-300">
                    Rs. {item.line_total}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal</span>
              <span>Rs. {order.subtotal}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>Delivery</span>
              <span>Rs. {order.delivery_fee}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>Rs. {order.total_amount}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}