import type { Departure } from "./departure.model";

export interface DeparturesResponse {
  lastUpdate: string;
  delay: Departure[];
}