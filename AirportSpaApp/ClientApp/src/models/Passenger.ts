import { Ticket } from "./Ticket";

export interface Passenger {
    id: number;
    surname: string;
    name: string;
    birthDate: string,
    patronymic?: string;
    address: string;
    series: string;
    number: string;
    ticket: Ticket[];
}

export interface PassengerFilterModel {
    flightNumber: string;
}