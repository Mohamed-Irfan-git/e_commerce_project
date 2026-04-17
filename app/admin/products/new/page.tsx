"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          stock_qty: Number(form.stock),
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create product");
      }

      alert("Product created");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Error creating product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-3xl font-bold">Add Product</h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <input
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
          />

          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
          />

          <input
            name="stock"
            placeholder="Stock Quantity"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-500 py-3 font-medium hover:bg-indigo-600 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}