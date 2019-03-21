import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import InputField from '@common/InputField';
import Button from '@common/Button';
import firebase from '@fb';
import validate from './validate';

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    firebase
      .doPasswordUpdate(values.passwordOne)
      .then(() => toastr.success('Success', 'Password Updated'))
      .catch(err => toastr.error('There was an error', err.message));
    this.props.closeModal();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          type="password"
          name="passwordOne"
          label="password"
          component={InputField}
        />
        <Field
          type="password"
          name="passwordTwo"
          label="confirmPassword"
          component={InputField}
        />

        <Button
          text="resetPw"
          style="primary"
          type="submit"
          inlineStyles={{ marginBottom: 0 }}
        />
      </form>
    );
  }
}

PasswordChangeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default reduxForm({ form: 'resetpw', validate })(PasswordChangeForm);
