import React, { Component } from 'react';

import AuthContext from '../context/auth-context';

import { loginUser } from './../helpers/api';

import styles from './Auth.scss';

class AuthPage extends Component {

  state = {
    errors: ['sa']
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElm = React.createRef();
    this.passwordElm = React.createRef();

    console.log(styles)
  }
  
  submitHandler = async event => {
    event.preventDefault();

    const email = this.emailElm.current.value;
    const password = this.passwordElm.current.value;

    // TODO: Create better check for password and email
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let response = await loginUser({email, password});

    console.log(response)

    if (response.errors) {
      this.setState({
        errors: response.errors
      })
    }

  }

  render() {
    return (
        <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={this.submitHandler}>
          <div className="o-form__control">
            <label htmlFor="email">Email</label>
            <input placeholder="Email" type="email" id="email" ref={this.emailElm} />
          </div>
          <div className="o-form__control">
            <label htmlFor="password">Password</label>
            <input placeholder="Password" type="password" id="password" ref={this.passwordElm} />
          </div>
          <div className="o-form__errors">
            {this.state.errors.map((error, index) => 
              <p key={index}>{error.message}</p>
            )}
          </div>
          <div className="o-form__actions">
            <button type="submit">Submit</button>
          </div>
        </form>
        </div>
    );
  }
}

export default AuthPage;
