import { createClient } from "@/lib/supabase/server";
import { ProductImage } from "@/types/product-image";

export async function getProductImages(productId: number): Promise<ProductImage[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("is_primary", { ascending: false });

  if (error) {
    console.error("getProductImages error:", error.message);
    return [];
  }

  return (data as ProductImage[]) ?? [];
}