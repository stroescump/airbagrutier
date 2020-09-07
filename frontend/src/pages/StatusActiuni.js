import React, { useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { ApplicationContext } from '../App'
import {useHistory } from 'react-router-dom'

export default function StatusActiuni() {
    let history = useHistory();
    const appContext = useContext(ApplicationContext);
    const [email, setEmail] = useState(appContext.email);
    return (
        <>
            {appContext.isLogged == true ?
                <div>
                    <div style={{
                        textAlign: "center"
                    }}>
                        <h3>{appContext.name}</h3>
                    </div>
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
                </div>
                :  history.push('/login')}
        </>
    )
}