import React, { Component } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Navigation from './Navigation';
import { Router, Route } from 'react-router';
import { useRoutes } from 'hookrouter';
import { Acasa } from './pages/Acasa';
import  {Contact}  from './pages/Contact';
import { Echipa } from './pages/Echipa';
import { IncarcaDocumente } from './pages/IncarcaDocumente';
import { StatusActiuni } from './pages/StatusActiuni';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

const routes = {
  '/': () => <Acasa />,
  '/contact': () => <Contact />,
  '/echipa': () => <Echipa />,
  '/incarca-documente': () => <IncarcaDocumente />,
  '/status-actiuni': () => <StatusActiuni />,
  '/user': () => <User />,
  '/login': () => <Login />,
  '/register': () => <Register />,
  '/forgot-password': () => <ForgotPassword />
}

function App() {
  const match = useRoutes(routes);
  return (
    <div className="App">
      <header className="App-header">
      <Navigation></Navigation>
        {match || <NotFound />}
      </header>
    </div>
  )
}

export default App;

