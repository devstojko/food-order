import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import InputField from '@common/InputField';
import Button from '@common/Button';
import firebase from '@fb';

const validate = values => {
  const { firstName, lastName, username } = values;
  const errors = {};

  if (!firstName) {
    errors.firstName = 'First name is required';
  } else if (firstName.length < 2) {
    errors.firstName = 'First name is too short';
  }

  if (!lastName) {
    errors.lastName = 'Last name is required';
  } else if (lastName.length < 2) {
    errors.lastName = 'Last name is too short';
  }

  if (!username) {
    errors.username = 'Username is required';
  }

  return errors;
};

class InfoUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.handleInitialize = this.handleInitialize.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleInitialize();
  }

  handleInitialize() {
    const { firstName, lastName, username } = this.props.user;
    const initData = {
      firstName,
      lastName,
      username: username || 'not set'
    };

    this.props.initialize(initData);
  }

  handleSubmit(values) {
    firebase
      .updateUser(this.props.authUser.id, values)
      .then(() => {
        toastr.success('Success', 'Your information has been updated');
      })
      .catch(err => toastr.error('There was an error', err.message));
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Field
          name="firstName"
          label="First Name"
          component={InputField}
          value="test"
        />
        <Field name="lastName" label="Last Name" component={InputField} />
        <Field name="username" label="Username" component={InputField} />
        <Button text="Update" type="submit" />
      </form>
    );
  }
}

InfoUpdateForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: 'changeInfo',
  validate
})(InfoUpdateForm);
