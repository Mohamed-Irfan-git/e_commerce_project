export type Product = {
  id: number;
  category_id: number | null;
  brand_id: number | null;
  name: string;
  slug: string;
  model: string | null;
  short_description: string | null;
  description: string | null;
  price: number;
  stock_qty: number;
  sku: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};