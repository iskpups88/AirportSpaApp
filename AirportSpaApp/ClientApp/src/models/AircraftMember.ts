import { Aircraft } from "./Aircraft";

export interface AircraftMember {
    id: number;
    surname: string;
    name: string;
    patronymic: string;
    position: AircraftPosition;
    aircraftId: number;
    aircraft?: Aircraft;
}

enum AircraftPosition {
    Capitan,
    Pilot,
    Attendant
}

export interface AircraftMemberFilterModel {
    flightNumber: string;
}

export const aircraftPositionTranslates: any = {
    [AircraftPosition.Capitan]: 'Капитан',
    [AircraftPosition.Pilot]: 'Пилот',
    [AircraftPosition.Attendant]: 'Стюард',
}