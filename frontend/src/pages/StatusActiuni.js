import React from 'react';
import { Table } from 'react-bootstrap';

export const StatusActiuni = () => {
    return (
        <>
            <Table bordered hover
                style={{
                    width: "43.4%",
                    margin: "auto",
                    marginTop: "20px"
                }}>
                <thead>
                    <tr>
                        <th>Nr.crt</th>
                        <th>Actiune</th>
                        <th>Reprezentant legal</th>
                        <th>Observatii</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Proces OMNIASIG</td>
                        <td>Catalin Lungu</td>
                        <td>Instanta in pronuntare</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Proces LIBRA</td>
                        <td>Catalin Lungu</td>
                        <td>Instanta in pronuntare</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Proces ASIROM</td>
                        <td>Catalin Lungu</td>
                        <td>Instanta in pronuntare</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}