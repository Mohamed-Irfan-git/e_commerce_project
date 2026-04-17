import { createClient } from "@/lib/supabase/server";
import { Brand } from "@/types/brand";

export async function getBrands(): Promise<Brand[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("brands")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("getBrands error:", error.message);
    return [];
  }

  return (data as Brand[]) ?? [];
}