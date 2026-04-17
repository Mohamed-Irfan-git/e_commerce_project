import { Category } from "./category";
import { Brand } from "./brand";
import { ProductImage } from "./product-image";
import { ProductSpec } from "./product-spec";
import { Product } from "./product";

export type ProductFull = Product & {
  categories?: Category | null;
  brands?: Brand | null;
  product_images?: ProductImage[];
  product_specs?: ProductSpec[];
};