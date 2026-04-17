import { getProductBySlug } from "@/lib/queries/products";
import AddToCartButton from "@/components/shop/add-to-cart-button";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Product not found
      </div>
    );
  }

  const primaryImage = product.product_images?.find((img) => img.is_primary);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-4">
          {primaryImage ? (
            <img
              src={primaryImage.image_path}
              alt={product.name}
              className="w-full rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-80 items-center justify-center text-slate-400">
              No image
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {product.brands?.name && (
            <p className="mt-2 text-slate-400">{product.brands.name}</p>
          )}

          <p className="mt-4 text-lg text-indigo-300">Rs. {product.price}</p>

          <p className="mt-6 text-slate-300">
            {product.description || "No description available"}
          </p>

          {product.product_specs && product.product_specs.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-lg font-semibold">Specifications</h2>
              <ul className="space-y-1 text-sm text-slate-300">
                {product.product_specs.map((spec) => (
                  <li key={spec.id}>
                    <span className="font-medium">{spec.spec_name}:</span>{" "}
                    {spec.spec_value}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </div>
  );
}