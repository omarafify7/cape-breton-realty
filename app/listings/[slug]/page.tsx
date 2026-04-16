import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  formatCad,
  getAllProperties,
  getPropertyBySlug
} from "@/lib/properties";
import { StatusBadge, TypeBadge } from "@/components/StatusBadge";

// Server component imports a client-only map via dynamic import.
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center bg-cbr-50 text-cbr-700 text-sm">
      Loading map…
    </div>
  )
});

export function generateStaticParams() {
  return getAllProperties().map((p) => ({ slug: p.slug }));
}

export default function ListingPage({ params }: { params: { slug: string } }) {
  const property = getPropertyBySlug(params.slug);
  if (!property) notFound();

  return (
    <div className="bg-white">
      {/* Brokerage attribution banner — MLS rule. Sherry called this out as
          one of the main complaints about viewpoint.ca: attribution was buried.
          Make it prominent here. */}
      <div
        className={`text-sm ${
          property.isOwnListing
            ? "bg-cbr-700 text-white"
            : "bg-amber-50 text-amber-900 border-b border-amber-200"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 flex-wrap">
          <div className="font-medium">
            {property.isOwnListing ? (
              <>
                <span className="font-semibold">This is a Cape Breton Realty listing.</span>{" "}
                You'll be matched directly with the listing agent.
              </>
            ) : (
              <>
                <span className="font-semibold">
                  Listed by {property.listingBrokerage}
                </span>
                . Cape Breton Realty can connect you as your buyer agent.
              </>
            )}
          </div>
          <Link
            href="#inquire"
            className={`text-xs font-semibold underline ${
              property.isOwnListing ? "text-white" : "text-amber-900"
            }`}
          >
            Inquire about this property →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Title row */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge status={property.status} />
              <TypeBadge type={property.type} />
              <span className="text-xs text-cbr-600">PID {property.pid}</span>
            </div>
            <h1 className="mt-3 font-serif text-3xl sm:text-4xl text-cbr-950">
              {property.address}
            </h1>
            <p className="mt-1 text-cbr-700">
              {property.community}, {property.region}, Nova Scotia
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-semibold text-cbr-950">
              {formatCad(property.priceCad)}
            </div>
            {property.assessedValueCad != null && (
              <div className="text-xs text-cbr-600 mt-1">
                Assessed (PVSC): {formatCad(property.assessedValueCad)}
              </div>
            )}
          </div>
        </div>

        {/* Photo gallery — pain point: viewpoint photos don't enlarge. Make these big. */}
        <section className="mt-6 grid gap-3 grid-cols-1 md:grid-cols-3 md:grid-rows-2 md:h-[480px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.photos[0]}
            alt={property.address}
            className="rounded-lg object-cover w-full h-full md:row-span-2 md:col-span-2 md:h-[480px]"
          />
          {property.photos.slice(1, 3).map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={src}
              alt={`${property.address} photo ${i + 2}`}
              className="rounded-lg object-cover w-full h-60 md:h-full"
            />
          ))}
        </section>

        {/* Stats strip */}
        <section className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {property.bedrooms != null && (
            <Stat label="Bedrooms" value={String(property.bedrooms)} />
          )}
          {property.bathrooms != null && (
            <Stat label="Bathrooms" value={String(property.bathrooms)} />
          )}
          {property.livingAreaSqft != null && (
            <Stat label="Living area" value={`${property.livingAreaSqft.toLocaleString()} sqft`} />
          )}
          {property.lotAcres != null && (
            <Stat label="Lot size" value={`${property.lotAcres} acres`} />
          )}
          {property.yearBuilt != null && (
            <Stat label="Year built" value={String(property.yearBuilt)} />
          )}
        </section>

        <div className="mt-10 grid lg:grid-cols-3 gap-10">
          {/* Left column — description + records */}
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="font-serif text-2xl text-cbr-950">About this property</h2>
              <p className="mt-3 text-cbr-800 leading-relaxed">{property.description}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cbr-950">Parcel map</h2>
              <p className="text-sm text-cbr-700 mt-1">
                Boundary shown is the GeoNova parcel registered to PID {property.pid}.
              </p>
              <div className="mt-4 h-[420px] rounded-lg overflow-hidden border border-cbr-200">
                <MapView
                  properties={[property]}
                  center={[property.lat, property.lng]}
                  zoom={15}
                  showPopups={false}
                />
              </div>
            </section>

            {property.publicSales && property.publicSales.length > 0 && (
              <section>
                <h2 className="font-serif text-2xl text-cbr-950">Public sales history</h2>
                <p className="text-sm text-cbr-700 mt-1">Source: PVSC.</p>
                <table className="mt-4 w-full text-sm border border-cbr-100 rounded overflow-hidden">
                  <thead className="bg-cbr-50 text-cbr-800 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="text-left px-3 py-2">Date</th>
                      <th className="text-left px-3 py-2">Sale price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.publicSales.map((s) => (
                      <tr key={s.date} className="border-t border-cbr-100">
                        <td className="px-3 py-2">{s.date}</td>
                        <td className="px-3 py-2">{formatCad(s.priceCad)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </div>

          {/* Right column — inquiry form */}
          <aside id="inquire" className="lg:sticky lg:top-20 self-start">
            <div className="rounded-lg border border-cbr-200 p-6 bg-white shadow-sm">
              <div className="text-sm uppercase tracking-wider text-cbr-700 font-semibold">
                Ask about this property
              </div>
              <p className="mt-1 text-xs text-cbr-600">
                We track every inquiry. Expect a real reply within 4 business hours.
              </p>
              <form className="mt-4 space-y-3">
                <Field label="Your name" placeholder="Jane MacDonald" />
                <Field label="Email" type="email" placeholder="jane@example.com" />
                <Field label="Phone (optional)" type="tel" placeholder="902-555-0143" />
                <div>
                  <label className="text-xs font-semibold text-cbr-800">Message</label>
                  <textarea
                    rows={4}
                    placeholder="I'd like to schedule a viewing for this weekend."
                    className="mt-1 w-full rounded-md border border-cbr-200 focus:border-cbr-500 focus:ring-1 focus:ring-cbr-500 px-3 py-2 text-sm"
                  />
                </div>
                <button
                  type="button"
                  className="w-full bg-cbr-700 hover:bg-cbr-800 text-white font-semibold py-2.5 rounded-md"
                >
                  Send inquiry
                </button>
                <p className="text-[11px] text-cbr-600">
                  By submitting, you agree to be contacted by Cape Breton Realty about
                  this property.
                </p>
              </form>
            </div>

            <div className="mt-4 rounded-lg border border-cbr-100 p-4 bg-cbr-50 text-sm text-cbr-800">
              <div className="font-semibold text-cbr-900">Property summary</div>
              <dl className="mt-2 space-y-1">
                <Row label="PID" value={property.pid} />
                <Row label="Status" value={property.status} />
                <Row label="Type" value={property.type} />
                <Row label="Listing brokerage" value={property.listingBrokerage} />
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-cbr-100 p-3 bg-cbr-50/50">
      <div className="text-[11px] uppercase tracking-wider text-cbr-600">{label}</div>
      <div className="mt-1 text-lg font-semibold text-cbr-950">{value}</div>
    </div>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-xs font-semibold text-cbr-800">{label}</label>
      <input
        {...rest}
        className="mt-1 w-full rounded-md border border-cbr-200 focus:border-cbr-500 focus:ring-1 focus:ring-cbr-500 px-3 py-2 text-sm"
      />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-xs">
      <dt className="text-cbr-700">{label}</dt>
      <dd className="font-medium text-cbr-900 capitalize">{value}</dd>
    </div>
  );
}
