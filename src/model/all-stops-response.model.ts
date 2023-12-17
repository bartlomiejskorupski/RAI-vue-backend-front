import type { BusStop } from "./bus-stop.model";

export interface AllStopsResponse {
  lastUpdate?: Date;
  stops: BusStop[]
}