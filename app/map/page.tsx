import { getAllProperties } from "@/lib/properties";
import MapClient from "./MapClient";

export const metadata = { title: "Map search — Cape Breton Realty" };

export default async function MapPage() {
  const properties = await getAllProperties();
  return <MapClient properties={properties} />;
}
