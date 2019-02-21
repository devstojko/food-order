import React from 'react';
import { Link } from 'react-router-dom';
import AuthPageWrapper from '../AuthPageWrapper';
import SignupForm from './SignupForm';

const SignupPage = () => (
  <AuthPageWrapper
    image="https://www.actaturcica.com/wp-content/uploads/2018/07/Red-Mountains-Landscape-Wallpaper.jpg"
    imagePosition="left">
    <h1 className="title-primary">food-order</h1>
    <p className="subtitle">Please complete to create your account.</p>
    <SignupForm />
    <Link className="link" to="/signin">
      Already have an account? Sign in.
    </Link>
  </AuthPageWrapper>
);

export default SignupPage;
