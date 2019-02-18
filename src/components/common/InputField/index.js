import React from 'react';
import PropTypes from 'prop-types';
import './inputField.scss';

const InputField = ({
  type = 'text',
  name,
  label,
  error,
  value,
  onChange,
  required = true,
  inline = false
}) => (
  <div className={'field ' + (inline ? 'field--inline' : '')}>
    <input
      className="field__text"
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
    />
    <span className="field__highlight" />
    <span className="field__bar" />
    <label className="field__label" htmlFor={name}>
      {label}
    </label>
    <span className="field__error">{error}</span>
  </div>
);

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  inline: PropTypes.bool
};

export default InputField;
