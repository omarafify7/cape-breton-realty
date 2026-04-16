import Link from "next/link";
import { getAllProperties } from "@/lib/properties";
import { PropertyCard } from "@/components/PropertyCard";

export default function HomePage() {
  const properties = getAllProperties();
  const featured = properties.filter((p) => p.isOwnListing && p.status === "active").slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-dark-600 text-white">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2400)"
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-dark-600/80 via-dark-600/70 to-dark-600" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <p className="text-xs uppercase tracking-[0.3em] text-cbr-300">
            Specializing in Cape Breton Real Estate
          </p>
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl text-white max-w-3xl leading-tight">
            See every property on the map — parcel lines, price, and details.
          </h1>
          <p className="mt-5 text-lg text-dark-200 max-w-2xl">
            Homes, cottages, vacant land, farms, islands, and commercial properties across Cape Breton Island and northeastern Nova Scotia. Real parcel boundaries on every listing. Real response times on every inquiry.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/map"
              className="inline-flex justify-center items-center bg-cbr-500 text-white font-semibold px-5 py-3 rounded-md shadow hover:bg-cbr-600"
            >
              View the parcel map
            </Link>
            <Link
              href="/listings"
              className="inline-flex justify-center items-center bg-transparent border border-white/40 text-white font-semibold px-5 py-3 rounded-md hover:bg-white/10"
            >
              Browse listings
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl text-sm">
            <Stat label="Active listings" value={properties.filter((p) => p.status === "active").length.toString()} />
            <Stat label="Communities served" value="40+" />
            <Stat label="Expert agents" value="12" />
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-serif text-3xl text-dark-600">Featured listings</h2>
            <p className="mt-1 text-dark-500">
              From our current active inventory across Cape Breton and northeastern Nova Scotia.
            </p>
          </div>
          <Link
            href="/listings"
            className="text-sm font-semibold text-cbr-600 hover:text-cbr-700"
          >
            View all →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <PropertyCard key={p.pid} p={p} />
          ))}
        </div>
      </section>

      {/* Why Cape Breton Realty */}
      <section className="bg-cbr-50 border-y border-cbr-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-3">
          <Feature
            title="Expert local service"
            body="We specialize in Cape Breton real estate. Our agents live here, know the communities, and understand what buyers and sellers actually need."
          />
          <Feature
            title="Comprehensive inventory"
            body="Homes, cottages, vacant land, farms, islands, and commercial properties. If you're looking for real estate in Cape Breton or northeastern Nova Scotia, it's on our map."
          />
          <Feature
            title="Full parcel visibility"
            body="See actual property boundaries and deed lines on every listing. No guessing. No surprises. Just the real land you're buying or selling."
          />
        </div>
      </section>

      {/* Map preview teaser */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cbr-600 font-semibold">
              Interactive map
            </p>
            <h2 className="mt-2 font-serif text-3xl text-dark-600">
              Built for rural Cape Breton, not just street addresses.
            </h2>
            <p className="mt-4 text-dark-500">
              Most of Cape Breton is land you can't point at on a street map. Our map shows the actual property parcel — color-coded by listing status, with multiple base layers (streets, topographic, satellite) and real assessment data tied to each lot.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-dark-500">
              <li>• Active, conditional, and sold properties color-coded</li>
              <li>• Vacant land, residential, and commercial categories</li>
              <li>• Streets, topographic, and satellite overlays</li>
              <li>• PID-linked assessment data and sales history</li>
            </ul>
            <Link
              href="/map"
              className="mt-6 inline-flex items-center text-sm font-semibold text-cbr-600 hover:text-cbr-700"
            >
              Open the map →
            </Link>
          </div>

          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-cbr-200 shadow-sm bg-cbr-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600"
              alt="Map preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-cbr-400/40 pl-3">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="text-xs uppercase tracking-wider text-cbr-200">{label}</div>
    </div>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="font-serif text-xl text-dark-600">{title}</h3>
      <p className="mt-2 text-dark-500 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
