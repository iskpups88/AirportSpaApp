import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import { Passenger } from '../../models/Passenger';
import { ticketTranslates } from '../../models/Ticket';

interface PassengerItemProps {
    record: Passenger;
}

const PassengerItem: React.FC<PassengerItemProps> = (props) => {
    const record = props.record;

    return (
        <TableRow>
            <TableCell>{record.surname}</TableCell>
            <TableCell>{record.name}</TableCell>
            <TableCell>{record.patronymic}</TableCell>
            <TableCell>{new Date(record.birthDate).toLocaleDateString()}</TableCell>
            <TableCell>{record.series}</TableCell>
            <TableCell>{record.number}</TableCell>
            <TableCell>{record.ticket[0].seat}</TableCell>
            <TableCell>{ticketTranslates[record.ticket[0].class]}</TableCell>
            <TableCell>{record.ticket[0].price.toLocaleString('ru-RU', { style: 'currency', currency: "RUB" })}</TableCell>
        </TableRow>
    );
}

export default PassengerItem;