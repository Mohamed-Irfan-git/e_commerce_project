import Link from "next/link";
import { ProductFull } from "@/types/product-full";

type Props = {
  product: ProductFull;
};

export default function ProductCard({ product }: Props) {
  const primaryImage = product.product_images?.find((img) => img.is_primary);
  const imageUrl = primaryImage?.image_path || null;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-white shadow-sm transition hover:-translate-y-1 hover:border-indigo-400/40">
      <div className="flex h-56 items-center justify-center bg-gradient-to-br from-indigo-500/20 to-slate-700/30">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-slate-400">No image</span>
        )}
      </div>

      <div className="p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{product.name}</h3>

        {product.brands?.name && (
          <p className="mt-1 text-sm text-slate-400">{product.brands.name}</p>
        )}

        <p className="mt-2 line-clamp-2 text-sm text-slate-300">
          {product.short_description || product.description || "No description available"}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-indigo-300">
            Rs. {product.price}
          </span>

          <Link
            href={`/shop/${product.slug}`}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-600"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}