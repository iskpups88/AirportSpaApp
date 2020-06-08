import { apiGet } from './Ajax';
import { cleanObject, toSearchParams, getFormattedDateRange } from './Utils';

import { Flight, FlightFilterModel } from "../models/Flight";
import { PageSizeRecords } from "../models/Common";
import { Passenger } from '../models/Passenger';

const BASE_URL = '/api/v1';

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

    const params = '?' + toSearchParams(cleanObject(data));

    const url = `${BASE_URL}/flight${params}`;

    const method = 'GET';

    return fetch(url,
        {
            method,
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText);

            return response.json();
        });
}

export function getPassengers<T = PageSizeRecords<Passenger>>(pageNumber: number, pageSize: number, flightNumber: string): Promise<T> {

    const data = {
        'pageNumber': pageNumber,
        'pageSize': pageSize,
        'flightNumber': flightNumber
    };

    const params = '?' + toSearchParams(cleanObject(data));

    const url = `${BASE_URL}/passenger/byFlightNumber${params}`;

    const method = 'GET';

    return fetch(url,
        {
            method,
            credentials: 'include',
        })
        .then(response => {
            if (!response.ok)
                throw new Error(response.statusText);

            return response.json();
        });
}