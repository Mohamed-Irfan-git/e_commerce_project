import { createClient } from "@/lib/supabase/server";
import { getAddresses } from "@/lib/queries/addresses";
import AddressForm from "@/components/account/address-form";
import AddressCard from "@/components/account/address-card";

export default async function AddressesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Please login to view addresses
      </div>
    );
  }

  const addresses = await getAddresses(user.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">My Addresses</h1>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            {addresses.length === 0 ? (
              <p className="text-slate-400">No addresses found</p>
            ) : (
              addresses.map((address) => (
                <AddressCard key={address.id} address={address} />
              ))
            )}
          </div>

          <div>
            <AddressForm />
          </div>
        </div>
      </div>
    </div>
  );
}