import React, { DataHTMLAttributes } from 'react';
import Row from './Row';
import Column from './Column';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

interface DateTimeRangeProps {
    id: string;
    from: Date;
    to: Date;
    labelFrom: string;
    labelTo: string;
    onChange: (from: Date, to: Date) => void;
    dateToDisabled: boolean;
}

interface DateTimeRangeState {
    from: Date;
    to: Date;
}

export default class DateTimeRange extends React.Component<DateTimeRangeProps, DateTimeRangeState> {

    constructor(props: DateTimeRangeProps) {
        super(props);

        this.state = {
            from: props.from,
            to: props.to,
        };
    }

    onDateFromChange = async (value: Date | null) => {
        await this.setState({
            from: value as Date,
        });

        this.props.onChange(
            this.state.from,
            this.state.to,
        );
    }

    onDateToChange = async (value: Date | null) => {
        await this.setState({
            to: value as Date,
        });

        this.props.onChange(
            this.state.from,
            this.state.to,
        );
    }

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Row className="middle-xs">
                    <Column width={2}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker-inline-from"
                            label={this.props.labelFrom}
                            maxDate={this.state.to}
                            value={this.state.from || ""}
                            onChange={date => this.onDateFromChange(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </Column>
                    <Column width={2}>
                        <KeyboardDatePicker
                            disableToolbar
                            disabled={this.props.dateToDisabled}
                            variant="inline"
                            format="dd.MM.yyyy"
                            margin="normal"
                            id="date-picker-inline-to"
                            label={this.props.labelTo}
                            minDate={this.state.from}
                            value={this.state.to || ""}
                            onChange={date => this.onDateToChange(date)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </Column>
                </Row>
            </MuiPickersUtilsProvider>
        );
    }
}
