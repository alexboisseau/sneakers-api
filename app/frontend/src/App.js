import React from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BrandPage from './pages/BrandPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/AuthHook'
import { AuthContext } from './contexts/AuthContext'
import AccountPage from './pages/AccountPage'
import FavoritesSneakersPage from './pages/FavoritesSneakersPage';
import RegisterPage from './pages/RegisterPage'

const App = () => {
  const { token, login, logout, userId } = useAuth()
  let routes

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/account" component={AccountPage} />
        <Route exact path="/mysneakers" component={FavoritesSneakersPage} />
        <Route exact path="/:brand" component={BrandPage} />
        <Route exact path="/" component={HomePage} />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/:brand" component={BrandPage} />
      </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      <Router>
        <Navbar />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
