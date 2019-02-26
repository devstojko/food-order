import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

const Search = ({ placeholder }) => (
  <div className="search">
    <i className="fas fa-search" />
    <input type="text" placeholder={placeholder ? placeholder : 'Search'} />
  </div>
);

Search.propTypes = {
  placeholder: PropTypes.string
};

export default Search;
