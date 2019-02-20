import React from 'react';
import PropTypes from 'prop-types';
import './InputField.scss';

const InputField = ({
  input,
  type,
  meta,
  label,
  required = true,
  inline = false
}) => {
  const { touched, error } = meta;

  return (
    <div className={'field ' + (inline ? 'field--inline' : '')}>
      <input
        {...input}
        className="field__text"
        type={type}
        required={required}
      />
      <span className="field__highlight" />
      <span className="field__bar" />
      <label className="field__label" htmlFor={input.name}>
        {label}
      </label>
      {touched && error && <span className="field__error">{error}</span>}
    </div>
  );
};

InputField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  inline: PropTypes.bool
};

export default InputField;
