"use client";

import { useState } from "react";

type Props = {
  orderData: {
    orderId: number;
    amount: number;
    fullName: string;
    email: string;
    phone: string;
  };
};

declare global {
  interface Window {
    payhere: {
      startPayment: (payment: Record<string, unknown>) => void;
      onCompleted: (orderId: string) => void;
      onDismissed: () => void;
      onError: (error: string) => void;
    };
  }
}

export default function PaymentForm({ orderData }: Props) {
  const [loading, setLoading] = useState(false);

  async function handlePayHere() {
    try {
      setLoading(true);

      const hashRes = await fetch("/api/payhere/hash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderData.orderId,
        }),
      });

      const hashData = await hashRes.json();

      if (!hashRes.ok) {
        throw new Error(hashData.error || "Failed to generate payment hash");
      }

      window.payhere.onCompleted = function () {
        alert("Payment completed");
        window.location.href = "/account/orders";
      };

      window.payhere.onDismissed = function () {
        alert("Payment dismissed");
      };

      window.payhere.onError = function (error: string) {
        console.error(error);
        alert("Payment failed");
      };

      const payment = {
        sandbox: true,
        merchant_id: process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID,
        return_url: "https://exalted-spender-wobble.ngrok-free.dev/account/orders",
        cancel_url: "https://exalted-spender-wobble.ngrok-free.dev/checkout",
        notify_url: "https://exalted-spender-wobble.ngrok-free.dev/api/payhere/notify",
        order_id: String(orderData.orderId),
        items: "IrfanStore Order",
        amount: hashData.amount,
        currency: hashData.currency,
        first_name: orderData.fullName,
        last_name: "",
        email: orderData.email,
        phone: orderData.phone,
        address: "Sri Lanka",
        city: "Colombo",
        country: "Sri Lanka",
        hash: hashData.hash,
      };


      

      window.payhere.startPayment(payment);
    } catch (error) {
      console.error(error);
      alert("Could not start PayHere payment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <h2 className="text-xl font-semibold">Payment</h2>

      <button
        onClick={handlePayHere}
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-green-500 py-3 font-medium hover:bg-green-600 disabled:opacity-60"
      >
        {loading ? "Starting Payment..." : "Pay with PayHere"}
      </button>
    </div>
  );
}