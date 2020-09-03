import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import { BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation} from 'react-router-dom';
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

const routes = {
  '/': () => <Acasa />,
  '/contact': () => <Contact />,
  '/echipa': () => <Echipa />,
  '/incarca-documente': () => <IncarcaDocumente />,
  '/status-actiuni': () => <StatusActiuni />,
  '/user': () => <User />,
  '/login': () => <Login />,
  '/register': () => <Register />,
}

export default function App() {
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





