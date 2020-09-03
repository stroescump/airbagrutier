import React, { useEffect, useState, Link } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Container } from 'react-bootstrap';
import { A } from 'hookrouter';
require('dotenv').config();

function Navigation() {
  let [users, updateUsers] = useState([]);
  let [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    fetch(process.env.REACT_APP_URL_REGISTER)
      .then((res) => res.json())
      .then((usersDB) => {
        updateUsers(usersDB)
      })
  }, []);

  function handleClick() {
    console.log(users.length);
  }

  function handleClickLogin() {
    setIsLogged(!isLogged);
  }

  return (
    <Container style={{
      maxWidth:"100%"
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
            <Nav.Link href="/">Acasa</Nav.Link>
            <NavDropdown title="Cont" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={handleClickLogin} href="/login">{isLogged == true ? "Log out" : "Login"}</NavDropdown.Item>
              <NavDropdown.Item href="/register">Inregistrare</NavDropdown.Item>
              <NavDropdown.Item href="/incarca-documente">Incarca document</NavDropdown.Item>
              <NavDropdown.Item href="/status-actiuni">Status actiuni</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/echipa">Echipa</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Cauta" className="mr-sm-2" />
            <Button variant="outline-primary" className="mr-2">Cauta</Button>
            <Button variant="outline-primary" onClick={handleClick}>Query DB</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default Navigation;