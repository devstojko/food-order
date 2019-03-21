import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
    style={inlineStyles}>
    <FormattedMessage id={text} />
  </button>
);

Button.propTypes = {
  style: PropTypes.oneOf(['primary', 'secondary']),
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  onClick: PropTypes.func,
  inlineStyles: PropTypes.object
};

export default Button;
