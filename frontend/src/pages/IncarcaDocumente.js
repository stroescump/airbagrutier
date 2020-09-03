import React, { Component, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import Axios from 'axios';
import bsCustomFileInput from 'bs-custom-file-input'
import $ from 'jquery'
import TableElement from '../components/TableElement';
import ApplicationContext from '../App'

require('dotenv').config()

export class IncarcaDocumente extends Component {
    static contextType = ApplicationContext;
    
    constructor(props) {
        super(props);
        this.state = {
            isLogged: null,
            email:null,
            documents: [],
            tableElements:[]
        };
    }

    addEntriesToTable() {
        // console.log(this.context.isLogged);
        // console.log(this.email);
        var i=0;
        this.state.documents.forEach(document =>{
            var tableElement = React.createElement(TableElement,{
                nrCrt:i++,
                name:document.name,
                author:document.author,
                dateUploaded: new Date(document.dateUploaded).toLocaleDateString()
            })
            this.state.tableElements.push(tableElement)
        });
        return this.state.tableElements;
    }

    async getAllFiles() {
        console.log(process.env.REACT_APP_URL_GETFILES)
        await Axios.post(process.env.REACT_APP_URL_GETFILES,
            {
                email: "stroescump@icloud.com"
            }).then((res) => {
                this.setState({
                    documents:res.data
                });
                // console.log(this.state.documents)
            })
    }

    componentDidMount() {
        $(document).ready(function () {
            bsCustomFileInput.init()
        })
        this.setState({
            isLogged:this.context.isLogged
        })
        this.getAllFiles();
    }

    onClickUploadBtn(e){
        e.preventDefault()
        const fileName = e.target.file.value.split("\\")
        Axios.post(
            process.env.REACT_APP_URL_POSTFILES,
            {
                name:fileName,
                author:"",
                dateUploaded:new Date().toLocaleTimeString,
                email:""
            }
        )
        this.getAllFiles();
    }

    render() {

        const urlForUpload = process.env.REACT_APP_URL_UPLOADFILES
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
                            <th>Nume document</th>
                            <th>Autor</th>
                            <th>Data incarcarii</th>
                        </tr>
                    </thead>
                    <tbody className="wrapper-document-entries" id="tableDocument">
                        {this.addEntriesToTable()}
                    </tbody>
                </Table>
                <form
                    id='uploadForm'
                    action={urlForUpload}
                    method='post'
                    onSubmit={this.onClickUploadBtn.bind(this)}
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
            </>
        );
    }
}