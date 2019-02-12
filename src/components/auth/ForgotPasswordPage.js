import React, { Component } from 'react';
import AuthPageWrapper from './AuthPageWrapper';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { auth } from '../../firebase';

class ForgotPasswordPage extends Component {
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
    auth.sendPasswordResetEmail(this.state.email);
    // show a notification that reset link is sent
  }

  render() {
    return (
      <AuthPageWrapper
        image="https://images.pexels.com/photos/339119/pexels-photo-339119.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        imagePosition="right">
        <h1 className="title-primary">food-order</h1>
        <p className="subtitle">
          Enter your email and we send you a password reset link
        </p>
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
      </AuthPageWrapper>
    );
  }
}
export default ForgotPasswordPage;
