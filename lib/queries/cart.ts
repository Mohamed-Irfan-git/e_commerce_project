import { createClient } from "@/lib/supabase/server";
import { CartItemFull } from "@/types/cart-item-full";


export async function getCartItems(userId: string): Promise<CartItemFull[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      *,
      products (
        id,
        name,
        slug,
        price,
        stock_qty
      )
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getCartItems error:", error.message);
    return [];
  }

  return (data as CartItemFull[]) ?? [];
}


export async function addToCart(userId: string, productId: number) {
  const supabase = await createClient();

  const { data: existing, error } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle(); 

  if (error) {
    console.error("addToCart fetch error:", error.message);
    return;
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + 1 })
      .eq("id", existing.id);

    if (updateError) {
      console.error("updateCart error:", updateError.message);
    }
  } else {
    const { error: insertError } = await supabase
      .from("cart_items")
      .insert({
        user_id: userId,
        product_id: productId,
        quantity: 1,
      });

    if (insertError) {
      console.error("insertCart error:", insertError.message);
    }
  }
}


export async function removeFromCart(cartId: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartId);

  if (error) {
    console.error("removeFromCart error:", error.message);
  }
}


export async function updateCartQuantity(cartId: number, qty: number) {
  if (qty <= 0) {
    console.warn("Quantity must be greater than 0");
    return;
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("cart_items")
    .update({ quantity: qty })
    .eq("id", cartId);

  if (error) {
    console.error("updateCartQuantity error:", error.message);
  }
}