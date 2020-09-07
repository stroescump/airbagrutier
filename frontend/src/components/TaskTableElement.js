import React from 'react';

export default class TaskTableElement extends React.Component {
    render(){
        return (
            <tr>
                <td>{this.props.nrCrt}</td>
                <td>{this.props.taskName}</td>
                <td>{this.props.taskLegalRepresentative}</td>
                <td>{this.props.taskObservations}</td>
            </tr>
        );
    }
}