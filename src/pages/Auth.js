import React, { Component } from 'react';

import AuthContext from '../context/auth-context';
import Form from './../components/Form/Form';

import { loginUser } from './../helpers/api';

import styles from './Auth.scss';

class AuthPage extends Component {

  state = {
    errors: []
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

    const formfields = [
      {
        type: "password",
        placeholder: "Password"
      }
    ]

    return (
      <div className={styles.wrapper}>
        <Form formfields={formfields} />
      </div>
    );
  }
}

export default AuthPage;
