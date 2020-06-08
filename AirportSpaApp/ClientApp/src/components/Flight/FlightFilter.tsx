import React, { useState } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DateTimeRange from '../common/DateTimeRange';
import Buffer from '../common/Buffer'
import { FlightFilterModel } from '../../models/Flight';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filterMargin: {
            marginRight: 30,
            marginLeft: 15,
        },
    }),
);

interface FlightFilterProps {
    filter: FlightFilterModel;
    onChangeFilter: (state: FlightFilterModel) => void;
}

const FlightFilter: React.FC<FlightFilterProps> = (props) => {
    const classes = useStyles({});
    const [filter, setFilter] = useState<FlightFilterModel>(props.filter);

    const updateFilter = (name: keyof FlightFilterModel, value) => {
        setFilter({ ...filter, [name]: value });
    };

    const handleChange = (name: keyof FlightFilterModel) => (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFilter(name, event.target.value);
    };

    const onDateTimeRangeChange = (dateFrom: Date, dateTo: Date) => {
        setFilter({ ...filter, dateFrom, dateTo });
    };

    return (
        <React.Fragment>
            <DateTimeRange
                onChange={onDateTimeRangeChange}
                id="timeRange"
                to={filter.dateTo}
                from={filter.dateFrom}
                labelFrom={"Дата вылета"}
                labelTo={"Дата прилёта"}
                dateToDisabled={filter.completed} />
            <div className="row">
                <div className={classes.filterMargin}>
                    <TextField
                        label="Номер рейса"
                        value={filter.flightNumber}
                        onChange={handleChange('flightNumber')}
                        margin="normal"
                    />
                </div>
                <div className={classes.filterMargin}>
                    <TextField
                        label="Город вылета"
                        value={filter.cityFrom}
                        onChange={handleChange('cityFrom')}
                        margin="normal"
                    />
                </div>
                <div className={classes.filterMargin}>
                    <TextField
                        label="Город прилета"
                        value={filter.cityTo}
                        onChange={handleChange('cityTo')}
                        margin="normal"
                    />
                </div>
            </div>
            <Buffer />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={filter.completed}
                        onChange={(event) => updateFilter('completed', event.target.checked)}
                        value="completed"
                        color="primary"
                    />
                }
                label="Показать совершенные полёты" />
            <Buffer />
            <Button variant="contained" color="primary" onClick={() => props.onChangeFilter(filter)}>
                Найти
            </Button>
            <Buffer />
        </React.Fragment>
    );

}

export default FlightFilter;