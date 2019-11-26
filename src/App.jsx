import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import EventPage from './pages/Events';
import BookingPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';

import cookie from './helpers/cookie';
import OPTIONS from './helpers/options';

import AuthContext from './context/auth-context';

class App extends Component {

  constructor(props) {
    super(props)

    const token = cookie.getCookie(OPTIONS.COOKIES.TOKEN);
    const userId = cookie.getCookie(OPTIONS.COOKIES.USERID);

    this.state = {
      token: token ? token : null,
      nuserId: userId ? userId : null
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(login) {
    this.setState({
      token: login.token,
      userId: login.userId
    });
    cookie.login(login);
  }

  logout(login) {
    this.setState({
      token: null,
      userId: null
    });
    cookie.logout();
  }

  render() {
    return (
      <BrowserRouter>
        <AuthContext.Provider value={{token: this.state.token, userId: this.state.userId, login: this.login, logout: this.logout }}>
          <MainNavigation />
          <main className="h-main">
            {!this.state.token && <Route component={AuthPage} />}
            {this.state.token && <p>Logged in motherfucker</p>}
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
