"use client";

import { useState } from "react";
import { Address } from "@/types/address";
import AddressSelector from "@/components/checkout/address-selector";
import PaymentForm from "@/components/checkout/payment-form";

type Props = {
  addresses: Address[];
  user: {
    email?: string;
  };
};

export default function CheckoutForm({ addresses, user }: Props) {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    addresses.find((a) => a.is_default)?.id ?? addresses[0]?.id ?? null
  );

  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<{
    orderId: number;
    amount: number;
    fullName: string;
    email: string;
    phone: string;
  } | null>(null);

  async function handleCreateOrder() {
    if (!selectedAddressId) {
      alert("Please select an address");
      return;
    }

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

    if (!selectedAddress) {
      alert("Selected address not found");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId: selectedAddressId,
          paymentMethod: "payhere",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      setOrderData({
        orderId: data.orderId,
        amount: data.totalAmount,
        fullName: selectedAddress.full_name,
        email: user.email || "customer@example.com",
        phone: selectedAddress.phone,
      });
    } catch (error) {
      console.error(error);
      alert("Could not create order");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <AddressSelector
        addresses={addresses}
        selectedAddressId={selectedAddressId}
        onChange={setSelectedAddressId}
      />

      {!orderData ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
          <h2 className="text-xl font-semibold">Continue to Payment</h2>
          <p className="mt-3 text-sm text-slate-300">
            Create your order first, then proceed to PayHere payment.
          </p>

          <button
            onClick={handleCreateOrder}
            disabled={loading || !selectedAddressId}
            className="mt-6 rounded-xl bg-indigo-500 px-6 py-3 font-medium text-white hover:bg-indigo-600 disabled:opacity-60"
          >
            {loading ? "Creating Order..." : "Continue to PayHere"}
          </button>
        </div>
      ) : (
        <PaymentForm orderData={orderData} />
      )}
    </div>
  );
}