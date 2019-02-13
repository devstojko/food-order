import React from 'react';
import AuthPageWrapper from '../AuthPageWrapper';
import SignupForm from './SignupForm';

const SignupPage = () => (
  <AuthPageWrapper
    image="https://www.actaturcica.com/wp-content/uploads/2018/07/Red-Mountains-Landscape-Wallpaper.jpg"
    imagePosition="left">
    <h1 className="title-primary">food-order</h1>
    <p className="subtitle">Please complete to create your account.</p>
    <SignupForm />
  </AuthPageWrapper>
);

export default SignupPage;
