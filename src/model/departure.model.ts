export interface Departure {
  id: string,
  delayInSeconds: number,
  estimatedTime: Date,
  headsign: number,
  routeId: number, // numer linii
  tripId: number,
  status: string,
  theoreticalTime: Date,
  timestamp: Date,
  trip: number,
  vehicleCode: number,
  vehicleId: number
}