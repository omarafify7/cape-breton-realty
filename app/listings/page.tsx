import { getAllProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";

export const metadata = { title: "All listings — Cape Breton Realty" };

export default function ListingsIndexPage() {
  const properties = getAllProperties();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-cbr-950">All listings</h1>
          <p className="mt-1 text-cbr-700">
            {properties.length} properties across Cape Breton & northeastern Nova Scotia.
          </p>
        </div>
        <a
          href="/map"
          className="text-sm font-semibold text-cbr-700 hover:text-cbr-900"
        >
          Switch to map view →
        </a>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <PropertyCard key={p.pid} p={p} />
        ))}
      </div>
    </div>
  );
}
