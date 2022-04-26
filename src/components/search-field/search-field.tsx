import * as React from 'react';
import { useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './search-field.scss';
import SearchIcon from './search-icon.svg';
// type SearchFieldParams ={
//   setSearchQuery:Function
// }
const SearchField = React.forwardRef<HTMLInputElement, {}>((props, ref) => {
  return (
    <div className="search-field__input-container">
      <input ref={ref} name="search-query" className="search-field__input" type="text" />
      <span className="search-field__arrow-icon">
        <SearchIcon></SearchIcon>
      </span>
    </div>
  );
});
export default SearchField;
