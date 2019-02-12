import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navbar.scss';

const Navbar = ({ authUser }) => (
  <nav className="navbar">
    <div className="container">
      <div className="navbar__link-group">
        <Link to="/" className="navbar__link">
          Food Order
        </Link>
      </div>

      <div className="navbar__link-group navbar__link-group--right">
        {authUser ? <AuthLinks /> : <NonAuthLinks />}
      </div>
    </div>
  </nav>
);

const AuthLinks = () => (
  <React.Fragment>
    <span className="navbar__link" onClick={console.log('Logout')}>
      Logout
    </span>
  </React.Fragment>
);

const NonAuthLinks = () => (
  <React.Fragment>
    <Link to="/signup" className="navbar__link">
      Sign Up
    </Link>
    <Link to="/signin" className="navbar__link">
      Sign In
    </Link>
  </React.Fragment>
);

const mapStateToProps = state => ({ authUser: state.auth });

export default connect(mapStateToProps)(Navbar);
