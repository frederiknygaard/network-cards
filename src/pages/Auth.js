import React, { Component } from 'react';

import AuthContext from '../context/auth-context';

import { loginUser } from './../helpers/api';

class AuthPage extends Component {

  state = {
    isLogin: true
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElm = React.createRef();
    this.passwordElm = React.createRef();
  }

  swichModeHandler = () => {
    this.setState(prevState => {
      return {isLogin: !prevState.isLogin}
    });
  }
  
  submitHandler = async event => {
    event.preventDefault();

    const email = this.emailElm.current.value;
    const password = this.passwordElm.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let login = await loginUser({email, password});

    console.log(login);
  }

  render() {
    return (
        <form className="o-form" onSubmit={this.submitHandler}>
          <div className="o-form__control">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={this.emailElm} />
          </div>
          <div className="o-form__control">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" ref={this.passwordElm} />
          </div>
          <div className="o-form__actions">
            <button type="submit">Submit</button>
            <button type="button" onClick={this.swichModeHandler}>Switch to {this.state.isLogin ? 'Signup' : 'Login'}</button>
          </div>
        </form>
    );
  }
}

export default AuthPage;
