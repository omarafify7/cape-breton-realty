"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Link from "next/link";
import { getAllProperties, formatCad, parcelColor } from "@/lib/properties";
import { StatusBadge, TypeBadge } from "@/components/StatusBadge";
import type { ListingStatus, PropertyType } from "@/lib/types";

// Leaflet must not be SSR'd — it touches `window` on import.
const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full grid place-items-center bg-cbr-50 text-cbr-700 text-sm">
      Loading map…
    </div>
  )
});

const ALL_STATUSES: ListingStatus[] = ["active", "conditional", "sold"];
const ALL_TYPES: PropertyType[] = ["residential", "commercial", "land"];

export default function MapPage() {
  const all = getAllProperties();

  const [statuses, setStatuses] = useState<Set<ListingStatus>>(
    new Set<ListingStatus>(["active", "conditional"])
  );
  const [types, setTypes] = useState<Set<PropertyType>>(
    new Set<PropertyType>(ALL_TYPES)
  );
  const [maxPrice, setMaxPrice] = useState<number>(1_000_000);
  const [selected, setSelected] = useState<string | undefined>();

  const filtered = useMemo(
    () =>
      all.filter(
        (p) =>
          statuses.has(p.status) &&
          types.has(p.type) &&
          p.priceCad <= maxPrice
      ),
    [all, statuses, types, maxPrice]
  );

  function toggleStatus(s: ListingStatus) {
    setStatuses((prev) => {
      const next = new Set(prev);
      next.has(s) ? next.delete(s) : next.add(s);
      return next;
    });
  }

  function toggleType(t: PropertyType) {
    setTypes((prev) => {
      const next = new Set(prev);
      next.has(t) ? next.delete(t) : next.add(t);
      return next;
    });
  }

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="lg:w-96 lg:max-w-sm border-b lg:border-b-0 lg:border-r border-cbr-100 bg-white flex flex-col min-h-0">
        <div className="p-4 border-b border-cbr-100">
          <h1 className="font-serif text-xl text-cbr-950">Map search</h1>
          <p className="text-xs text-cbr-600 mt-1">
            Showing {filtered.length} of {all.length} parcels
          </p>

          {/* Filters */}
          <div className="mt-4 space-y-3">
            <FilterGroup label="Status">
              {ALL_STATUSES.map((s) => (
                <FilterChip
                  key={s}
                  active={statuses.has(s)}
                  onClick={() => toggleStatus(s)}
                  swatch={
                    s === "active"
                      ? "#1d6fbf"
                      : s === "sold"
                      ? "#c53030"
                      : "#dd7724"
                  }
                >
                  {s[0].toUpperCase() + s.slice(1)}
                </FilterChip>
              ))}
            </FilterGroup>

            <FilterGroup label="Type">
              {ALL_TYPES.map((t) => (
                <FilterChip
                  key={t}
                  active={types.has(t)}
                  onClick={() => toggleType(t)}
                >
                  {t === "land" ? "Vacant land" : t[0].toUpperCase() + t.slice(1)}
                </FilterChip>
              ))}
            </FilterGroup>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-cbr-700 font-semibold">
                Max price · {formatCad(maxPrice)}
              </label>
              <input
                type="range"
                min={100_000}
                max={1_000_000}
                step={10_000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-cbr-700"
              />
            </div>
          </div>
        </div>

        {/* Result list */}
        <div className="flex-1 overflow-y-auto divide-y divide-cbr-100">
          {filtered.map((p) => {
            const isSel = p.slug === selected;
            return (
              <button
                key={p.pid}
                onClick={() => setSelected(p.slug)}
                className={`w-full text-left p-3 hover:bg-cbr-50 transition flex gap-3 ${
                  isSel ? "bg-cbr-50" : ""
                }`}
              >
                <div
                  className="h-3 w-3 mt-1.5 rounded-full flex-shrink-0"
                  style={{ background: parcelColor(p) }}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-semibold text-cbr-950">
                      {formatCad(p.priceCad)}
                    </div>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="text-sm text-cbr-800 line-clamp-1">
                    {p.address}
                  </div>
                  <div className="text-xs text-cbr-600">
                    {p.community} · PID {p.pid}
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <TypeBadge type={p.type} />
                    {p.isOwnListing && (
                      <span className="text-[10px] uppercase tracking-wider text-cbr-700 font-semibold">
                        Our listing
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/listings/${p.slug}`}
                    className="mt-2 inline-block text-xs text-cbr-700 underline"
                  >
                    Open listing →
                  </Link>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="p-6 text-sm text-cbr-700">
              No parcels match these filters.
            </div>
          )}
        </div>
      </aside>

      {/* Map */}
      <div className="flex-1 min-h-[420px] lg:min-h-0 relative">
        <MapView
          properties={filtered}
          onSelect={setSelected}
          selectedSlug={selected}
        />
        <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur rounded-md shadow-md border border-cbr-100 p-3 text-xs">
          <div className="font-semibold text-cbr-900 mb-1.5">Legend</div>
          <LegendRow color="#1d6fbf" label="Active" />
          <LegendRow color="#dd7724" label="Conditional" />
          <LegendRow color="#c53030" label="Sold" />
          <LegendRow color="#3d8a4d" label="Vacant land" />
          <div className="mt-2 pt-2 border-t border-cbr-100 text-[10px] text-cbr-600">
            Parcel data &copy; GeoNova (mock)
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider text-cbr-700 font-semibold mb-1.5">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  swatch,
  children
}: {
  active: boolean;
  onClick: () => void;
  swatch?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
        active
          ? "bg-cbr-700 text-white border-cbr-700"
          : "bg-white text-cbr-800 border-cbr-200 hover:border-cbr-400"
      }`}
    >
      {swatch && (
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: swatch }}
        />
      )}
      {children}
    </button>
  );
}

function LegendRow({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-3 w-3 rounded-sm border border-black/10"
        style={{ background: color, opacity: 0.6 }}
      />
      <span className="text-cbr-800">{label}</span>
    </div>
  );
}
