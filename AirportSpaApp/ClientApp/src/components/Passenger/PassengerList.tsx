import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { PassengerFilterModel, Passenger } from '../../models/Passenger';
import { PageSizeRecords } from '../../models/Common';
import Loadable from "../common/Loadable";
import PassengerItem from './PassengerItem';
import FlightNumberFilter from '../common/FlightNumberFilter';

interface PassengerListProps {
    data: PageSizeRecords<Passenger>;
    loading: boolean;
    onChangePage: (pageNumber: number) => void;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filter: PassengerFilterModel;
    onChangeFilter: (state: PassengerFilterModel) => void;
}

const PassengerList: React.FC<PassengerListProps> = (props) => {
    let totalCount = 0;
    let currentPage = 0;

    if (props.data.totalPages && props.data.size) {
        totalCount = props.data.totalPages * props.data.size;
    }

    if (props.data.number) {
        currentPage = props.data.number - 1;
    }

    return (
        <React.Fragment>
            <FlightNumberFilter
                filter={props.filter}
                onChangeFilter={props.onChangeFilter} />
            <Loadable isLoading={props.loading}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Фамилия</TableCell>
                                <TableCell>Имя</TableCell>
                                <TableCell>Отчество</TableCell>
                                <TableCell>Дата рождения</TableCell>
                                <TableCell>Серия паспорта</TableCell>
                                <TableCell>Номер паспорта</TableCell>
                                <TableCell>Место</TableCell>
                                <TableCell>Класс</TableCell>
                                <TableCell>Стоимость билета</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.records.map((record: Passenger) =>
                                <PassengerItem
                                    key={record.id}
                                    record={record}
                                />
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[1, 10, 15, 20, 50]}
                        component="div"
                        count={totalCount}
                        rowsPerPage={props.data.size as number}
                        page={currentPage}
                        backIconButtonProps={{
                            'aria-label': 'previous page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'next page',
                        }}
                        onChangePage={(event, newPage) => props.onChangePage(newPage)}
                        onChangeRowsPerPage={props.onChangeRowsPerPage} />
                </Paper>
            </Loadable>
        </React.Fragment>
    );
}

export default PassengerList;
