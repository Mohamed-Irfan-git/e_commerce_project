import { ProductFull } from "@/types/product-full";
import ProductCard from "./product-card";

type Props = {
  products: ProductFull[];
};

export default function ProductGrid({ products }: Props) {
  if (!products.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-300">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}