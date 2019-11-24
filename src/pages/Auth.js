import React, { Component } from 'react';

import './Auth.css';
import AuthContext from './../context/auth-context';

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
  
  submitHandler = event => {
    event.preventDefault();

    const email = this.emailElm.current.value;
    const password = this.passwordElm.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    }

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch('/.netlify/functions/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('Failed');
      }
      return response.json();
    })
    .then(response => {
      console.log(response);
      if (response.data.login.token) {
        this.context.login(response.data.login)
      }
    })
    .catch(err => {
      console.log(err);
    })
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
