import React from 'react';

const Button = ({ type, text, className = null }) => (
  <button className={`btn btn--${type} ` + (className ? `${className}` : '' )}>
    {text}
  </button>
);

export default Button;