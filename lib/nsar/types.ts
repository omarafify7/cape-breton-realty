// Minimal RESO Property field set the mapper consumes.
// Bridge returns many more fields; we only type the ones we use so the
// surface stays tight and TypeScript guides future changes.

export interface NsarMedia {
  MediaURL?: string | null;
  Order?: number | null;
}

export interface NsarProperty {
  // TODO: ListingKey is a Bridge hash, not the provincial PID. Bonnie (NSAR)
  // owes us confirmation of which RESO field carries the actual PID; until
  // then we use ListingKey for both `pid` and `slug`.
  ListingKey: string;

  StandardStatus?: string | null;
  PropertyType?: string | null;
  PropertySubType?: string | null;

  UnparsedAddress?: string | null;
  City?: string | null;
  CountyOrParish?: string | null;
  StateOrProvince?: string | null;

  Latitude?: number | null;
  Longitude?: number | null;

  ListPrice?: number | null;
  BedroomsTotal?: number | null;
  BathroomsTotalInteger?: number | null;
  LivingArea?: number | null;
  LotSizeAcres?: number | null;
  YearBuilt?: number | null;

  ListOfficeName?: string | null;
  PublicRemarks?: string | null;

  Media?: NsarMedia[] | null;

  BridgeModificationTimestamp?: string | null;
}

export interface NsarODataResponse<T> {
  "@odata.context"?: string;
  "@odata.nextLink"?: string;
  value: T[];
}
