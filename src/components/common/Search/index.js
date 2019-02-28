import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

const Search = ({ value, handleChange, placeholder }) => (
  <div className="search">
    <i className="fas fa-search" />
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder ? placeholder : 'Search'}
    />
  </div>
);

Search.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  placeholder: PropTypes.string
};

export default Search;
