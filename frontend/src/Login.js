import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { A } from 'hookrouter';
import { Image } from 'react-bootstrap';
import imgLogin from '../images/logo-airbag.png'
import Axios from 'axios';
require('dotenv').config();

export default function Login() {
  var [isLogging, setIsLogging] = useState(false);
  var [email, setEmail] = useState('');
  var [token, setToken] = useState('');  
  var [code, setCode] = useState('');

  async function onClickLogin() {
    await Axios.post(process.env.REACT_APP_URL_LOGIN,
      {
        email: email
      }).then((res) => {
          console.log(res)
        if (res.status != 200) {
          alert("Cod introdus gresit, va rugam reincercati!")
        } else {
          onLoggedSuccessful();
        }
      })
  }

  function onClickVerifyBtn() {
    Axios.post(process.env.REACT_APP_URL_VERIFYLOGIN,
      {
        email: email,
        token: code
      }).then((res) => {
        if (res.status != 200) {
          alert("Cod introdus gresit, va rugam reincercati!")
        } else {
          onLoggedSuccessful();
        }
      })
  }

  function onLoggedSuccessful() {
    alert("In continuare, verifica email-ul si introdu codul pentru a te autentifica.")
    setIsLogging(true);
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }
  
  function onChangeCode(e) {
    setCode(e.target.value);
  }

  return (
    <div>
      <div className="container-fluid" style={{ width: "30%", margin: "auto" }}>
        <div className="row" style={{ display: "block" }}>
          <div className="login-wrap">
             <div className="img-wrapper" style={{ textAlign: "center" }}>
              <Image roundedCircle src={imgLogin}
                width="200px"
                height="200px"
                style={{ borderRadius: 1, borderColor: "#007bff", borderStyle: "groove", marginTop: "25px" }} />
             </div>
            <div>
              {isLogging != true ?
              <div>
                <h1 className="login">Log in</h1>
                <form action="submit">
                  <div className="form-email" style={{ marginBottom: "10px" }}>
                    <label for="email">Email</label>
                    <input type="email"
                      name="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={onChangeEmail}
                      placeholder="email@example.com"></input>
                  </div>
                  <div className="btn-login-wrapper" >
                    <Button variant="outline-primary" onClick={onClickLogin} size="lg" block style={{ marginBottom: "5px" }}>Login</Button>
                  </div>
                </form>
                </div> : ""}
            </div>
            <div>
              {isLogging == true ? 
                <div className="wrapper-verify-totp">
                <div className="form-verify-TOTP" style={{ marginBottom: "10px" }}>
                    <label for="code">Cod</label>
                    <input type="text"
                      name="code"
                      id="code"
                      className="form-control"
                      value={code}
                      onChange={onChangeCode}
                      placeholder="email@example.com"></input>
                </div>
              <Button variant="outline-primary"
                size="lg"
                onClick={onClickVerifyBtn}
                block style={{ marginBottom: "5px" }}>Verifica
                </Button>
                </div>: ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}