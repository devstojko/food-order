import React from 'react';
import AuthPageWrapper from '../AuthPageWrapper';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPasswordPage = () => (
  <AuthPageWrapper
    image="https://images.pexels.com/photos/339119/pexels-photo-339119.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    imagePosition="right">
    <h1 className="title-primary">food-order</h1>
    <p className="subtitle">
      Enter your email and we send you a password reset link
    </p>
    <ForgotPasswordForm />
  </AuthPageWrapper>
);

export default ForgotPasswordPage;
