"use client";

import { useRouter } from "next/navigation";
import { Address } from "@/types/address";
import { useState } from "react";
import AddressForm from "./address-form";

type Props = {
  address: Address;
};

export default function AddressCard({ address }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  async function handleDelete() {
    const confirmed = confirm("Are you sure you want to delete this address?");
    if (!confirmed) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/account/addresses/${address.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete address");
      }

      alert("Address deleted");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Could not delete address");
    } finally {
      setLoading(false);
    }
  }

  if (editing) {
    return (
      <div className="space-y-3">
        <AddressForm
          initialData={{
            id: address.id,
            full_name: address.full_name,
            phone: address.phone,
            line1: address.line1,
            line2: address.line2 || "",
            city: address.city,
            district: address.district || "",
            postal_code: address.postal_code || "",
            country: address.country,
            is_default: address.is_default,
          }}
        />

        <button
          onClick={() => setEditing(false)}
          className="rounded-lg bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
        >
          Cancel Edit
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="font-medium text-white">{address.full_name}</p>
      <p className="text-sm text-slate-300">{address.phone}</p>

      <div className="mt-2 text-sm text-slate-400">
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}
          {address.district ? `, ${address.district}` : ""}
        </p>
        {address.postal_code && <p>{address.postal_code}</p>}
        <p>{address.country}</p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {address.is_default && (
          <span className="inline-block rounded-lg bg-indigo-500 px-3 py-1 text-xs text-white">
            Default
          </span>
        )}

        <button
          onClick={() => setEditing(true)}
          className="rounded-lg bg-amber-500 px-3 py-1 text-xs text-white hover:bg-amber-600"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded-lg bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-600 disabled:opacity-60"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}