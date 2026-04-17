import { createClient } from "@/lib/supabase/server";
import { ProductFull } from "@/types/product-full";

export async function getProducts(): Promise<ProductFull[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug,
        created_at
      ),
      brands (
        id,
        name,
        slug,
        created_at
      ),
      product_images (
        id,
        product_id,
        image_path,
        is_primary,
        created_at
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProducts error:", error.message);
    return [];
  }

  return (data as ProductFull[]) ?? [];
}

export async function getProductBySlug(slug: string): Promise<ProductFull | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug,
        created_at
      ),
      brands (
        id,
        name,
        slug,
        created_at
      ),
      product_images (
        id,
        product_id,
        image_path,
        is_primary,
        created_at
      ),
      product_specs (
        id,
        product_id,
        spec_name,
        spec_value
      )
    `)
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("getProductBySlug error:", error.message);
    return null;
  }

  return data as ProductFull;
}

export async function getProductsByCategory(categorySlug: string): Promise<ProductFull[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories!inner (
        id,
        name,
        slug,
        created_at
      ),
      brands (
        id,
        name,
        slug,
        created_at
      ),
      product_images (
        id,
        product_id,
        image_path,
        is_primary,
        created_at
      )
    `)
    .eq("is_active", true)
    .eq("categories.slug", categorySlug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProductsByCategory error:", error.message);
    return [];
  }

  return (data as ProductFull[]) ?? [];
}

export async function getProductsByBrand(brandSlug: string): Promise<ProductFull[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug,
        created_at
      ),
      brands!inner (
        id,
        name,
        slug,
        created_at
      ),
      product_images (
        id,
        product_id,
        image_path,
        is_primary,
        created_at
      )
    `)
    .eq("is_active", true)
    .eq("brands.slug", brandSlug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getProductsByBrand error:", error.message);
    return [];
  }

  return (data as ProductFull[]) ?? [];
}

export async function searchProducts(search: string): Promise<ProductFull[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      categories (
        id,
        name,
        slug,
        created_at
      ),
      brands (
        id,
        name,
        slug,
        created_at
      ),
      product_images (
        id,
        product_id,
        image_path,
        is_primary,
        created_at
      )
    `)
    .eq("is_active", true)
    .or(`name.ilike.%${search}%,model.ilike.%${search}%,short_description.ilike.%${search}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("searchProducts error:", error.message);
    return [];
  }

  return (data as ProductFull[]) ?? [];
}