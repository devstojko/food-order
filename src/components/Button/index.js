import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ type, text, className = '' }) => (
  <button className={`btn btn--${type} ${className}`}>
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string
};

export default Button;