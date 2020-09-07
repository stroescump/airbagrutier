import React, { useEffect, useState, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { ApplicationContext } from '../App'
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import TaskTableElement from '../components/TaskTableElement';
require('dotenv').config()

export default function StatusActiuni() {
    let history = useHistory();
    const appContext = useContext(ApplicationContext);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const getAllTasks = async () => {
            await Axios.get(
                process.env.REACT_APP_GETTASKSURL
            ).then(res => {
                console.log(res.data.tasks)
                if (res.status === 200 && res.data !== null) {
                    setTasks(res.data.tasks)
                }
            }).then(()=>{
            
            })
        };

        getAllTasks();
    
    }, [])

    function populateTableWithTasks() {
        let i=0;
        const entries=[];
        tasks.forEach((task)=>{
            entries.push(<TaskTableElement
            nrCrt={++i}
            taskName={task.taskName}
            taskLegalRepresentative={task.taskLegalRepresentative}
            taskObservations={task.taskObservations}
            >
            </TaskTableElement>)
        })
        return(entries)
    }

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
                            {populateTableWithTasks()}
                        </tbody>
                    </Table>
                </div>
                : history.push('/login')}
        </>
    )
}