import React from 'react';

export default function TableElement(props) {
    return (
        <tr>
            <td>{props.nrCrt}</td>
            <td>{props.name}</td>
            <td>{props.author}</td>
            <td>{props.dateUploaded}</td>
        </tr>
    )

}