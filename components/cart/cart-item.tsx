"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartItemFull } from "@/types/cart-item-full";

type Props = {
  item: CartItemFull;
};

export default function CartItem({ item }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRemove() {
    try {
      setLoading(true);

      const res = await fetch(`/api/cart/${item.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove item");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not remove item");
    } finally {
      setLoading(false);
    }
  }

  async function handleQuantityChange(newQuantity: number) {
    if (newQuantity <= 0) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/cart/${item.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) {
        throw new Error("Failed to update quantity");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not update quantity");
    } finally {
      setLoading(false);
    }
  }

  const price = item.products?.price || 0;
  const total = price * item.quantity;

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-4 text-white sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold">
          {item.products?.name || "Product"}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
          Rs. {price}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={loading || item.quantity <= 1}
          className="rounded-lg bg-white/10 px-3 py-1 hover:bg-white/20 disabled:opacity-50"
        >
          -
        </button>

        <span className="min-w-8 text-center font-medium">
          {item.quantity}
        </span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={loading}
          className="rounded-lg bg-white/10 px-3 py-1 hover:bg-white/20 disabled:opacity-50"
        >
          +
        </button>
      </div>

      <div className="flex items-center gap-4">
        <span className="font-medium">Rs. {total}</span>

        <button
          onClick={handleRemove}
          disabled={loading}
          className="rounded-lg bg-red-500 px-3 py-1 text-sm hover:bg-red-600 disabled:opacity-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
}