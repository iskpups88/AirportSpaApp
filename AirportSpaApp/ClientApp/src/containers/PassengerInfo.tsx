import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { ConnectedComponentProps } from '../models/Common';
import { PageSizeRecords } from "../models/Common";
import { getPassengers } from '../services/Api';
import { setLocalStorageObject, getLocalStorageObject } from '../services/LocalStorage';
import { PassengerFilterModel, Passenger } from '../models/Passenger';
import PassengerList from '../components/Passenger/PassengerList';

const FILTER_LOCALSTORAGE_KEY = 'passenger-filter-state';

const filterInitialState: PassengerFilterModel = {
    flightNumber: ''
};

const PassengerInfo: React.FC<ConnectedComponentProps & RouteComponentProps> = (props) => {
    const fromLocalStorageFilter = getLocalStorageObject<PassengerFilterModel>(FILTER_LOCALSTORAGE_KEY,
        val => {
            return {
                ...filterInitialState,
                ...val,
            };
        });

    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [data, setData] = useState(new PageSizeRecords<Passenger>([], 0, pageSize, 0));
    const [filter, setFilter] = useState<PassengerFilterModel>(fromLocalStorageFilter || filterInitialState);

    useEffect(() => {
        loadFlights();
    },
        [pageSize, pageNumber, filter]);

    const loadFlights = () => {
        if (!filter.flightNumber)
            return;
        setLoading(true);
        getPassengers(pageNumber, pageSize, filter.flightNumber)
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

    const handleChangeFilter = (state: PassengerFilterModel) => {
        if (pageNumber > 1) {
            setPageNumber(1);
        }

        setFilter(state);
        setLocalStorageObject(FILTER_LOCALSTORAGE_KEY, state);
    };

    return (
        <PassengerList
            data={data}
            loading={loading}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangeFilter={handleChangeFilter}
            filter={filter}
        />);
}

export default PassengerInfo;
