import React from 'react';
import { Table, Button } from 'react-bootstrap';
require('dotenv').config()

export const IncarcaDocumente = () => {
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
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Document 1.pdf</td>
                        <td>Catalin Lungu</td>
                        <td>12/12/2020</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Document 2.docx</td>
                        <td>Catalin Lungu</td>
                        <td>11/12/2020</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Document 3.png</td>
                        <td>Popescu Ionut</td>
                        <td>14/12/2020</td>
                    </tr>
                </tbody>
            </Table>
            <form  
      id='uploadForm' 
      action={urlForUpload} 
      method='post' 
      encType="multipart/form-data">
        <input type="file" name="sampleFile" />
        <input type='submit' value='Upload!' />
    </form>   
            {/* <form 
                id='uploadForm'
                action={urlForUpload}
                method='post'
                encType="multipart/form-data">
                <div className="custom-file"
                    style={{
                        display: "block",
                        width: "43.4%",
                        margin: "auto",
                        marginTop: "20px"
                    }}>
                    <input type="file"
                        name="uploadFile"
                        className="custom-file-input"
                        id="customFile"
                        style={{
                            marginTop: "10px"
                        }} />
                    <label className="custom-file-label" for="customFile">Choose file</label>
                    <Button type='submit' variant="outline-primary" size="lg" block>Incarca</Button>
                </div>
            </form> */}
        </>
    )
}