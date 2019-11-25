import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import EventPage from './pages/Events';
import BookingPage from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';

import { getCookie, setCookie } from './helpers/cookie';

import AuthContext from './context/auth-context';

const OPTIONS = {
  COOKIE_TOKEN: 'network_card_token',
  COOKIE_USERID: 'network_card_userid'
}

class App extends Component {

  constructor(props) {
    super(props)

    const token = getCookie(OPTIONS.COOKIE_TOKEN);
    const userId = getCookie(OPTIONS.COOKIE_USERID);

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

    setCookie({
      name: OPTIONS.COOKIE_TOKEN,
      value: login.token,
      expiration: login.tokenExpiration
    });
    
    setCookie({
      name: OPTIONS.COOKIE_USERID,
      value: login.userId,
      expiration: login.tokenExpiration
    })
  }

  logout(login) {
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
            {!this.state.token && <Route component={AuthPage} />}
            {this.state.token && <p>Logged in motherfucker</p>}
          </main>
        </AuthContext.Provider>
      </BrowserRouter>
    );
  }
}

export default App;
