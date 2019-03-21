import React from 'react';
import { FormattedMessage } from 'react-intl';

const AuthPageFooter = () => (
  <span className="auth-page__terms text-primary">
    <FormattedMessage
      id="terms"
      defaultMessage="Terms of use. Privacy policy"
    />
  </span>
);

export default AuthPageFooter;
