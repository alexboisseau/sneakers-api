import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const App = () => {
  return (  
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:brand" component={BrandPage} />
      </Switch>
    </Router> 
  );
}

export default App;
