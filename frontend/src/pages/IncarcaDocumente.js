import React, { useEffect, useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import Axios from 'axios';
import bsCustomFileInput from 'bs-custom-file-input'
import $ from 'jquery'
import TableElement from '../components/TableElement';
import { ApplicationContext } from '../App'
import { useHistory } from 'react-router-dom'
var FormData = require('form-data');
const fs = require('fs');

require('dotenv').config()

export default function IncarcaDocumente() {
    let history = useHistory();
    const appContext = useContext(ApplicationContext)
    const [tableElements, setTableElements] = useState([])
    const [documents, setDocuments] = useState([])
    const isLogged = appContext.isLogged;
    const email = appContext.email;
    const urlForUpload = process.env.REACT_APP_URL_UPLOADFILES


    var payload;

    useEffect(() => {
        $(document).ready(function () {
            bsCustomFileInput.init()
        })
    }, []);

    useEffect(() => {
        const getAllFiles = async () => {
            // console.log(process.env.REACT_APP_URL_GETFILES)
            Axios.get(process.env.REACT_APP_URL_GETFILES).then((res) => {
                setDocuments(res.data.docs)
            })
        }
        getAllFiles();
    }, [])

    function addEntriesToTable() {
        // console.log(isLogged);
        // console.log(email);
        var i = 0;
        documents.forEach((document) => {

            tableElements.push(<TableElement
                nrCrt={++i}
                name={document.name}
                author={document.author}
                dateUploaded={new Date(document.dateUploaded).toLocaleDateString()}
            >
            </TableElement>)
        });
        return tableElements;
    }

    function getAllFiles() {

    }

    function onClickUploadBtn(e) {
        e.preventDefault()
        var data = new FormData(e.target);
        console.log(data);
        const fileName = e.target.file.value.split("\\")
        data.append('email', email);
        data.append('name', fileName[2]);
        data.append('author', appContext.name);
        data.append('dateUploaded', new Date().toLocaleDateString());

        for (var key of data.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
        Axios.post(
            urlForUpload,
            data)

    }
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
                    method="POST"
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
            history.push('/login')}
        </>

    );
}