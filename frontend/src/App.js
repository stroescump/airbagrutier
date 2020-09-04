import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import { useRoutes } from 'hookrouter';
import { Acasa } from './pages/Acasa';
import { Contact } from './pages/Contact';
import { Echipa } from './pages/Echipa';
import IncarcaDocumente from './pages/IncarcaDocumente';
import StatusActiuni from './pages/StatusActiuni';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

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

export const ApplicationContext = React.createContext();

function App() {
  const match = useRoutes(routes);
  const [isLogged, setIsLogged] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <ApplicationContext.Provider value={{ isLogged, setIsLogged, email, setEmail, name, setName }}>
            <Navigation></Navigation>
            <Route exact path="/" component={Acasa} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/incarca-documente" component={IncarcaDocumente} />
            <Route exact path="/status-actiuni" component={StatusActiuni} />
            <Route exact path="/echipa" component={Echipa} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/notfound" component={NotFound} />
          </ApplicationContext.Provider>
        </header>
      </div>
    </Router>
  )
}

export default App





