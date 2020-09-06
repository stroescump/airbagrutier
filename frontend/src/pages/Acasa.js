import React, { useContext } from 'react';
import { Button } from 'react-bootstrap'
import { ApplicationContext } from '../App';
import Axios from 'axios';

export const Acasa = () => {

    const appContext = useContext(ApplicationContext)
    return (
        <div className="wrapper-acasa-component">
            {/* {queryIsLogged()} */}
            <div style={{
                marginTop: "20px",
                textAlign: "center"
            }}>
                <h1>Acasa</h1>
            </div>
        </div>
    )
}