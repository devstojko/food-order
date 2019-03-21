import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AuthPageImage from './AuthPageImage';
import AuthPageFooter from './AuthPageFooter';
import './AuthPageWrapper.scss';
import Language from '@common/Language';

const AuthPageWrapper = ({ image, imagePosition, children }) => (
  <div className="auth-page">
    <div className="auth-page__language-picker">
      <Language />
    </div>
    {imagePosition === 'left' ? (
      <Fragment>
        <AuthPageImage src={image} />
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
        <AuthPageImage src={image} />
      </Fragment>
    )}
  </div>
);

AuthPageWrapper.propTypes = {
  image: PropTypes.string,
  imagePosition: PropTypes.oneOf(['left', 'right']),
  children: PropTypes.node.isRequired
};

export default AuthPageWrapper;
