import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { ApplicationContext } from './App'
import Axios from 'axios';
require('dotenv').config();

function Navigation() {
  const appContext = useContext(ApplicationContext);
  var isLogged = appContext.isLogged

  return (
    <Container style={{
      maxWidth: "100%"
    }}>
      <Navbar expand="lg" style={{
        border: "1.5px",
        borderStyle: "solid",
        borderColor: "#007bff",
        borderRadius: "5px",
        marginTop: "10px"
      }}>
        <Navbar.Brand>Airbag Rutier</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" class="nav-link">Acasa</Link>
            <NavDropdown title="Cont" id="basic-nav-dropdown">
              <Link to="/login" onClick={(e) => {
                if (isLogged === true) e.currentTarget.innerHTML = "Log out"
                else e.currentTarget.innerHTML = "Login"
                if (isLogged === true && e.currentTarget.innerHTML === "Log out") {              
                  Axios.get(process.env.REACT_APP_DESTROYSESSION)
                  .then((res)=>{
                    if(res.status===200){
                      appContext.setIsLogged(false);
                      e.currentTarget.innerHTML = "Login";
                    }else{
                      window.location.reload();
                    }
                  })
                  
                }
              }} class="dropdown-item">{isLogged === true ? "Log out" : "Login"}</Link>
              {console.log(isLogged)}
              {isLogged === true ? "" : <Link to="/register" class="dropdown-item">Inregistrare</Link>}
              {isLogged === true ? <Link to="/incarca-documente" class="dropdown-item">Incarca document</Link> : ""}
              {isLogged === true ? <Link to="/status-actiuni" class="dropdown-item">Status actiuni</Link> : ""}
            </NavDropdown>
            <Link to="/echipa" class="nav-link">Echipa</Link>
            <Link to="/contact" class="nav-link">Contact</Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Cauta" className="mr-sm-2" />
            <Button variant="outline-primary" className="mr-2">Cauta</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Navigation;