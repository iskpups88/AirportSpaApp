import React from 'react';
import classNames from 'classnames';

export default class Row extends React.Component<{ className?: string; }> {
    render() {
        return (
            <div className={classNames('row', this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}
