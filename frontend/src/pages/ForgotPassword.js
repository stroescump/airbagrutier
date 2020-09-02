import React from 'react';
import { Button } from 'react-bootstrap';
import { A } from 'hookrouter';
import { Image } from 'react-bootstrap';
import imgLogin from '../images/logo-airbag.png'

export default function ForgotPassword() {
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
                        <h1 className="login">Recuperare parola</h1>
                        <form action="">
                            <div className="form-email" style={{ marginBottom: "10px" }}>
                                <label for="email">Email</label>
                                <input type="email" name="email" id="email" className="form-control" placeholder="email@example.com"></input>
                            </div>
                            <div className="btn-register-wrapper" >
                                <Button variant="outline-primary"
                                    size="lg"
                                    block
                                    style={{ marginBottom: "5px" }}>Recupereaza parola</Button>
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