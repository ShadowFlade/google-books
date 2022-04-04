import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './header.scss';
import '../search-field/search-field.scss';
import SearchField from '../search-field/search-field';
const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__content">
          <h1 className="header__title">Search for books</h1>
          <div className="header__search">
            <SearchField></SearchField>
          </div>
          <div className="header__options">
            <div className="header__option">
              <span></span>
            </div>
            <div className="header__option">
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
