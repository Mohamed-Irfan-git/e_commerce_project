"use client";

import { useState } from "react";

type Props = {
  productId: number;
};

export default function AddToCartButton({ productId }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleAddToCart() {
    try {
      setLoading(true);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error("Failed to add to cart");
      }

      alert("Added to cart");
    } catch (error) {
      console.error(error);
      alert("Could not add to cart");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className="mt-8 rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  );
}