import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';

class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errors: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    const { errors, firstName, lastName, username, email, password, confirmPassword } = this.state;

    return (
      <div className="auth-page">
        <div className="auth-page__image"></div>
        <div className="auth-page__content">
          <h1 className="auth-page__title">food-order</h1>
          <p className="auth-page__subtitle">
            Please complete to create your account.
          </p>
          <form className="form" onSubmit={this.handleSubmit}>    
            <InputField
              inline
              type="text"
              name="firstName"
              label="First Name"
              error={errors.firstName}
              value={firstName}
              onChange={this.handleChange}
            />
            <InputField
              inline
              type="text"
              name="lastName"
              label="Last Name"
              error={errors.lastName}
              value={lastName}
              onChange={this.handleChange}
            />
            <InputField
              type="text"
              name="username"
              label="Username"
              error={errors.username}
              value={username}
              onChange={this.handleChange}
            />
            <InputField
              type="email"
              name="email"
              label="Email"
              error={errors.email}
              value={email}
              onChange={this.handleChange}
            />
            <InputField
              type="password"
              name="password"
              label="Password"
              error={errors.password}
              value={password}
              onChange={this.handleChange}
            />
            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword}
              value={confirmPassword}
              onChange={this.handleChange}
            />
            
            <button className="form__btn btn btn--primary">Sign Up</button>
            <Link className="form__link" to="/signin">
              Already have an account? Sign in.
            </Link>
          </form>

          <span className="auth-page__terms text-primary">
            Terms of use. Privacy policy
          </span>
        </div>
      </div>
    );
  }
}

export default SignupPage;