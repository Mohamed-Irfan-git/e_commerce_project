import { CartItemFull } from "@/types/cart-item-full";

type Props = {
  items: CartItemFull[];
};

export default function OrderSummary({ items }: Props) {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.products?.price || 0) * item.quantity;
  }, 0);

  const deliveryFee = items.length > 0 ? 300 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="text-xl font-semibold">Order Summary</h2>

      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm text-slate-300"
          >
            <div>
              <p className="font-medium text-white">
                {item.products?.name || "Product"}
              </p>
              <p>
                Rs. {item.products?.price || 0} × {item.quantity}
              </p>
            </div>

            <p className="font-medium text-white">
              Rs. {(item.products?.price || 0) * item.quantity}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3 border-t border-white/10 pt-4 text-sm">
        <div className="flex justify-between text-slate-300">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>

        <div className="flex justify-between text-slate-300">
          <span>Delivery</span>
          <span>Rs. {deliveryFee}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold text-white">
          <span>Total</span>
          <span>Rs. {total}</span>
        </div>
      </div>
    </div>
  );
}