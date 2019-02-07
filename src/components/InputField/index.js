import React from 'react';
import './inputField.scss';

const InputField = ({ type, name, label, error, value, onChange, required = true }) => (
  <div className="field">
    <input
      className="field__text"
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
    />
    <span className="field__highlight"></span>
    <span className="field__bar"></span>
    <label className="field__label" htmlFor={name}>
      {label}
    </label>
    <span className="field__error">{error}</span>
  </div>
);

export default InputField;