import React, { useEffect, useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Axios from 'axios';
import bsCustomFileInput from 'bs-custom-file-input'
import $ from 'jquery'
import TableElement from '../components/TableElement';
import { ApplicationContext } from '../App'

require('dotenv').config()

export default function IncarcaDocumente() {
    const [tableElements, setTableElements] = useState([])
    const [documents, setDocuments] = useState([])
    const isLogged = useContext(ApplicationContext).isLogged;
    const email = useContext(ApplicationContext).email;
    var i = 0;
    var payload;

    useEffect(() => {
        $(document).ready(function () {
            bsCustomFileInput.init()
        })
        getAllFiles();
    }, []);

    function addEntriesToTable() {
        console.log(isLogged);
        console.log(email);
        
        
        documents.forEach(document => {
            var tableElement = React.createElement(TableElement, {
                nrCrt: ++i,
                name: document.name,
                author: document.author,
                dateUploaded: new Date(document.dateUploaded).toLocaleDateString()
            })
            tableElements.push(tableElement)
        });
        return tableElements;
    }

    async function getAllFiles() {
        // setDocuments([])
        console.log(process.env.REACT_APP_URL_GETFILES)
        await Axios.post(process.env.REACT_APP_URL_GETFILES,
            {
                email: email
            }).then((res) => {
                setDocuments(res.data)
                // console.log(this.state.documents)
            })
    }

    function onClickUploadBtn(e) {
        e.preventDefault()
        const fileName = e.target.file.value.split("\\")
        payload = {
            name: fileName[2],
            author: email,
            dateUploaded: new Date().toLocaleDateString(),
            email: email
        };
        // console.log(payload)
        Axios.post(
            process.env.REACT_APP_URL_POSTFILES,
            payload
        )
    }

    function addingTabs(payload){
        var tableElement = React.createElement(TableElement, {
            nrCrt: ++i,
            name: payload.name,
            author: payload.email,
            dateUploaded: payload.dateUploaded
        })
        return tableElement;
    }

    const urlForUpload = process.env.REACT_APP_URL_UPLOADFILES
    return (
        <>  {isLogged == true ?
            <div className="wrapper-verify-login">
                <Table bordered hover
                    style={{
                        width: "43.4%",
                        margin: "auto",
                        marginTop: "20px"
                    }}>
                    <thead>
                        <tr>
                            <th>Nr.crt</th>
                            <th>Nume document</th>
                            <th>Autor</th>
                            <th>Data incarcarii</th>
                        </tr>
                    </thead>
                    <tbody className="wrapper-document-entries" id="tableDocument">
                        {addEntriesToTable()}
                    </tbody>
                </Table>
                <form
                    id='uploadForm'
                    action={urlForUpload}
                    method='post'
                    onSubmit={onClickUploadBtn}
                    encType="multipart/form-data">
                    <div className="custom-file"
                        style={{
                            display: "block",
                            width: "43.4%",
                            margin: "auto",
                            marginTop: "20px"
                        }}>
                        <input type="file"
                            name="file"
                            className="custom-file-input"
                            id="customFile"
                            style={{
                                marginTop: "10px"
                            }} />
                        <label className="custom-file-label" for="customFile">Choose file</label>
                        <Button type='submit' variant="outline-primary" size="lg" block>Incarca</Button>
                    </div>
                </form>
            </div>
            :
            <div style={{
                marginTop:"20px",
                textAlign: "center"
            }}>
                <h2>Trebuie sa fii logat pentru a putea incarca documente.</h2>
            </div>}
        </>

    );
}