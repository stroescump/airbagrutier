import React from 'react';
import { Table, Button } from 'react-bootstrap';

export const IncarcaDocumente = () => {
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
            <form>
                <div class="custom-file"
                    style={{
                        display: "block",
                        width: "43.4%",
                        margin: "auto",
                        marginTop: "20px"
                    }}>
                    <input type="file"
                        class="custom-file-input"
                        id="customFile"
                        style={{
                            marginTop: "10px"
                        }} />
                    <label class="custom-file-label" for="customFile">Choose file</label>
                    <Button variant="outline-primary" size="lg" block>Incarca</Button>
                </div>
            </form>
        </>
    )
}