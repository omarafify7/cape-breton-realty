// Pure function: RESO Property record → canonical Property used by the UI.
//
// Note on `parcel`: the canonical Property type currently requires a polygon
// ring. Live NSAR listings have no parcel (GeoNova approval is pending), so
// we emit an empty array. Map/detail rendering treats an empty ring as
// "point only" — no polygon is drawn.
//
// Note on `pid`: we use ListingKey (a Bridge hash) until Bonnie (NSAR)
// confirms which RESO field carries the actual provincial PID.

import type {
  ListingStatus,
  Property,
  PropertyType
} from "../types";
import type { NsarProperty } from "./types";

const CBR_BROKERAGE_PATTERN = /cape breton realty/i;

function mapStatus(raw: string | null | undefined): ListingStatus {
  switch ((raw ?? "").toLowerCase()) {
    case "active":
      return "active";
    case "pending":
      return "conditional";
    case "closed":
      return "sold";
    default:
      return "active";
  }
}

function mapType(
  propertyType: string | null | undefined,
  propertySubType: string | null | undefined
): PropertyType {
  const probe = `${propertyType ?? ""} ${propertySubType ?? ""}`.toLowerCase();
  if (probe.includes("commercial")) return "commercial";
  if (probe.includes("land") || probe.includes("vacant")) return "land";
  if (probe.includes("residential")) return "residential";
  return "residential";
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

export function nsarToProperty(n: NsarProperty): Property {
  const officeName = (n.ListOfficeName ?? "").trim();
  const listingBrokerage = officeName.length > 0 ? officeName : "Unknown brokerage";
  const isOwnListing =
    officeName.length > 0 && CBR_BROKERAGE_PATTERN.test(officeName);

  const remarks = (n.PublicRemarks ?? "").trim();

  const photos = (n.Media ?? [])
    .map((m) => m?.MediaURL)
    .filter((u): u is string => typeof u === "string" && u.length > 0);

  return {
    pid: n.ListingKey,
    slug: n.ListingKey,
    status: mapStatus(n.StandardStatus),
    type: mapType(n.PropertyType, n.PropertySubType),

    address: n.UnparsedAddress?.trim() || "Address withheld",
    community: n.City?.trim() || "Nova Scotia",
    region: n.CountyOrParish?.trim() || "Nova Scotia",

    lat: typeof n.Latitude === "number" ? n.Latitude : 45.0,
    lng: typeof n.Longitude === "number" ? n.Longitude : -63.0,

    parcel: [],

    priceCad: typeof n.ListPrice === "number" ? n.ListPrice : 0,
    bedrooms: n.BedroomsTotal ?? undefined,
    bathrooms: n.BathroomsTotalInteger ?? undefined,
    livingAreaSqft: n.LivingArea ?? undefined,
    lotAcres: n.LotSizeAcres ?? undefined,
    yearBuilt: n.YearBuilt ?? undefined,

    listingBrokerage,
    isOwnListing,

    shortDescription: remarks ? truncate(remarks, 200) : "Listing details available on request.",
    description: remarks || "Listing details available on request.",

    photos
  };
}
