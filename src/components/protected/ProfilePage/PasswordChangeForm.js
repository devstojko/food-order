import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import firebase from '../../../firebase';
import InputField from '../../common/InputField';
import Button from '../../common/Button';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  errors: {
    passwordOne: '',
    passwordTwo: ''
  }
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('RUNS');

    firebase
      .doPasswordUpdate(this.state.passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        toastr.success('Success', 'Password Updated');
      })
      .catch(err => toastr.error('There was an error', err.message));
  }

  render() {
    const { passwordOne, passwordTwo, errors } = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.handleSubmit}>
        <InputField
          type="password"
          name="passwordOne"
          label="Password"
          error={errors.passwordOne}
          value={passwordOne}
          onChange={this.handleChange}
        />
        <InputField
          type="password"
          name="passwordTwo"
          label="Confirm Password"
          error={errors.passwordTwo}
          value={passwordTwo}
          onChange={this.handleChange}
        />

        <Button
          text="Reset Password"
          style="primary"
          type="submit"
          disabled={isInvalid}
        />
      </form>
    );
  }
}

export default PasswordChangeForm;
