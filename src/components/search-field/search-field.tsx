import * as React from 'react';
import { useRef } from 'react';
import * as ReactDOM from 'react-dom';
import './search-field.scss';
import SearchIcon from './search-icon.svg';

type SearchIcon = {
  onClick?: Event;
};
const SearchField = React.forwardRef<
  HTMLInputElement,
  { onSubmit: React.FormEventHandler; setQuery: React.Dispatch<React.SetStateAction<string>> }
>((props, ref) => {
  return (
    <div className="search-field__input-container">
      <input
        onChange={(e) => {
          props.setQuery(e.target.value);
          console.log(e.target.value);
        }}
        ref={ref}
        name="search-query"
        className="search-field__input"
        type="text"
      />
      <span className="search-field__search-icon" onClick={props.onSubmit}>
        <SearchIcon></SearchIcon>
      </span>
    </div>
  );
});
export default SearchField;
