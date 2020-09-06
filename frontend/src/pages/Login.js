import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { Image } from 'react-bootstrap';
import imgLogin from '../images/logo-airbag.png'
import Axios from 'axios';
import { ApplicationContext } from '../App'
require('dotenv').config();

export default function Login() {
  let history = useHistory();
  const appContext = useContext(ApplicationContext)
  const [isTryingToLogin, setIsTryingToLogin] = useState(false)
  const [email, setEmail] = useState(appContext.email)
  const [token, setToken] = useState('');
  const [name, setName] = useState(appContext.name);


  function onClickLogin(e) {
    e.preventDefault()
    Axios.post(process.env.REACT_APP_URL_LOGIN,
      {
        email: email
      }).then((res) => {
        if (res.status !== 200) {
          alert("Cod introdus gresit, va rugam reincercati!")
        } else {
          onTokenSendSuccessfuly();
        }
      })
  }

  function onClickVerifyBtn() {
    Axios.post(process.env.REACT_APP_URL_VERIFYLOGIN,
      {
        email: email,
        token: token,
      },{
        withCredentials:true
      }).then((res, err) => {
        // console.log(res);
        if (res.status == 200) {
          // alert("Bine ai venit, " + res.data.name + " !");
          // console.log(res.data.name)
          appContext.setIsLogged(true)
          appContext.setEmail(email)
          appContext.setName(res.data.name)
          history.push('/status-actiuni')
        }
      }, (res) => {
        if (res.status != 400) {
          alert("Token incorect!")
        } else {
          alert("Eroare necunoscuta, va rugam contactati administratorul site-ului.")
        }
      });
  }

  function onTokenSendSuccessfuly() {
    // alert("In continuare, verifica email-ul si introdu codul pentru a te autentifica.");
    setIsTryingToLogin(true);
  }

  function onChangeEmail(e) {
    setEmail(e.target.value);
  }

  function onChangeToken(e) {
    setToken(e.target.value);
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
            <div>
              {isTryingToLogin != true ?
                <div>
                  <h1 className="login">Log in</h1>
                  <form action="/login" onSubmit={e => onClickLogin(e)}>
                    <div className="form-email" style={{ marginBottom: "10px" }}>
                      <label for="email">Email</label>
                      <input type="text"
                        name="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="email@example.com"></input>
                    </div>
                    <div className="btn-login-wrapper" >
                      <Button variant="outline-primary" type="submit" size="lg" block style={{ marginBottom: "5px" }}>Login</Button>
                    </div>
                  </form>
                </div> : ""}
            </div>
            <div>
              {isTryingToLogin == true ?
                <div className="wrapper-verify-form">
                  <div className="form-verify-login" style={{ marginBottom: "10px" }}>
                    <label for="token" style={{
                      display: "block",
                      margin: "auto",
                      marginTop: "5px",
                      textAlign: "center"
                    }}>Cod</label>
                    <input type="text"
                      name="token"
                      id="token"
                      className="form-control"
                      value={token}
                      onChange={onChangeToken}
                      placeholder="xxxxxx" style={{
                        textAlign: "center"
                      }}></input>
                  </div>
                  <Button variant="outline-primary"
                    size="lg"
                    onClick={onClickVerifyBtn}
                    block style={{ marginBottom: "5px" }}>Verifica
                </Button>
                </div> : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}