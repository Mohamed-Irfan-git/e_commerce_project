import { Address } from "@/types/address";

type Props = {
  addresses: Address[];
  selectedAddressId: number | null;
  onChange: (addressId: number) => void;
};

export default function AddressSelector({
  addresses,
  selectedAddressId,
  onChange,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="text-xl font-semibold">Select Delivery Address</h2>

      <div className="mt-4 space-y-3">
        {addresses.length === 0 ? (
          <p className="text-sm text-slate-400">No saved addresses found.</p>
        ) : (
          addresses.map((address) => (
            <label
              key={address.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 p-4 hover:bg-white/5"
            >
              <input
                type="radio"
                name="address"
                checked={selectedAddressId === address.id}
                onChange={() => onChange(address.id)}
                className="mt-1"
              />

              <div className="text-sm text-slate-300">
                <p className="font-medium text-white">{address.full_name}</p>
                <p>{address.phone}</p>
                <p>{address.line1}</p>
                {address.line2 && <p>{address.line2}</p>}
                <p>
                  {address.city}
                  {address.district ? `, ${address.district}` : ""}
                </p>
                {address.postal_code && <p>{address.postal_code}</p>}
                <p>{address.country}</p>
              </div>
            </label>
          ))
        )}
      </div>
    </div>
  );
}