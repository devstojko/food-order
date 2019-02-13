import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthLinks from './AuthLinks';
import NonAuthLinks from './NonAuthLinks';
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

const mapStateToProps = ({ authUser }) => ({ authUser });

export default connect(mapStateToProps)(Navbar);
