import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SigninPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    const { username, password, remember } = this.state;

    return (
      <div className="auth-page">
        <div className="auth-page__image"></div>
        <div className="auth-page__content">
          <h1 className="auth-page__title">food-order</h1>
          <h3 className="auth-page__subtitle">
            Welcome back! Please login to your account.
          </h3>
          <form className="form" onSubmit={this.handleSubmit}>
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
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <input 
              type="checkbox"
              name="remember"
              placeholder="Remember me"
              value={remember}
            />
            <Link to="/forgot-password">Forgot Password</Link>

            <button className="form__submit">Login</button>
            <Link to="/signup">Sign up</Link>
          </form>

          <span className="auth-page__terms">
            Terms of user. Privacy policy
          </span>
        </div>
      </div>
    );
  }
}

export default SigninPage;