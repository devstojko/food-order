import React, { Component } from 'react';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import firebase from '../../../firebase';

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // validate email later?
    firebase.doPasswordReset(this.state.email);
    // show a notification that reset link is sent
  }

  render() {
    return (
      <form className="auth-page__content__form" onSubmit={this.handleSubmit}>
        <InputField
          type="email"
          name="email"
          label="Email"
          error={this.state.emailError}
          value={this.state.email}
          onChange={this.handleChange}
        />

        <Button type="primary" text="Send request" />
      </form>
    );
  }
}
