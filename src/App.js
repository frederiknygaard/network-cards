import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';

import AuthPage from './pages/Auth';
import EventPage from './pages/Events';
import BookingPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';

import AuthContext from './context/auth-context';

class App extends Component {
  
  state = {
    token: null,
    userId: null
  }

  login = (login) => {
    this.setState({
      token: login.token,
      userId: login.userId
    })
  }

  logout = (login) => {
    this.setState({
      token: null,
      userId: null
    })
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
          <MainNavigation />
          <main className="h-main">
            <Switch>
                {this.state.token && <Redirect exact from="/" to="/events/" /> }
                {this.state.token && <Redirect exact from="/auth" to="/events/" /> }
                {!this.state.token && <Route path="/auth/" component={AuthPage} /> }
                <Route path="/events/" component={EventPage} />
                {this.state.token && <Route path="/bookings/" component={BookingPage} /> }
                {!this.state.token && <Redirect exact to="/auth/" /> }
            </Switch>
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
