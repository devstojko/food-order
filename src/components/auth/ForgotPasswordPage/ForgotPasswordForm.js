import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import InputField from '@common/InputField';
import Button from '@common/Button';
import firebase from '@fb';
import validate from './validation';

class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    firebase
      .doPasswordReset(values.email)
      .then(() =>
        toastr.success(
          'Password reset requested',
          'Please check your email for a reset link'
        )
      )
      .catch(err => toastr.success('There was an error', err.message));
  }

  render() {
    return (
      <form
        className="auth-page__content__form"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field type="email" name="email" label="Email" component={InputField} />

        <Button style="primary" type="submit" text="Send request" />
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({ form: 'forgotpw', validate })(ForgotPasswordForm);
