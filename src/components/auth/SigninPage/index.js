import React from 'react';
import AuthPageWrapper from '../AuthPageWrapper';
import SigninForm from './SigninForm';

const SigninPage = () => (
  <AuthPageWrapper
    image="https://images.pexels.com/photos/1108234/pexels-photo-1108234.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    imagePosition="left">
    <h1 className="title-primary">food-order</h1>
    <p className="subtitle">Welcome back! Please login to your account.</p>
    <SigninForm />
  </AuthPageWrapper>
);

export default SigninPage;
