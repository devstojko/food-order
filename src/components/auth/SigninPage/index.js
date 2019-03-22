import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import AuthPageLayout from '@layout/AuthPageLayout';
import SigninForm from './SigninForm';

const SigninPage = () => (
  <AuthPageLayout
    image="https://images.pexels.com/photos/1108234/pexels-photo-1108234.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
    imagePosition="left">
    <h1 className="title-primary">food-order</h1>
    <p className="subtitle">
      <FormattedMessage id="welcomeBack" />
    </p>
    <SigninForm />
    <Link className="link" to="/signup">
      <FormattedMessage id="notRegistered" />
    </Link>
  </AuthPageLayout>
);

export default SigninPage;
