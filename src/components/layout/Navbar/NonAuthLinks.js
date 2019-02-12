import React from 'react';
import { Link } from 'react-router-dom';

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

export default NonAuthLinks;
