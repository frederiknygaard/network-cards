import React, { Component } from 'react';
import styles from './Form.scss';

class Form extends Component {

  state = {
    errors: []
  }

  constructor(props) {
    super(props);

    props.formfields.forEach((formfield, index) => {
      this[index] = React.createRef();
    });
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

    const items = this.props.formfields.map((field, index) =>
      <p key={index}>{index}</p>
    );

    return (
      <div>
        {items}
      </div>
      // <form className={styles['form']} onSubmit={this.submitHandler}>
      //   <FormField id="email" placeholder="Email" inputRef={this.emailElm} type="email" />  
      //   <FormField id="password" placeholder="Password" inputRef={this.passwordElm} type="password" />
      //   <div className={styles['form__actions']}>
      //       <Button type="submit" text="Login" />
      //   </div>
      //   <div className={styles['form__errors']}>
      //     {this.state.errors.map((error, index) => 
      //       <p key={index}>{error.message}</p>
      //     )}
      //   </div>
      // </form>
    );
  }
}

export default Form;
