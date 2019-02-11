import React, { Fragment } from 'react';
import AuthPageFooter from './AuthPageFooter';
import PropTypes from 'prop-types';
import './AuthPageWrapper.scss';

const AuthPageWrapper = ({ image, imagePosition, children }) => (
  <div className="auth-page">
    {imagePosition === 'left' ? (
      <Fragment>
        <div className="auth-page__image testing-css-access">
          CHANGE LATER{image}
        </div>
        <div className="auth-page__content">
          {children}
          <AuthPageFooter />
        </div>
      </Fragment>
    ) : (
      <Fragment>
        <div className="auth-page__content">
          {children}
          <AuthPageFooter />
        </div>
        <div className="auth-page__image">CHANGE LATER{image}</div>
      </Fragment>
    )}
  </div>
);

AuthPageWrapper.propTypes = {
  image: PropTypes.string,
  imagePosition: PropTypes.oneOf(['left', 'right'])
};

export default AuthPageWrapper;
