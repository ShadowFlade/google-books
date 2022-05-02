import * as React from 'react';
import { setCustomAction } from '../detailed-page/detailed';
import SearchIcon from './search-icon.svg';
import './search-field.scss';

type SearchIcon = {
  onClick?: Event;
};
const SearchField = React.forwardRef<
  HTMLInputElement,
  { onSubmit: React.FormEventHandler; setQuery: setCustomAction<string> }
>((props, ref) => {
  return (
    <div className="search-field__input-container">
      <input
        onChange={(e) => {
          props.setQuery(e.target.value);
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
