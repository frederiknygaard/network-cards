import React, { Component } from 'react';

import AuthContext from '../context/auth-context';
import LoginForm from './../components/LoginForm/LoginForm';

import { loginUser } from './../helpers/api';

import styles from './Auth.scss';

class AuthPage extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <LoginForm />
      </div>
    );
  }
}

export default AuthPage;
