import React, { Component } from 'react';
import InputField from './InputField';
import Button from './Button';

class ForgotPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    return (
      <div className="auth-page">
        <div className="auth-page__image"></div>
        <div className="auth-page__content">
          <h1 className="auth-page__title">food-order</h1>
          <p className="auth-page__subtitle">
            Enter your email and we send you a password reset link
          </p>
          <form className="form" onSubmit={this.handleSubmit}>
            <InputField
              type="email"
              name="email"
              label="Email"
              error={this.state.emailError}
              value={this.state.email}
              onChange={this.handleChange}
            />
            
            <Button type="primary" text="Send request" className="form__btn" />
          </form>

          <span className="auth-page__terms text-primary">
            Terms of use. Privacy policy
          </span>
        </div>
      </div>
    );
  }
}
export default ForgotPasswordPage;