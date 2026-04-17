"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = Number(params.id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock_qty: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/admin/products/${productId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to load product");
        }

        setForm({
          name: data.name ?? "",
          price: String(data.price ?? ""),
          stock_qty: String(data.stock_qty ?? ""),
          is_active: Boolean(data.is_active),
        });
      } catch (error) {
        console.error(error);
        alert("Could not load product");
      } finally {
        setFetching(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          stock_qty: Number(form.stock_qty),
          is_active: form.is_active,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update product");
      }

      alert("Product updated");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not update product");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      alert("Product deleted");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not delete product");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-3xl font-bold">Edit Product</h1>

        <form
          onSubmit={handleUpdate}
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
            name="stock_qty"
            placeholder="Stock Quantity"
            type="number"
            value={form.stock_qty}
            onChange={handleChange}
            required
            className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
          />

          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
            />
            Active Product
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-500 py-3 font-medium hover:bg-indigo-600 disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>

          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="w-full rounded-xl bg-red-500 py-3 font-medium hover:bg-red-600 disabled:opacity-60"
          >
            Delete Product
          </button>
        </form>
      </div>
    </div>
  );
}