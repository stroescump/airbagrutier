import React, { useState, useEffect } from 'react';
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
import { BrowserRouter as Router, Route, Redirect, useHistory } from 'react-router-dom'
import Axios from 'axios';


export const ApplicationContext = React.createContext();

function App() {
  let history = useHistory();
  const [isLogged, setIsLogged] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [jwt,setJwt] = useState('')

  function checkIfSessionValid(){
    Axios.get(
      "/createSession",
    ).then(res=>{
      if(res.status==404){
        history.push('/login')
      }
      if(res.status===200 &&
        res.data!==null || res.data!==undefined){
        console.log(res.data.isLogged)
        setIsLogged(res.data.isLogged);
        setEmail(res.data.email);
        setName(res.data.name);
        history.push('/status-documente')       
      }
    })    
  }

  return (
      <div className="App">
        <header className="App-header">          
          <ApplicationContext.Provider value={{ isLogged, setIsLogged, email, setEmail, name, setName, jwt, setJwt }}>
            <Navigation></Navigation>
            {checkIfSessionValid()}
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
  )
}
export default App





