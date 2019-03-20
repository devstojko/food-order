import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  text,
  onClick,
  style = 'primary',
  type = 'button',
  disabled = false,
  inlineStyles
}) => (
  <button
    onClick={onClick ? onClick : null}
    type={type}
    disabled={disabled}
    className={`btn btn--${style}`}
    style={inlineStyles}
  >
    {text}
  </button>
);

Button.propTypes = {
  style: PropTypes.oneOf(['primary', 'secondary']),
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  inlineStyles: PropTypes.object.isRequired
};

export default Button;
