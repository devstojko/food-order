import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InputField from './InputField';

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
    const { errors, username, password, remember } = this.state;

    return (
      <div className="auth-page">
        <div className="auth-page__image"></div>
        <div className="auth-page__content">
          <h1 className="auth-page__title">food-order</h1>
          <p className="auth-page__subtitle">
            Welcome back! Please login to your account.
          </p>
          <form className="form" onSubmit={this.handleSubmit}>
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
              <button className="form__btn btn btn--primary row-item">
                Login
              </button>
              <Link className="form__btn btn btn--secondary row-item" to="/signup">
                Sign up
              </Link>
            </div>
          </form>

          <span className="auth-page__terms text-primary">
            Terms of use. Privacy policy
          </span>
        </div>
      </div>
    );
  }
}

export default SigninPage;