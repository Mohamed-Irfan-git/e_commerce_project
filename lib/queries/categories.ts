import { createClient } from "@/lib/supabase/server";
import { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    console.error("getCategories error:", error.message);
    return [];
  }

  return (data as Category[]) ?? [];
}