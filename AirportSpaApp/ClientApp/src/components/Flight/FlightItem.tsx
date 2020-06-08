import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Flight } from "../../models/Flight";

interface FlightItemProps {
    record: Flight;
}

const FlightItem: React.FC<FlightItemProps> = (props) => {
    const record = props.record;

    return (
        <TableRow>
            <TableCell>{record.flightNumber}</TableCell>
            <TableCell>{record.airCompany}</TableCell>
            <TableCell>{new Date(record.departure).toLocaleString('ru-RU', { hour12: false })}</TableCell>
            <TableCell>{new Date(record.arrival).toLocaleString('ru-RU', { hour12: false })}</TableCell>
            <TableCell>{record.airportFrom.shortName}</TableCell>
            <TableCell>{record.airportFrom.city}</TableCell>
            <TableCell>{record.airportTo.shortName}</TableCell>
            <TableCell>{record.airportTo.city}</TableCell>
            <TableCell>{record.aircraft.model}</TableCell>
        </TableRow>
    );
}

export default FlightItem;