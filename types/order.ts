export type Order = {
  id: number;
  order_number: string;
  user_id: string;
  address_id: number | null;
  order_status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled";
  payment_status:
    | "pending"
    | "authorized"
    | "paid"
    | "failed"
    | "refunded";
  subtotal: number;
  delivery_fee: number;
  total_amount: number;
  currency: string;
  notes: string | null;
  created_at: string;
};