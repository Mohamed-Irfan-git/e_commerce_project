import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/account/profile-form";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 to-slate-800 px-6 text-white">
        <h1 className="text-2xl font-bold">Please login to view your account</h1>
        <Link
          href="/auth/login"
          className="rounded-xl bg-indigo-500 px-6 py-3 font-medium hover:bg-indigo-600"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">My Account</h1>

        <div className="grid gap-6 md:grid-cols-3">
          <Link
            href="/account/orders"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">My Orders</h2>
            <p className="mt-2 text-sm text-slate-300">
              View your order history and order details
            </p>
          </Link>

          <Link
            href="/account/addresses"
            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
          >
            <h2 className="text-xl font-semibold">My Addresses</h2>
            <p className="mt-2 text-sm text-slate-300">
              Manage saved delivery addresses
            </p>
          </Link>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Logged in</h2>
            <p className="mt-2 break-all text-sm text-slate-300">{user.email}</p>
          </div>
        </div>

        <div className="mt-8">
          <ProfileForm
            fullName={profile?.full_name || ""}
            phone={profile?.phone || ""}
          />
        </div>
      </div>
    </div>
  );
}