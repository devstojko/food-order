import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  text,
  onClick,
  style = 'primary',
  type = 'button',
  disabled = false
}) => (
  <button
    onClick={onClick ? onClick : null}
    type={type}
    disabled={disabled}
    className={`btn btn--${style}`}>
    {text}
  </button>
);

Button.propTypes = {
  style: PropTypes.oneOf(['primary', 'secondary']),
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Button;
