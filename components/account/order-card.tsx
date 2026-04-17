import Link from "next/link";
import { Order } from "@/types/order";

type Props = {
  order: Order;
  href?: string;
};

export default function OrderCard({ order, href }: Props) {
  const content = (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Order #{order.order_number}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Status: {order.order_status}
          </p>
          <p className="text-sm text-slate-400">
            Payment: {order.payment_status}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-lg font-semibold text-indigo-300">
            Rs. {order.total_amount}
          </p>
          <p className="text-sm text-slate-400">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}