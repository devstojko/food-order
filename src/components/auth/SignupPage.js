import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthPageWrapper from './AuthPageWrapper';
import InputField from '../common/InputField';
import Button from '../common/Button';

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
    };

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
    const {
      errors,
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <AuthPageWrapper
        image="https://www.actaturcica.com/wp-content/uploads/2018/07/Red-Mountains-Landscape-Wallpaper.jpg"
        imagePosition="left">
        <h1 className="title-primary">food-order</h1>
        <p className="subtitle">Please complete to create your account.</p>
        <form className="auth-page__content__form" onSubmit={this.handleSubmit}>
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

          <Button text="Sign Up" type="primary" />
          <Link className="link" to="/signin">
            Already have an account? Sign in.
          </Link>
        </form>
      </AuthPageWrapper>
    );
  }
}

export default SignupPage;
