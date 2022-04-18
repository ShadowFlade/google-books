import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './header.scss';
import '../search-field/search-field.scss';
import SearchField from '../search-field/search-field';

const Header = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__title">Search for books</h1>
        <div className="header__search">
          <SearchField></SearchField>
        </div>
        <div className="header__options">
          <div className="header__option">
            <span className="header__option-name">Categories</span>
            <select className="header__option-value" name="categories" id="categories">
              <option className="header__item" value="all">
                all
              </option>
              <option className="header__item" value="history">
                history
              </option>
              <option className="header__item" value="fiction">
                fiction
              </option>
              <option className="header__item" value="non-fiction">
                non-fiction
              </option>
              <option className="header__item" value="science literature">
                science literature
              </option>
            </select>
          </div>
          <div className="header__option">
            <span className="header__option-name">Sotring by</span>
            <select className="header__option-value" name="sort" id="sort">
              <option value="relevance" className="header__sort">
                relevance
              </option>
              <option value="date" className="header__sort">
                date
              </option>
              <option value="author" className="header__sort">
                author
              </option>
              <option value="publisher" className="header__sort">
                publisher
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
