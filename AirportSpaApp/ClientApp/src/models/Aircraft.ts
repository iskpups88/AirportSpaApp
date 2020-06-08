import { Flight } from "./Flight";

export interface Aircraft {
    identifier: string,
    model: string,
    flightId: number,
    flights: Flight[]
}