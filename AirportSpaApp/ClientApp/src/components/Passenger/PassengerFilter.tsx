import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Buffer from '../common/Buffer'
import { PassengerFilterModel } from '../../models/Passenger';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filterMargin: {
            marginRight: 30,
            marginLeft: 15,
        },
    }),
);

interface PassengerFilterProps {
    filter: PassengerFilterModel;
    onChangeFilter: (state: PassengerFilterModel) => void;
}

const PassengerFilter: React.FC<PassengerFilterProps> = (props) => {
    const classes = useStyles({});
    const [filter, setFilter] = useState<PassengerFilterModel>(props.filter);


    const updateFilter = (name: keyof PassengerFilterModel, value) => {
        setFilter({ ...filter, [name]: value });
    };

    const handleChange = (name: keyof PassengerFilterModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter(name, event.target.value);
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className={classes.filterMargin}>
                    <TextField
                        label="Номер рейса"
                        value={filter.flightNumber}
                        onChange={handleChange('flightNumber')}
                        margin="normal"
                    />
                </div>
            </div>
            <Buffer />
            <Button variant="contained" color="primary" onClick={() => props.onChangeFilter(filter)}>
                Найти
            </Button>
            <Buffer />
        </React.Fragment>
    );

}

export default PassengerFilter;