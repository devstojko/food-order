import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import { Field, reduxForm } from 'redux-form';
import InputField from '@common/InputField';
import Button from '@common/Button';
import firebase from '@fb';
import validate from './validate';

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
    this.props.closeModal();
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
  handleSubmit: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default reduxForm({
  form: 'changeInfo',
  validate
})(InfoUpdateForm);
