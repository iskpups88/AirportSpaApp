import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';

import { ConnectedComponentProps } from '../models/Common';
import { PageSizeRecords } from "../models/Common";
import { getPassengers, getAircraftMembers } from '../services/Api';
import { setLocalStorageObject, getLocalStorageObject } from '../services/LocalStorage';
import { AircraftMemberFilterModel, AircraftMember } from '../models/AircraftMember';
import AircraftMemberList from '../components/AircraftMember/AircraftMemberList';

const FILTER_LOCALSTORAGE_KEY = 'aircraftMember-filter-state';

const filterInitialState: AircraftMemberFilterModel = {
    flightNumber: ''
};

const AircraftMemberInfo: React.FC<ConnectedComponentProps & RouteComponentProps> = (props) => {
    const fromLocalStorageFilter = getLocalStorageObject<AircraftMemberFilterModel>(FILTER_LOCALSTORAGE_KEY,
        val => {
            return {
                ...filterInitialState,
                ...val,
            };
        });

    const [loading, setLoading] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [data, setData] = useState(new PageSizeRecords<AircraftMember>([], 0, pageSize, 0));
    const [filter, setFilter] = useState<AircraftMemberFilterModel>(fromLocalStorageFilter || filterInitialState);

    useEffect(() => {
        loadFlights();
    },
        [pageSize, pageNumber, filter]);

    const loadFlights = () => {
        if (!filter.flightNumber)
            return;
        setLoading(true);
        getAircraftMembers(pageNumber, pageSize, filter.flightNumber)
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

    const handleChangeFilter = (state: AircraftMemberFilterModel) => {
        if (pageNumber > 1) {
            setPageNumber(1);
        }

        setFilter(state);
        setLocalStorageObject(FILTER_LOCALSTORAGE_KEY, state);
    };

    return (
        <AircraftMemberList
            data={data}
            loading={loading}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangeFilter={handleChangeFilter}
            filter={filter}
        />);
}

export default AircraftMemberInfo;
