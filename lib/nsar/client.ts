// Server-side Bridge RESO Web API client. The Server Token must never reach
// the client bundle: only import this file from server components, route
// handlers, or other server-only code.

import type { NsarODataResponse, NsarProperty } from "./types";

const BRIDGE_BASE = "https://api.bridgedataoutput.com/api/v2/OData";
const DEFAULT_REVALIDATE_SECONDS = 300;

function getToken(): string {
  const token = process.env.BRIDGE_SERVER_TOKEN;
  if (!token) {
    throw new Error(
      "BRIDGE_SERVER_TOKEN is not set. Add it to web/.env.local for local dev or to Vercel project settings for deployments."
    );
  }
  return token;
}

function getDataset(): string {
  return process.env.NSAR_DATASET ?? "shared_nsar_531964d";
}

interface FetchOptions {
  revalidateSeconds?: number;
}

export async function fetchNsar<T>(
  resourcePath: string,
  query: Record<string, string | number | undefined> = {},
  options: FetchOptions = {}
): Promise<T> {
  const dataset = getDataset();
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined) continue;
    params.set(k, String(v));
  }
  const qs = params.toString();
  const url = `${BRIDGE_BASE}/${dataset}/${resourcePath}${qs ? `?${qs}` : ""}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${getToken()}` },
    next: {
      revalidate: options.revalidateSeconds ?? DEFAULT_REVALIDATE_SECONDS
    }
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Bridge ${resourcePath} request failed: ${res.status} ${res.statusText}${
        body ? ` — ${body.slice(0, 240)}` : ""
      }`
    );
  }

  return (await res.json()) as T;
}

/** Fetch active NSAR listings province-wide (no brokerage filter). */
export async function fetchActiveProperties(
  limit: number = 100
): Promise<NsarProperty[]> {
  const top = Math.max(1, Math.min(200, Math.floor(limit)));
  const data = await fetchNsar<NsarODataResponse<NsarProperty>>("Property", {
    $filter: "StandardStatus eq 'Active'",
    $expand: "ListOffice",
    $top: top
  });
  return Array.isArray(data.value) ? data.value : [];
}
