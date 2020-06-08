import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface LoadableProps {
    isLoading: boolean,
}

export default class Loadable extends React.Component<LoadableProps, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        if (this.props.isLoading) {
            return <CircularProgress />;
        }

        return this.props.children;
    }
}