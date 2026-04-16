// Shared types. The shape mirrors the canonical property model proposed in the
// Tech Stack Document: PID is the join key across MLS / GeoNova / PVSC.

export type ListingStatus = "active" | "sold" | "conditional";
export type PropertyType = "residential" | "commercial" | "land";

/** A GeoJSON-style polygon ring: [ [lng, lat], ... ]. First+last point match. */
export type PolygonRing = [number, number][];

export interface Property {
  /** PID — the canonical join key across NSAR / GeoNova / PVSC. */
  pid: string;
  /** Slug used in URLs. */
  slug: string;
  status: ListingStatus;
  type: PropertyType;

  address: string;
  community: string;
  region: string; // e.g. "Cape Breton Regional Municipality"

  /** Map marker / centroid. */
  lat: number;
  lng: number;

  /** Parcel boundary as a single outer ring (mock GeoNova polygon). */
  parcel: PolygonRing;

  priceCad: number;
  bedrooms?: number;
  bathrooms?: number;
  livingAreaSqft?: number;
  lotAcres?: number;
  yearBuilt?: number;

  /** MLS attribution — the brokerage that holds the listing. */
  listingBrokerage: string;
  /** True when CBR is the listing brokerage; affects how the badge is shown. */
  isOwnListing: boolean;

  shortDescription: string;
  description: string;
  photos: string[];

  /** PVSC-style assessment value. */
  assessedValueCad?: number;
  /** Public sales history (PVSC). */
  publicSales?: { date: string; priceCad: number }[];
}
