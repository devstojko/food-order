import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import InputField from '../../common/InputField';
import Button from '../../common/Button';
import { signIn } from '../../../store/actions/authActions';

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
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    this.props.signIn(email, password, () => this.props.history.push('/home'));
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
            <Button type="primary" text="Login" />
          </div>

          <Link
            to="/signup"
            className="row-item"
            style={{ textDecoration: 'none' }}>
            <Button type="secondary" text="Sign up" />
          </Link>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  { signIn }
)(withRouter(SigninPage));
