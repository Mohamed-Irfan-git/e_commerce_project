import { createClient } from "@/lib/supabase/server";
import { ProductSpec } from "@/types/product-spec";

export async function getProductSpecs(productId: number): Promise<ProductSpec[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("product_specs")
    .select("*")
    .eq("product_id", productId);

  if (error) {
    console.error("getProductSpecs error:", error.message);
    return [];
  }

  return (data as ProductSpec[]) ?? [];
}