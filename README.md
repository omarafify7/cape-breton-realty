# Cape Breton Realty — Frontend Prototype

A Next.js + TypeScript + Tailwind + Leaflet prototype of the new Cape Breton
Realty website. Built to demonstrate the **map-with-property-lines** experience
that the team identified as the core differentiator, while the underlying data
sources (NSAR/MLS, GeoNova, PVSC) are still being negotiated.

> **Status:** UI prototype. All listings + parcel polygons are mock data
> structured to match the canonical `Property` model from the Tech Stack
> Document, keyed on PID, so live data can drop in later without UI rework.

## Run it

```bash
npm install
npm run dev
# → http://localhost:3000
```

Requires Node 18+.

## What's in here

| Route | Purpose |
| --- | --- |
| `/` | Marketing homepage with featured listings + map teaser |
| `/map` | **Interactive map** — parcel polygons colour-coded by status, type/status/price filters, sidebar list, multiple base layers (streets / topo / satellite), legend |
| `/listings` | Grid of all listings |
| `/listings/[slug]` | Listing detail page — gallery, parcel mini-map, PVSC sales history, **prominent brokerage attribution banner**, inquiry form |
| `/login` | Sign-in / register UI mockup |
| `/agents` | Agent directory |
| `/about` | About copy |

## Mapping (the headline feature)

The map page renders mock GeoNova-style parcel polygons as Leaflet `<Polygon>`
layers. Each parcel is colour-coded:

- **Blue** — Active listings
- **Orange** — Conditional (sale pending)
- **Red** — Sold (dashed outline)
- **Green** — Vacant land

Centroid markers also render so parcels remain visible at low zoom. The map
supports OpenStreetMap, OpenTopoMap, and Esri satellite base layers.

When real GeoNova data becomes available, swap the mock `parcel: PolygonRing`
field on each `Property` for the live GeoJSON polygon — the rendering pipeline
won't change.

## Wiring real data later

The `Property` type in [`lib/types.ts`](lib/types.ts) is the canonical model.
Replace the mock array in [`lib/properties.ts`](lib/properties.ts) with a
function that joins:

- NSAR feed → `address`, `priceCad`, `bedrooms`, `bathrooms`, `livingAreaSqft`,
  `yearBuilt`, `listingBrokerage`, `photos`, `status`
- GeoNova → `lat`, `lng`, `parcel` (polygon ring), `lotAcres`
- PVSC → `assessedValueCad`, `publicSales`

All three join on the `pid` field.

## Things deliberately not built yet

- Real auth (`/login` is a UI mockup)
- Saved-properties / saved-searches persistence
- Inquiry form submission (no backend yet)
- CRM dashboard
- Map measuring tool (Leaflet has plugins for this — `leaflet-measure` is the
  obvious choice once the map page settles)
