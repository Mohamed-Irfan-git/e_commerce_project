import { getCategories } from "@/lib/queries/categories";

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-8 text-3xl font-bold">Categories</h1>

        {categories.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-slate-300">
            No categories found.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 px-6 py-4 text-sm font-semibold text-slate-300">
              <p>ID</p>
              <p>Name</p>
              <p>Slug</p>
            </div>

            <div className="divide-y divide-white/10">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="grid grid-cols-3 gap-4 px-6 py-4 text-sm"
                >
                  <p className="text-slate-300">{category.id}</p>
                  <p className="font-medium text-white">{category.name}</p>
                  <p className="text-slate-300">{category.slug}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}