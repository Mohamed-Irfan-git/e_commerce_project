import { Order } from "./order";
import { OrderItem } from "./order-item";
import { Address } from "./address";
import { Payment } from "./payment";

export type OrderFull = Order & {
  addresses?: Address | null;
  order_items?: OrderItem[];
  payments?: Payment[];
};