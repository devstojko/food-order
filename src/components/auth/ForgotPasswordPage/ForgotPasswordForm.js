import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
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
    firebase
      .doPasswordReset(this.state.email)
      .then(() =>
        toastr.success(
          'Password reset requested',
          'Please check your email address for a reset link'
        )
      )
      .catch(err => toastr.success('There was an error', err.message));
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

        <Button style="primary" type="submit" text="Send request" />
      </form>
    );
  }
}
