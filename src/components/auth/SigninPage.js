import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthPageWrapper from './AuthPageWrapper';
import InputField from '../common/InputField';
import Button from '../common/Button';
import { signIn } from '../../store/actions/authActions';

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {
        email: '',
        password: ''
      },
      email: '',
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

    const { email, password } = this.state;
    this.props.signIn(email, password);
    this.props.history.push('/home'); // this needs to happen only when the signIn is completed because signIn is async
  }

  render() {
    const { errors, email, password, remember } = this.state;

    return (
      <AuthPageWrapper
        image="https://images.pexels.com/photos/1108234/pexels-photo-1108234.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        imagePosition="left">
        <h1 className="title-primary">food-order</h1>
        <p className="subtitle">Welcome back! Please login to your account.</p>

        <form className="auth-page__content__form" onSubmit={this.handleSubmit}>
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

export default connect(
  null,
  { signIn }
)(SigninPage);
