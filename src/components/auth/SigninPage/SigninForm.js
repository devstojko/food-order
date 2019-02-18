import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import { signIn } from '../../../store/actions/authActions';
import firebase from '../../../firebase';

const INITIAL_STATE = {
  errors: {
    email: '',
    password: ''
  },
  email: '',
  password: ''
};

class SigninPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    this.setState({ ...INITIAL_STATE });
    this.props.signIn(email, password);
  }

  handleGoogleSignin() {
    firebase
      .doSignInWithGoogle()
      .then(() => toastr.success('Signed in', 'Welcome to food order'))
      .catch(err => toastr.error('There was an error', err.message));
  }

  render() {
    const { errors, email, password, remember } = this.state;

    return (
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
            <Button style="primary" type="submit" text="Login" />
          </div>

          <div className="row-item">
            <Button
              style="secondary"
              type="button"
              text="Sign in with Google"
              onClick={this.handleGoogleSignin}
            />
          </div>
        </div>
      </form>
    );
  }
}

SigninPage.propTypes = {
  signIn: PropTypes.func.isRequired
};

export default connect(
  null,
  { signIn }
)(withRouter(SigninPage));
