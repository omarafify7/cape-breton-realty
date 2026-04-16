import type { ListingStatus, PropertyType } from "@/lib/types";

const STATUS_LABEL: Record<ListingStatus, string> = {
  active: "Active",
  sold: "Sold",
  conditional: "Conditional"
};

const STATUS_BG: Record<ListingStatus, string> = {
  active: "bg-status-active",
  sold: "bg-status-sold",
  conditional: "bg-status-conditional"
};

export function StatusBadge({ status }: { status: ListingStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white ${STATUS_BG[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/90" />
      {STATUS_LABEL[status]}
    </span>
  );
}

const TYPE_LABEL: Record<PropertyType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  land: "Vacant Land"
};

export function TypeBadge({ type }: { type: PropertyType }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-ocean-100 text-ocean-800">
      {TYPE_LABEL[type]}
    </span>
  );
}
