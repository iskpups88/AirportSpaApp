import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { AircraftMember, aircraftPositionTranslates } from '../../models/AircraftMember';

interface AircraftMemberItemProps {
    record: AircraftMember;
}

const AircraftMemberItem: React.FC<AircraftMemberItemProps> = (props) => {
    const record = props.record;

    return (
        <TableRow>
            <TableCell>{record.surname}</TableCell>
            <TableCell>{record.name}</TableCell>
            <TableCell>{record.patronymic}</TableCell>
            <TableCell>{aircraftPositionTranslates[record.position]}</TableCell>
        </TableRow>
    );
}

export default AircraftMemberItem;