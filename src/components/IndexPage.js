import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => (
  <div>
    <h1>Index Page Content</h1>
    <Link to="/signup">Sign Up</Link>
    <Link to="/signin">Sign In</Link>
    <Link to="/forgot-password">Forgot Password</Link>
  </div>
);

export default IndexPage;
