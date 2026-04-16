"use client";

import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  CircleMarker,
  Tooltip,
  Popup,
  LayersControl
} from "react-leaflet";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import Link from "next/link";
import { formatCad, parcelColor } from "@/lib/properties";
import type { Property } from "@/lib/types";

interface MapViewProps {
  properties: Property[];
  /** Map center [lat, lng]. Default centers on Bras d'Or Lake. */
  center?: LatLngTuple;
  zoom?: number;
  /** Optional callback when a parcel is clicked (used by the map page sidebar). */
  onSelect?: (slug: string) => void;
  selectedSlug?: string;
  /** When true, render listing details inline as a popup; else just tooltip. */
  showPopups?: boolean;
}

// GeoNova-style parcels are GeoJSON [lng, lat]. Leaflet expects [lat, lng].
function ringToLatLng(ring: [number, number][]): LatLngExpression[] {
  return ring.map(([lng, lat]) => [lat, lng] as LatLngTuple);
}

export default function MapView({
  properties,
  center = [46.05, -60.6],
  zoom = 9,
  onSelect,
  selectedSlug,
  showPopups = true
}: MapViewProps) {
  const polys = useMemo(
    () =>
      properties.map((p) => ({
        property: p,
        positions: ringToLatLng(p.parcel),
        color: parcelColor(p)
      })),
    [properties]
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom
      className="h-full w-full"
    >
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="Streets">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Topographic">
          <TileLayer
            attribution='Map data: &copy; OpenStreetMap contributors, SRTM | Style: &copy; OpenTopoMap (CC-BY-SA)'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite (Esri)">
          <TileLayer
            attribution="Tiles &copy; Esri"
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      {polys.map(({ property, positions, color }) => {
        const isSelected = property.slug === selectedSlug;
        return (
          <Polygon
            key={property.pid}
            positions={positions}
            pathOptions={{
              color,
              weight: isSelected ? 4 : 2,
              fillOpacity: isSelected ? 0.45 : 0.25,
              dashArray: property.status === "sold" ? "4 4" : undefined
            }}
            eventHandlers={{
              click: () => onSelect?.(property.slug)
            }}
          >
            <Tooltip sticky direction="top" offset={[0, -4]} opacity={0.95}>
              <div className="text-xs">
                <div className="font-semibold">{property.address}</div>
                <div className="text-gray-600">
                  {property.community} · PID {property.pid}
                </div>
                <div className="font-semibold mt-0.5">
                  {formatCad(property.priceCad)}
                </div>
              </div>
            </Tooltip>
            {showPopups && (
              <Popup>
                <div className="text-sm w-56">
                  <div className="font-serif text-base text-ocean-900">
                    {property.address}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    {property.community}, NS · PID {property.pid}
                  </div>
                  <div className="font-semibold">
                    {formatCad(property.priceCad)}
                  </div>
                  <div className="mt-2 text-xs text-gray-700 line-clamp-3">
                    {property.shortDescription}
                  </div>
                  <Link
                    href={`/listings/${property.slug}`}
                    className="mt-3 inline-block text-xs font-semibold text-ocean-700 underline"
                  >
                    View listing →
                  </Link>
                </div>
              </Popup>
            )}
          </Polygon>
        );
      })}

      {/* Centroid markers help users see properties at low zoom where parcels are tiny. */}
      {properties.map((p) => (
        <CircleMarker
          key={`pt-${p.pid}`}
          center={[p.lat, p.lng]}
          radius={5}
          pathOptions={{
            color: parcelColor(p),
            fillColor: parcelColor(p),
            fillOpacity: 0.95,
            weight: 1.5
          }}
          eventHandlers={{
            click: () => onSelect?.(p.slug)
          }}
        />
      ))}
    </MapContainer>
  );
}
