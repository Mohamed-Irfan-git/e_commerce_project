export type Payment = {
  id: number;
  order_id: number;
  provider: string;
  payment_method: string | null;
  provider_ref: string | null;
  amount: number;
  currency: string;
  status:
    | "pending"
    | "authorized"
    | "paid"
    | "failed"
    | "refunded";
  failure_reason: string | null;
  gateway_payload: any;
  paid_at: string | null;
  created_at: string;
};