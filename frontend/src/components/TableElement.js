import React, { PureComponent } from 'react';

export default class TableElement extends React.Component {
    render(){
        return (
            <tr>
                <td>{this.props.nrCrt}</td>
                <td>{this.props.name}</td>
                <td>{this.props.author}</td>
                <td>{this.props.dateUploaded}</td>
            </tr>
        );
    }
}