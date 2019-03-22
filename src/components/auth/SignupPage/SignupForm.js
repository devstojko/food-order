import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import InputField from '@common/InputField';
import Button from '@common/Button';
import firebase from '@fb';
import validate from './validation';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { firstName, lastName, username, email, password } = values;
    const user = {
      email,
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      username,
      password,
      avatar: 'default'
    };

    firebase
      .doSignUp(email, password)
      .then(data => {
        // save the user to firestore
        firebase.saveUser(data.user.uid, user);
        // show notification
        toastr.success(
          'Registration successful',
          'Welcome to food order website'
        );
      })
      .catch(err => toastr.error('There was an error', err.message));
  }

  render() {
    return (
      <form
        className="auth-page__content__form"
        onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          inline
          name="firstName"
          label="firstName"
          component={InputField}
        />
        <Field inline name="lastName" label="lastName" component={InputField} />
        <Field name="username" label="username" component={InputField} />
        <Field type="email" name="email" label="email" component={InputField} />
        <Field
          type="password"
          name="password"
          label="password"
          component={InputField}
        />
        <Field
          type="password"
          name="confirmPassword"
          label="confirmPassword"
          component={InputField}
        />

        <Button text="signup" style="primary" type="submit" />
      </form>
    );
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({ form: 'signup', validate })(SignupForm);
