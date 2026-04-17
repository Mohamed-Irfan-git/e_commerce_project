"use client";

import { useState } from "react";

type Props = {
  fullName: string;
  phone: string;
};

export default function ProfileForm({ fullName, phone }: Props) {
  const [form, setForm] = useState({
    full_name: fullName || "",
    phone: phone || "",
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

      const res = await fetch("/api/account/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      alert("Profile updated");
    } catch (error) {
      console.error(error);
      alert("Could not update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6"
    >
      <h2 className="text-xl font-semibold text-white">Profile</h2>

      <input
        type="text"
        name="full_name"
        placeholder="Full Name"
        value={form.full_name}
        onChange={handleChange}
        className="w-full rounded-lg bg-white/10 px-4 py-3 text-white outline-none"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full rounded-lg bg-white/10 px-4 py-3 text-white outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}