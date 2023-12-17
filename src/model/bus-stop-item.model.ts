import type { BusStop } from "./bus-stop.model";

export interface BusStopItem {
  id?: number;
  stopId?: number;
  name?: string;
}

export function busStopToItem(stop: BusStop): BusStopItem {
  return {
    stopId: stop.stopId,
    name: `${stop.stopName ?? stop.stopDesc} ${stop.stopCode ?? ''}`,
  }
}