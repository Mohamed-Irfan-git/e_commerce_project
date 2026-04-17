import { getBrands } from "@/lib/queries/brands";

export default async function AdminBrandsPage() {
  const brands = await getBrands();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Brands</h1>

        {brands.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
            No brands found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-300">
              <p>ID</p>
              <p>Name</p>
              <p>Slug</p>
            </div>

            <div className="divide-y divide-white/10">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="grid grid-cols-3 gap-4 px-6 py-4 text-sm"
                >
                  <p className="text-slate-300">{brand.id}</p>
                  <p className="font-medium text-white">{brand.name}</p>
                  <p className="text-slate-300">{brand.slug}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}