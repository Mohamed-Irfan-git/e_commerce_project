import Link from "next/link";
import { getProducts } from "@/lib/queries/products";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>

          <Link
            href="/admin/products/new"
            className="rounded-xl bg-indigo-500 px-5 py-3 font-medium hover:bg-indigo-600"
          >
            Add Product
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
            No products found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="grid grid-cols-5 gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-300">
              <p>Name</p>
              <p>Brand</p>
              <p>Price</p>
              <p>Stock</p>
              <p>Action</p>
            </div>

            <div className="divide-y divide-white/10">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-5 gap-4 px-6 py-4 text-sm"
                >
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-slate-300">{product.brands?.name || "-"}</p>
                  <p className="text-slate-300">Rs. {product.price}</p>
                  <p className="text-slate-300">{product.stock_qty}</p>
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-indigo-300 hover:text-indigo-200"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}