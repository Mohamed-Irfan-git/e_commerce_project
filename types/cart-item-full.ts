import { CartItem } from "./cart-item";

export type CartItemFull = CartItem & {
  products?: {
    id: number;
    name: string;
    slug: string;
    price: number;
    stock_qty: number;
  } | null;
};