import React from 'react';

interface ColumnProps {
    width?: number
}

export default class Column extends React.Component<ColumnProps> {

    render() {
        return (
            <div className={`column col-sm-${this.props.width || 1}`}>
                {this.props.children}
            </div>
        );
    }
}
