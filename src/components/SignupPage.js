import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SignupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    const { firstName, lastName, username, email, password, confirmPassword } = this.state;

    return (
      <div className="auth-page">
        <div className="auth-page__image"></div>
        <div className="auth-page__content">
          <h1 className="auth-page__title">food-order</h1>
          <h3 className="auth-page__subtitle">
            Please complete to create your account
          </h3>
          <form className="form" onSubmit={this.handleSubmit}>
            <input
              className="form__field"
              type="text"
              name="firstName"
              placeholder="First name"
              value={firstName}
              onChange={this.handleChange}
            />
            <input
              className="form__field"
              type="text"
              name="lastName"
              placeholder="Last name"
              value={lastName}
              onChange={this.handleChange}
            />
            <input
              className="form__field"
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            <input
              className="form__field"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            <input
              className="form__field"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <input
              className="form__field"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={this.handleChange}
            />
            
            <button className="form__submit">Sign Up</button>
            <Link className="form__link" to="/signin">
              Already have an account? Sign in.
            </Link>
          </form>

          <span className="auth-page__terms">
            Terms of user. Privacy policy
          </span>
        </div>
      </div>
    );
  }
}

export default SignupPage;