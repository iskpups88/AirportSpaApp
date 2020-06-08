import { Airport } from './Airport'
import { Aircraft } from './Aircraft'

export interface Flight {
    id: number;
    flightNumber: string;
    date: string;
    airportFromId: number;
    airportFrom?: Airport;
    airportToId: number;
    airportTo?: Airport;
    departure: string;
    arrival: string;
    aircraftId: number;
    aircraft?: Aircraft;
    airCompany: string;
}

export interface FlightFilterModel{
    dateFrom?: Date;
    dateTo?: Date;
    flightNumber?: string;
    cityFrom? : string;
    cityTo?: string;
    completed: boolean;
}