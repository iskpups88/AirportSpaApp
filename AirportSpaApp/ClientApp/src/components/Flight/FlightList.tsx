import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import { Flight, FlightFilterModel } from "../../models/Flight";
import { PageSizeRecords } from "../../models/Common";
import Loadable from "../common/Loadable";
import FlightItem from './FlightItem';
import FlightFilter from './FlightFilter'

interface FlightListProps {
    data: PageSizeRecords<Flight>;
    loading: boolean;
    onChangePage: (pageNumber: number) => void;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filter: FlightFilterModel;
    onChangeFilter: (state: FlightFilterModel) => void;
}

const FlightList: React.FC<FlightListProps> = (props) => {
    let totalCount = 0;
    let currentPage = 0;

    if (props.data.total && props.data.size) {
        totalCount = props.data.total * props.data.size;
    }

    if (props.data.number) {
        currentPage = props.data.number - 1;
    }

    return (
        <React.Fragment>
            <FlightFilter
                filter={props.filter}
                onChangeFilter={props.onChangeFilter} />
            <Loadable isLoading={props.loading}>
                <Paper>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Номер рейса</TableCell>
                                <TableCell>Авиакомпания</TableCell>
                                <TableCell>Время отправления</TableCell>
                                <TableCell>Время прибытия</TableCell>
                                <TableCell>Аэропорт вылета</TableCell>
                                <TableCell>Город вылета</TableCell>
                                <TableCell>Аэропорт прилета</TableCell>
                                <TableCell>Город прилета</TableCell>
                                <TableCell>Тип ВС</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.records.map((record: Flight) =>
                                <FlightItem
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
};

export default FlightList;

