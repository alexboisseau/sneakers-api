import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (  
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/:brand" component={BrandPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router> 
  );
}

export default App;
