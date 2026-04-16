import Link from "next/link";
import { formatCad } from "@/lib/properties";
import type { Property } from "@/lib/types";
import { StatusBadge, TypeBadge } from "./StatusBadge";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <Link
      href={`/listings/${p.slug}`}
      className="group flex flex-col rounded-lg overflow-hidden bg-white border border-cbr-200 hover:border-cbr-400 hover:shadow-lg transition"
    >
      <div className="relative aspect-[4/3] bg-cbr-100 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.photos[0]}
          alt={p.address}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <StatusBadge status={p.status} />
          <TypeBadge type={p.type} />
        </div>
        {p.isOwnListing && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/95 text-ocean-900 text-[11px] font-semibold uppercase tracking-wider shadow-sm">
            Our Listing
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col p-4">
        <div className="text-lg font-semibold text-dark-600 leading-tight">
          {formatCad(p.priceCad)}
        </div>
        <div className="mt-1 text-sm text-dark-500 line-clamp-1">
          {p.address}, {p.community}
        </div>
        <div className="text-xs text-dark-400">{p.region}</div>

        <div className="mt-3 flex items-center gap-3 text-xs text-dark-500">
          {p.bedrooms != null && <span>{p.bedrooms} bd</span>}
          {p.bathrooms != null && <span>{p.bathrooms} ba</span>}
          {p.livingAreaSqft != null && (
            <span>{p.livingAreaSqft.toLocaleString()} sqft</span>
          )}
          {p.lotAcres != null && <span>{p.lotAcres} ac</span>}
        </div>

        <div className="mt-3 pt-3 border-t border-cbr-200 text-[11px] uppercase tracking-wider text-dark-500">
          Listed by {p.listingBrokerage}
        </div>
      </div>
    </Link>
  );
}
