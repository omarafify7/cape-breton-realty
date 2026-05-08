import type { Property } from "./types";
import { fetchActiveProperties, nsarToProperty } from "./nsar";

function getMaxListings(): number {
  const raw = process.env.NSAR_MAX_LISTINGS;
  const n = raw ? Number.parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : 500;
}

async function loadLiveProperties(): Promise<Property[]> {
  try {
    const records = await fetchActiveProperties(getMaxListings());
    return records.map(nsarToProperty);
  } catch (err) {
    console.warn(
      "[properties] live NSAR fetch failed:",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export async function getAllProperties(): Promise<Property[]> {
  return loadLiveProperties();
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | undefined> {
  const live = await loadLiveProperties();
  return live.find((p) => p.slug === slug);
}

export function formatCad(n: number): string {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0
  }).format(n);
}

export const STATUS_COLORS: Record<string, string> = {
  active: "#1d6fbf",
  sold: "#c53030",
  conditional: "#dd7724",
  land: "#3d8a4d"
};

/** Pick the display color for a parcel based on status + type. */
export function parcelColor(p: Property): string {
  if (p.status === "sold") return STATUS_COLORS.sold;
  if (p.status === "conditional") return STATUS_COLORS.conditional;
  if (p.type === "land") return STATUS_COLORS.land;
  return STATUS_COLORS.active;
}
