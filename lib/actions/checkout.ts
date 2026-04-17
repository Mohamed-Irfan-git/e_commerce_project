import { createClient } from "@/lib/supabase/server";
import { createPaymentRecord } from "@/lib/queries/payments";

export async function createOrder(
  userId: string,
  addressId: number,
  paymentMethod: string = "cod"
) {
  const supabase = await createClient();

  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select(`
      *,
      products (*)
    `)
    .eq("user_id", userId);

  if (cartError) {
    console.error("Cart fetch error:", cartError.message);
    return null;
  }

  if (!cartItems || cartItems.length === 0) {
    return null;
  }

  let subtotal = 0;

  for (const item of cartItems) {
    subtotal += item.quantity * item.products.price;
  }

  const delivery_fee = 300;
  const total_amount = subtotal + delivery_fee;

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: `ORD-${Date.now()}`,
      user_id: userId,
      address_id: addressId,
      subtotal,
      delivery_fee,
      total_amount,
      currency: "LKR",
      order_status: "pending",
      payment_status: paymentMethod === "cod" ? "pending" : "authorized",
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error("Order create error:", orderError?.message);
    return null;
  }

  for (const item of cartItems) {
    const { error: itemError } = await supabase.from("order_items").insert({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.products.name,
      product_slug: item.products.slug,
      unit_price: item.products.price,
      quantity: item.quantity,
      line_total: item.quantity * item.products.price,
    });

    if (itemError) {
      console.error("Order item insert error:", itemError.message);
    }
  }

  const provider =
    paymentMethod === "cod" ? "cash_on_delivery" : paymentMethod;

  const payment = await createPaymentRecord({
    order_id: order.id,
    provider,
    payment_method: paymentMethod,
    amount: total_amount,
    currency: "LKR",
    status: paymentMethod === "cod" ? "pending" : "authorized",
  });

  if (!payment) {
    console.error("Payment record creation failed");
  }

  const { error: clearCartError } = await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", userId);

  if (clearCartError) {
    console.error("Clear cart error:", clearCartError.message);
  }

  return order;
}