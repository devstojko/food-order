import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOut } from '../../../store/actions/authActions';

const AuthLinks = ({ logOut }) => (
  <React.Fragment>
    <Link to="/profile" className="navbar__link">
      Profile
    </Link>
    <span className="navbar__link" onClick={logOut}>
      Logout
    </span>
  </React.Fragment>
);

export default connect(
  null,
  { logOut }
)(AuthLinks);
