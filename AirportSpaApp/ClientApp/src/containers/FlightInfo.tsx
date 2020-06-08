import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { subDays } from 'date-fns'

import { ConnectedComponentProps } from '../models/Common';
import FlightList from '../components/Flight/FlightList';
import { Flight, FlightFilterModel } from "../models/Flight";
import { PageSizeRecords } from "../models/Common";
import { getFlight } from '../services/Api';
import { setLocalStorageObject, getLocalStorageObject } from '../services/LocalStorage';

const FILTER_LOCALSTORAGE_KEY = 'filter-state';

const filterInitialState: FlightFilterModel = {
    dateFrom: subDays(new Date(), 30),
    dateTo: new Date(),
    cityFrom: '',
    cityTo: '',
    flightNumber: '',
    completed: false
};

const FlightInfo: React.FC<ConnectedComponentProps & RouteComponentProps> = (props) => {
    const fromLocalStorageFilter = getLocalStorageObject<FlightFilterModel>(FILTER_LOCALSTORAGE_KEY,
        val => {
            return {
                ...filterInitialState,
                ...val,
                dateFrom: new Date(val.dateFrom),
                dateTo: new Date(val.dateTo),
            };
        });

    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [data, setData] = useState(new PageSizeRecords<Flight>([], 0, pageSize, 0));
    const [filter, setFilter] = useState<FlightFilterModel>(fromLocalStorageFilter || filterInitialState);

    useEffect(() => {
        loadFlights();
    },
        [pageSize, pageNumber, filter]);

    const loadFlights = () => {
        setLoading(true);
        getFlight(pageNumber, pageSize, filter)
            .then(result => {
                setData(result);
                setLoading(false);
            },
                (error) => {
                    setLoading(false);
                });
    };

    const handleChangePage = (pageNumber: number) => {
        setPageNumber(pageNumber + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageNumber(1);
        setPageSize(+event.target.value);
    };

    const handleChangeFilter = (state: FlightFilterModel) => {
        if (pageNumber > 1) {
            setPageNumber(1);
        }

        setFilter(state);
        setLocalStorageObject(FILTER_LOCALSTORAGE_KEY, state);
    };

    return (
        <FlightList
            data={data}
            loading={loading}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangeFilter={handleChangeFilter}
            filter={filter}
        />);
}

export default FlightInfo;
