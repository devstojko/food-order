import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ text, className = '' }) => (
  <button className={`btn  ${className}`}>{text}</button>
);

Button.propTypes = {
  type: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string
};

export default Button;
