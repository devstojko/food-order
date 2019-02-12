import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../../store/actions/authActions';

const AuthLinks = ({ logOut }) => (
  <React.Fragment>
    <span className="navbar__link" onClick={logOut}>
      Logout
    </span>
  </React.Fragment>
);

export default connect(
  null,
  { logOut }
)(AuthLinks);
