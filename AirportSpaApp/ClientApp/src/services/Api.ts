import { apiGet } from './Ajax';
import { cleanObject, toSearchParams, getFormattedDateRange } from './Utils';

import { Flight, FlightFilterModel } from "../models/Flight";
import { PageSizeRecords } from "../models/Common";
import { Passenger } from '../models/Passenger';
import { AircraftMember } from '../models/AircraftMember';

export function getFlight<T = PageSizeRecords<Flight>>(pageNumber: number, pageSize: number, filter: FlightFilterModel): Promise<T> {
    const flightNumber = filter.flightNumber ? filter.flightNumber : null;
    const cityFrom = filter.cityFrom ? filter.cityFrom : null;
    const cityTo = filter.cityTo ? filter.cityTo : null;

    const { formattedStartDate, formattedEndDate } = getFormattedDateRange(filter.dateFrom, filter.dateTo);

    const data = {
        'pageNumber': pageNumber,
        'pageSize': pageSize,
        'flightNumber': flightNumber,
        'cityFrom': cityFrom,
        'cityTo': cityTo,
        'dateFrom': formattedStartDate,
        'dateTo': formattedEndDate,
        'completed': filter.completed
    };

    return apiGet<T>("flight", data);
}

export function getPassengers<T = PageSizeRecords<Passenger>>(pageNumber: number, pageSize: number, flightNumber: string): Promise<T> {

    const data = {
        'pageNumber': pageNumber,
        'pageSize': pageSize,
        'flightNumber': flightNumber
    };

    return apiGet<T>("passenger/byFlightNumber", data);
}

export function getAircraftMembers<T = PageSizeRecords<AircraftMember>>(pageNumber: number, pageSize: number, flightNumber: string): Promise<T> {

    const data = {
        'pageNumber': pageNumber,
        'pageSize': pageSize,
        'flightNumber': flightNumber
    };

    return apiGet<T>("aircraftMember/byFlightNumber", data);
}

