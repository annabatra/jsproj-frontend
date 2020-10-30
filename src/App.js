import React from 'react';

import './App.css';
import Home from './view/home.js';
import Register from './view/register.js';
import Login from './view/logon.js';
import Cookies from './view/cookies.js';
import Pricegraph from './view/pricegraph.js';
import Userpage from './view/userpage.js';



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <header className="App-header">
              <Link to="/">Hem</Link>|
              <Link to="/register">Registrera</Link>|
              <Link to="/logon">Logga in</Link>|
              <Link to="/cookies">Kakor</Link>|
              <Link to="/userpage">Min sida</Link>
            </header>
          <div class="centerMe">
          <Switch>
            <Route exact strict path="/" component={Home}/>
            <Route exact strict path="/logon" component={Login}/>
            <Route exact strict path="/register" component={Register}/>
            <Route exact strict path="/cookies" component={Cookies}/>
            <Route exact strict path="/userpage" component={Userpage}/>
            <Route exact strict path="/pricegraph/:id" component={Pricegraph}/>
          </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
