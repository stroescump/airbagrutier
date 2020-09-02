import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { A } from 'hookrouter';
import { Image } from 'react-bootstrap';
import imgLogin from '../images/logo-airbag.png'
import axios from 'axios';
require('dotenv').config();

export default function Register() {
    var [name, setName] = useState('');
    var [email, setEmail] = useState('');
    var [phone, setPhone] = useState('');
    async function onClickRegister() {
        await axios.post(
            process.env.REACT_APP_URL_REGISTER,
            {
                name: name,
                email: email,
                phone: phone,
                token: ""
            }
        ).then((res) => {
            console.log(res.config)
            console.log(res.data)
            console.log(res.status)
            if (res.status != 201) {
                alert("Inregistrarea a esuat!")
            } else {
                alert("Te-ai inregistrat cu success!")
            }
        })
    }

    function onChangeName(e) {
        setName(e.target.value)
    }

    function onChangePhone(e) {
        setPhone(e.target.value)
    }

    function onChangeEmail(e) {
        setEmail(e.target.value)
    }
    return (
        <>
            <div className="container-fluid" style={{ width: "30%", margin: "auto" }}>
                <div className="row" style={{ display: "block" }}>
                    <div className="login-wrap">
                        <div className="img-wrapper" style={{ textAlign: "center" }}>
                            <Image roundedCircle src={imgLogin}
                                width="200px"
                                height="200px"
                                style={{ borderRadius: 1, borderColor: "#007bff", borderStyle: "groove", marginTop: "25px" }} />
                        </div>
                        <h1 className="login">Inregistrare</h1>
                        <form action="" >
                            <div className="form-name" style={{ marginBottom: "10px" }}>
                                <label for="name">Nume</label>
                                <input type="text"                                    
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    onChange={onChangeName}
                                    value={name}                                    
                                    placeholder="Introduceti numele dvs." />
                            </div>
                            <div className="form-email" style={{ marginBottom: "10px" }}>
                                <label for="email">Email</label>
                                <input type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    onChange={onChangeEmail}
                                    value={email}
                                    placeholder="email@example.com"></input>
                            </div>
                            <div className="form-phone" style={{ marginBottom: "10px" }}>
                                <label for="phone">Telefon</label>
                                <input type="text"
                                    name="phone"
                                    id="phone"
                                    className="form-control"
                                    onChange={onChangePhone}
                                    value={phone}
                                    placeholder="Introduceti numarul de telefon" />
                            </div>
                            <div className="btn-register-wrapper" >
                                <Button onClick={onClickRegister} variant="outline-primary" size="lg" block style={{ marginBottom: "5px" }}>Inregistrare</Button>
                            </div>
                        </form>
                        <p className="login-wrapper">
                            <A href="/login" className="ml">Login</A>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}