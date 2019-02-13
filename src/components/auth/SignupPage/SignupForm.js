import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../../firebase';
import InputField from '../../common/InputField';
import Button from '../../common/Button';

const INITIAL_STATE = {
  errors: {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
};

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // validate data before creating a user LATER
    const { email, password } = this.state;
    firebase
      .doSignUp(email, password)
      .then(user => {
        // create the user in the database LATER
        console.log('USER CREATED: ', user);
        // clear the state & maybe show a success message
        this.props.history.push('/signin');
      })
      .catch(err => console.log('ERROR ', err));
  }

  render() {
    const {
      errors,
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword
    } = this.state;

    return (
      <form className="auth-page__content__form" onSubmit={this.handleSubmit}>
        <InputField
          inline
          type="text"
          name="firstName"
          label="First Name"
          error={errors.firstName}
          value={firstName}
          onChange={this.handleChange}
        />
        <InputField
          inline
          type="text"
          name="lastName"
          label="Last Name"
          error={errors.lastName}
          value={lastName}
          onChange={this.handleChange}
        />
        <InputField
          type="text"
          name="username"
          label="Username"
          error={errors.username}
          value={username}
          onChange={this.handleChange}
        />
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
        <InputField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          error={errors.confirmPassword}
          value={confirmPassword}
          onChange={this.handleChange}
        />

        <Button text="Sign Up" type="primary" />
        <Link className="link" to="/signin">
          Already have an account? Sign in.
        </Link>
      </form>
    );
  }
}

export default withRouter(SignupForm);
