import React from 'react';

import './App.css';
import LoginComponent from './pages/Login/Login';
import { Switch, Route } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';
import DashBoard from './pages/Home/Dashboard/DashBoard';


function App() {
  return (
    <Switch> 
    <Route exact path='/' component={LoginComponent}></Route> 
    <Route exact path='/signup' component={SignUp}></Route> 
    <Route exact path='/home' component={DashBoard}></Route> 
</Switch>
  );
}

export default App;
