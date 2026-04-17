import { getProducts } from "@/lib/queries/products";
import ProductGrid from "@/components/shop/product-grid";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        
        <h1 className="mb-8 text-3xl font-bold">Shop</h1>

        <ProductGrid products={products} />
        
      </div>
    </div>
  );
}