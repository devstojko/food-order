import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import { signIn } from '../../../store/actions/authActions';
import firebase from '../../../firebase';

class SigninPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGoogleSignin = this.handleGoogleSignin.bind(this);
  }

  handleSubmit(values) {
    const { email, password } = values;
    this.props.signIn(email, password);
  }

  handleGoogleSignin() {
    firebase
      .doSignInWithGoogle()
      .then(() => toastr.success('Signed in', 'Welcome to food order'))
      .catch(err => toastr.error('There was an error', err.message));
  }

  render() {
    return (
      <form
        className="auth-page__content__form"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field name="email" type="email" label="Email" component={InputField} />
        <Field
          name="password"
          type="password"
          label="Password"
          component={InputField}
        />
        <div className="two-item-row">
          <div className="row-item">
            <input type="checkbox" name="remember" placeholder="Remember me" />
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
)(withRouter(reduxForm({ form: 'signin' })(SigninPage)));
