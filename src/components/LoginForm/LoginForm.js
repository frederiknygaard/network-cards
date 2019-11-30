import React, { Component } from 'react';

import AuthContext from './../../context/auth-context';
import FormField from './../FormField/FormField';
import Button from './../Action/Button';

import { loginUser } from './../../helpers/api';

import styles from './LoginForm.scss';

class LoginForm extends Component {

  state = {
    errors: [],
    loading: false
  }

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailElm = React.createRef();
    this.passwordElm = React.createRef();
  }
  
  submitHandler = async event => {
    event.preventDefault();

    this.setState({loading: true});

    const email = this.emailElm.current.value;
    const password = this.passwordElm.current.value;

    // TODO: Create better check for password and email
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let response = await loginUser({email, password});

    console.log(response)

    if (response.errors) {
      this.setState({errors: response.errors})
    } else {
      this.context.login(response.data.login); 
    }
    
    this.setState({loading: false});
  }

  render() {

    console.log(this.state.loading)

    return (
      <form className={styles['login-form']} onSubmit={this.submitHandler}>
        <FormField id="email" placeholder="Email" inputRef={this.emailElm} type="email" />  
        <FormField id="password" placeholder="Password" inputRef={this.passwordElm} type="password" />
        <div className={styles['login-form__actions']}>
            <Button type="submit" text="Login" loading={this.state.loading} />
        </div>
        <div className={styles['login-form__errors']}>
          {this.state.errors.map((error, index) => 
            <p key={index}>{error.message}</p>
          )}
        </div>
      </form>
    );
  }
}

export default LoginForm;
