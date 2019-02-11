import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../../../firebase/AuthUserContext';

const Navbar = () => (
  <AuthUserContext>
    {authUser => (
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
    )}
  </AuthUserContext>
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
    <Link to="/signup">Sign Up</Link>
    <Link to="/signin">Sign In</Link>
  </React.Fragment>
);
