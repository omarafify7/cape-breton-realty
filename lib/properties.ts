import type { Property, PolygonRing } from "./types";

// Helper: build a rough rectangular parcel polygon around a lat/lng centroid.
// widthDeg/heightDeg are in degrees (~111 km per degree latitude); parcels
// across Cape Breton rural properties are often multi-acre so we can use
// generous bounds. These are MOCK polygons standing in for GeoNova parcels.
function rectParcel(
  lat: number,
  lng: number,
  widthDeg = 0.002,
  heightDeg = 0.0014
): PolygonRing {
  const w = widthDeg / 2;
  const h = heightDeg / 2;
  return [
    [lng - w, lat - h],
    [lng + w, lat - h],
    [lng + w, lat + h],
    [lng - w, lat + h],
    [lng - w, lat - h]
  ];
}

// Helper: irregular 5-point parcel for visual variety.
function shapedParcel(lat: number, lng: number, scale = 0.003): PolygonRing {
  const s = scale;
  return [
    [lng - s, lat - s * 0.6],
    [lng + s * 0.3, lat - s * 0.9],
    [lng + s * 1.1, lat - s * 0.1],
    [lng + s * 0.4, lat + s * 0.9],
    [lng - s * 0.9, lat + s * 0.5],
    [lng - s, lat - s * 0.6]
  ];
}

// Mock imagery — stable Unsplash photo IDs for reliability.
const PHOTO = {
  coastal: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600",
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1600"
  ],
  cabin: [
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1600",
    "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=1600",
    "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1600"
  ],
  farmhouse: [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600"
  ],
  downtown: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1600",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1600"
  ],
  land: [
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1600"
  ],
  commercial: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600"
  ]
};

export const PROPERTIES: Property[] = [
  {
    pid: "75012334",
    slug: "186-shore-rd-baddeck",
    status: "active",
    type: "residential",
    address: "186 Shore Road",
    community: "Baddeck",
    region: "Victoria County",
    lat: 46.1055,
    lng: -60.7522,
    parcel: shapedParcel(46.1055, -60.7522, 0.0035),
    priceCad: 629000,
    bedrooms: 3,
    bathrooms: 2,
    livingAreaSqft: 1980,
    lotAcres: 1.4,
    yearBuilt: 1998,
    listingBrokerage: "Cape Breton Realty",
    isOwnListing: true,
    shortDescription: "Bras d'Or Lake waterfront home with wraparound deck and private dock.",
    description:
      "Classic Cape Breton cedar-shingled waterfront on the Bras d'Or Lake, less than ten minutes from downtown Baddeck. Open-plan main floor with a wood-burning stove, kitchen facing the water, and a wraparound cedar deck. Three bedrooms up including a primary with private balcony. Gentle grassy slope down to 180 ft of shore frontage and a private floating dock.",
    photos: PHOTO.coastal,
    assessedValueCad: 512400,
    publicSales: [
      { date: "2019-08-14", priceCad: 448000 },
      { date: "2004-05-22", priceCad: 189500 }
    ]
  },
  {
    pid: "15009841",
    slug: "42-union-st-sydney",
    status: "conditional",
    type: "residential",
    address: "42 Union Street",
    community: "Sydney",
    region: "Cape Breton Regional Municipality",
    lat: 46.1371,
    lng: -60.1928,
    parcel: rectParcel(46.1371, -60.1928, 0.0012, 0.0009),
    priceCad: 329900,
    bedrooms: 4,
    bathrooms: 2,
    livingAreaSqft: 2240,
    lotAcres: 0.21,
    yearBuilt: 1912,
    listingBrokerage: "Atlantic Homes Realty",
    isOwnListing: false,
    shortDescription:
      "Character-filled four-bedroom in Sydney's North End, steps to the waterfront.",
    description:
      "Beautifully preserved 1912 home in Sydney's North End. Original hardwood throughout, two working fireplaces, updated kitchen with soapstone counters. Generous fenced yard. Walking distance to Open Hearth Park and the Sydney waterfront boardwalk.",
    photos: PHOTO.farmhouse,
    assessedValueCad: 278000,
    publicSales: [
      { date: "2015-03-03", priceCad: 232000 },
      { date: "1998-11-19", priceCad: 129000 }
    ]
  },
  {
    pid: "15047002",
    slug: "cabot-trail-land-margaree",
    status: "active",
    type: "land",
    address: "Cabot Trail (Lot 7B)",
    community: "Margaree",
    region: "Inverness County",
    lat: 46.3348,
    lng: -61.0932,
    parcel: shapedParcel(46.3348, -61.0932, 0.008),
    priceCad: 119000,
    lotAcres: 38.6,
    listingBrokerage: "Cape Breton Realty",
    isOwnListing: true,
    shortDescription:
      "38-acre wooded parcel on the Cabot Trail with river frontage and a year-round brook.",
    description:
      "Large wooded parcel sloping gently from the Cabot Trail down toward the Northeast Margaree River. Mix of mature hardwood and softwood. A small year-round brook crosses the lower half. Driveway cut to a natural building clearing. Power available at road. Perfect for a seasonal camp, off-grid homestead, or long-term investment.",
    photos: PHOTO.land,
    assessedValueCad: 62400
  },
  {
    pid: "15001192",
    slug: "14-granville-st-port-hawkesbury",
    status: "sold",
    type: "commercial",
    address: "14 Granville Street",
    community: "Port Hawkesbury",
    region: "Inverness County",
    lat: 45.6144,
    lng: -61.3502,
    parcel: rectParcel(45.6144, -61.3502, 0.0018, 0.0012),
    priceCad: 479000,
    lotAcres: 0.34,
    yearBuilt: 1974,
    listingBrokerage: "Cape Breton Realty",
    isOwnListing: true,
    shortDescription:
      "Mixed-use downtown building with main-floor retail and two upper apartments.",
    description:
      "Well-maintained mixed-use building on Granville Street. Main floor is currently leased to a long-standing local tenant; two fully renovated two-bedroom apartments upstairs. New roof 2022, upgraded electrical 2019. Solid investment with steady cashflow and room to raise rents.",
    photos: PHOTO.commercial,
    assessedValueCad: 402000,
    publicSales: [
      { date: "2006-07-10", priceCad: 215000 }
    ]
  },
  {
    pid: "15077833",
    slug: "seaview-cottage-ingonish",
    status: "active",
    type: "residential",
    address: "9 Lighthouse Lane",
    community: "Ingonish",
    region: "Victoria County",
    lat: 46.6891,
    lng: -60.3779,
    parcel: shapedParcel(46.6891, -60.3779, 0.0045),
    priceCad: 389000,
    bedrooms: 2,
    bathrooms: 1,
    livingAreaSqft: 1120,
    lotAcres: 0.9,
    yearBuilt: 1986,
    listingBrokerage: "Cape Breton Realty",
    isOwnListing: true,
    shortDescription:
      "Ocean-view cottage bordering Cape Breton Highlands National Park.",
    description:
      "Bright two-bedroom cottage on a quiet lane just minutes from the Cape Breton Highlands National Park entrance. Panoramic Atlantic views from the kitchen and living room. Fully winterized, wood stove, heat pump. Rare offering on the Cabot Trail.",
    photos: PHOTO.cabin,
    assessedValueCad: 284000
  },
  {
    pid: "15023419",
    slug: "248-main-st-inverness",
    status: "active",
    type: "residential",
    address: "248 Main Street",
    community: "Inverness",
    region: "Inverness County",
    lat: 46.2271,
    lng: -61.2861,
    parcel: rectParcel(46.2271, -61.2861, 0.0014, 0.001),
    priceCad: 549000,
    bedrooms: 4,
    bathrooms: 3,
    livingAreaSqft: 2640,
    lotAcres: 0.45,
    yearBuilt: 2006,
    listingBrokerage: "Coastal Realty Ltd.",
    isOwnListing: false,
    shortDescription:
      "Walk to Cabot Links from this bright four-bedroom with attached garage.",
    description:
      "Built in 2006 and updated throughout. Open kitchen with gas range, vaulted living room with ocean peeks, primary suite with walk-in and soaker tub, finished basement family room. Five-minute walk to Cabot Links and the Inverness boardwalk.",
    photos: PHOTO.farmhouse,
    assessedValueCad: 461000,
    publicSales: [
      { date: "2006-10-05", priceCad: 298000 }
    ]
  },
  {
    pid: "15061204",
    slug: "louisbourg-harbourfront",
    status: "sold",
    type: "residential",
    address: "27 Commercial Street",
    community: "Louisbourg",
    region: "Cape Breton Regional Municipality",
    lat: 45.9223,
    lng: -59.9724,
    parcel: rectParcel(45.9223, -59.9724, 0.0015, 0.0011),
    priceCad: 259000,
    bedrooms: 3,
    bathrooms: 1,
    livingAreaSqft: 1420,
    lotAcres: 0.18,
    yearBuilt: 1958,
    listingBrokerage: "Cape Breton Realty",
    isOwnListing: true,
    shortDescription: "Tidy harbourfront home walking distance to the Fortress.",
    description:
      "Comfortable three-bedroom with updated kitchen and a covered side porch overlooking Louisbourg Harbour. Heat pump installed 2021. Short walk to the Fortress of Louisbourg visitor centre.",
    photos: PHOTO.coastal,
    assessedValueCad: 198000
  },
  {
    pid: "15099011",
    slug: "cheticamp-oceanfront-lot",
    status: "active",
    type: "land",
    address: "Harbour Road (Lot 12)",
    community: "Cheticamp",
    region: "Inverness County",
    lat: 46.6352,
    lng: -60.9461,
    parcel: shapedParcel(46.6352, -60.9461, 0.006),
    priceCad: 189000,
    lotAcres: 12.3,
    listingBrokerage: "Cape Breton Realty",
    isOwnListing: true,
    shortDescription: "12 acres of oceanfront with 410 ft of frontage on the Gulf of St. Lawrence.",
    description:
      "Spectacular oceanfront parcel with 410 ft of frontage on the Gulf of St. Lawrence. Mix of open meadow and mature spruce. Driveway permit in place, power at road, and perc test complete for a single-family dwelling. Sunset views every evening and the Cabot Trail at your back door.",
    photos: PHOTO.land,
    assessedValueCad: 104000
  }
];

export function getAllProperties(): Property[] {
  return PROPERTIES;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
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
