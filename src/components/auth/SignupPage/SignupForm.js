import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import InputField from '../../common/InputField';
import firebase from '../../../firebase';
import Button from '../../common/Button';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { firstName, lastName, username, email, password } = values;
    const user = {
      email,
      firstName,
      lastName,
      username,
      password
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
          label="First Name"
          component={InputField}
        />
        <Field
          inline
          name="lastName"
          label="Last Name"
          component={InputField}
        />
        <Field name="username" label="Username" component={InputField} />
        <Field type="email" name="email" label="Email" component={InputField} />
        <Field
          type="password"
          name="password"
          label="Password"
          component={InputField}
        />
        <Field
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          component={InputField}
        />

        <Button text="Sign Up" style="primary" type="submit" />
        <Link className="link" to="/signin">
          Already have an account? Sign in.
        </Link>
      </form>
    );
  }
}

export default reduxForm({ form: 'signup' })(SignupForm);
