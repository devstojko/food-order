import React from 'react';
import { Link } from 'react-router-dom';
import AuthPageLayout from '../../layout/AuthPageLayout';
import SignupForm from './SignupForm';

const SignupPage = () => (
  <AuthPageLayout
    image="https://www.actaturcica.com/wp-content/uploads/2018/07/Red-Mountains-Landscape-Wallpaper.jpg"
    imagePosition="left">
    <h1 className="title-primary">food-order</h1>
    <p className="subtitle">Please complete to create your account.</p>
    <SignupForm />
    <Link className="link" to="/signin">
      Already have an account? Sign in.
    </Link>
  </AuthPageLayout>
);

export default SignupPage;
