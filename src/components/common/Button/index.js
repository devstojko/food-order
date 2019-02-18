import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ text, type, onClick, style = 'primary' }) => (
  <button
    onClick={onClick ? onClick : null}
    type={type}
    className={`btn btn--${style}`}>
    {text}
  </button>
);

Button.propTypes = {
  style: PropTypes.oneOf(['primary', 'secondary']),
  text: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
