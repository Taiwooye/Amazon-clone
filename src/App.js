import "./App.css";
import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from './Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
useEffect(()=>{
  
}, [])

  return (
  <Router>
      <div className="app">
     
      <Switch>
        <Route path="/login">
        <Login/>
        </Route>
        <Route path="/checkout">
        
        <Header/>
          <Checkout/>
        </Route>
        <Route path="/">

        <Header/>
        <Home/>

        </Route>

      </Switch>
  
      </div>
  </Router>
  );
}

export default App;
