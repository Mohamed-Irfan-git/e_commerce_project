import { createClient } from "@/lib/supabase/server";
import { Payment } from "@/types/payment";

export async function createPaymentRecord(data: {
  order_id: number;
  provider: string;
  payment_method?: string | null;
  provider_ref?: string | null;
  amount: number;
  currency?: string;
  status?: "pending" | "authorized" | "paid" | "failed" | "refunded";
  failure_reason?: string | null;
  gateway_payload?: any;
  paid_at?: string | null;
}): Promise<Payment | null> {
  const supabase = await createClient();

  const { data: payment, error } = await supabase
    .from("payments")
    .insert({
      order_id: data.order_id,
      provider: data.provider,
      payment_method: data.payment_method ?? null,
      provider_ref: data.provider_ref ?? null,
      amount: data.amount,
      currency: data.currency ?? "LKR",
      status: data.status ?? "pending",
      failure_reason: data.failure_reason ?? null,
      gateway_payload: data.gateway_payload ?? null,
      paid_at: data.paid_at ?? null,
    })
    .select()
    .single();

  if (error) {
    console.error("createPaymentRecord error:", error.message);
    return null;
  }

  return payment as Payment;
}

export async function getPaymentsByOrderId(orderId: number): Promise<Payment[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("order_id", orderId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getPaymentsByOrderId error:", error.message);
    return [];
  }

  return (data as Payment[]) ?? [];
}