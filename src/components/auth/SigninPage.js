import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthPageWrapper from './AuthPageWrapper';
import InputField from '../common/InputField';
import Button from '../common/Button';

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        username: '',
        password: ''
      },
      username: '',
      password: '',
      remember: true // connect to the actual checkbox later
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
    const { errors, username, password, remember } = this.state;

    return (
      <AuthPageWrapper image="test" imagePosition="left">
        <h1 className="title-primary">food-order</h1>
        <p className="subtitle">Welcome back! Please login to your account.</p>

        <form className="auth-page__content__form" onSubmit={this.handleSubmit}>
          <InputField
            type="text"
            name="username"
            label="Username"
            error={errors.username}
            value={username}
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
          <div className="two-item-row">
            <div className="row-item">
              <input
                type="checkbox"
                name="remember"
                placeholder="Remember me"
                value={remember}
              />
              <span className="text-primary">Remember me</span>
            </div>

            <Link className="row-item text-primary" to="/forgot-password">
              Forgot Password
            </Link>
          </div>

          <div className="two-item-row">
            <div className="row-item">
              <Button type="primary" text="Login" />
            </div>

            <Link
              to="/signup"
              className="row-item"
              style={{ textDecoration: 'none' }}>
              <Button type="secondary" text="Sign up" />
            </Link>
          </div>
        </form>
      </AuthPageWrapper>
    );
  }
}

export default SigninPage;
