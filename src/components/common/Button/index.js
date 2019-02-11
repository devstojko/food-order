import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ text, type = 'primary' }) => (
  <button className={`btn btn--${type}`}>{text}</button>
);

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary']),
  text: PropTypes.string
};

export default Button;
