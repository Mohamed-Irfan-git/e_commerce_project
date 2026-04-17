"use client";

import { useState } from "react";

type Props = {
  initialData?: {
    id?: number;
    full_name?: string;
    phone?: string;
    line1?: string;
    line2?: string;
    city?: string;
    district?: string;
    postal_code?: string;
    country?: string;
    is_default?: boolean;
  };
};

export default function AddressForm({ initialData }: Props) {
  const [form, setForm] = useState({
    id: initialData?.id,
    full_name: initialData?.full_name || "",
    phone: initialData?.phone || "",
    line1: initialData?.line1 || "",
    line2: initialData?.line2 || "",
    city: initialData?.city || "",
    district: initialData?.district || "",
    postal_code: initialData?.postal_code || "",
    country: initialData?.country || "Sri Lanka",
    is_default: initialData?.is_default || false,
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/account/addresses", {
        method: form.id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to save address");
      }

      alert(form.id ? "Address updated" : "Address added");
    } catch (error) {
      console.error(error);
      alert("Could not save address");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-white"
    >
      <h2 className="text-xl font-semibold">
        {form.id ? "Edit Address" : "Add Address"}
      </h2>

      <input
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <input
        name="line1"
        placeholder="Address Line 1"
        value={form.line1}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <input
        name="line2"
        placeholder="Address Line 2"
        value={form.line2}
        onChange={handleChange}
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <input
        name="city"
        placeholder="City"
        value={form.city}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <input
        name="district"
        placeholder="District"
        value={form.district}
        onChange={handleChange}
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <input
        name="postal_code"
        placeholder="Postal Code"
        value={form.postal_code}
        onChange={handleChange}
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <input
        name="country"
        placeholder="Country"
        value={form.country}
        onChange={handleChange}
        required
        className="w-full rounded-lg bg-white/10 px-4 py-3 outline-none"
      />

      <label className="flex items-center gap-3 text-sm text-slate-300">
        <input
          type="checkbox"
          name="is_default"
          checked={form.is_default}
          onChange={handleChange}
        />
        Set as default address
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
}