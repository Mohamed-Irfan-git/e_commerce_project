import { createClient } from "@/lib/supabase/server";
import { Order } from "@/types/order";
import { OrderFull } from "@/types/order-full";


export async function getOrders(userId: string): Promise<Order[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getOrders error:", error.message);
    return [];
  }

  return (data as Order[]) ?? [];
}

export async function getOrderById(orderId: number): Promise<OrderFull | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      *,
      addresses (
        id,
        full_name,
        phone,
        line1,
        line2,
        city,
        district,
        postal_code,
        country,
        is_default,
        created_at
      ),
      order_items (
        id,
        order_id,
        product_id,
        product_name,
        product_slug,
        unit_price,
        quantity,
        line_total
      ),
      payments (
        id,
        order_id,
        provider,
        payment_method,
        provider_ref,
        amount,
        currency,
        status,
        failure_reason,
        gateway_payload,
        paid_at,
        created_at
      )
    `)
    .eq("id", orderId)
    .single();

  if (error) {
    console.error("getOrderById error:", error.message);
    return null;
  }

  return data as OrderFull;
}