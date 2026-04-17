export type OrderItem = {
  id: number;
  order_id: number;
  product_id: number | null;
  product_name: string;
  product_slug: string | null;
  unit_price: number;
  quantity: number;
  line_total: number;
};