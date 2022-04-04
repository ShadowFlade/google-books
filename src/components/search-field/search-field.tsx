import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './search-field';
import SearchIcon from './search-icon.svg';

const SearchField = () => {
  return (
    <div className="search-field__input-container">
      <input className="search-field__input" type="text" />
      <span className="search-field__arrow-icon">
        <SearchIcon></SearchIcon>
      </span>
    </div>
  );
};
export default SearchField;
