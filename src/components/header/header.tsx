import { useRef, useState } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios, { AxiosResponse } from 'axios';
import '../search-field/search-field.scss';
import SearchField from '../search-field/search-field';
import './header.scss';

interface SubmitForm extends HTMLFormElement {
  searchQuery: HTMLInputElement;
}
const Header = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const rootURI = 'https://www.googleapis.com/books/v1/volumes';
  const APIKey = process.env.API_KEY;
  const onSubmit: React.FormEventHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    let params;
    if (ref.current) {
      params = `q=${ref.current.value}${
        categoryRef.current && categoryRef.current.value !== 'all'
          ? `&insubject:${categoryRef.current.value}`
          : ''
      }&orderBy=newest&key=${APIKey}`;
      console.log('🚀 ~ file: header.tsx ~ line 30 ~ Header ~ res', params);
    }
    await axios
      .get(`${rootURI}?${params}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <header className="header">
      <form name="search" className="header__content" onSubmit={onSubmit}>
        <h1 className="header__title">Search for books</h1>
        <div className="header__search">
          <SearchField ref={ref}></SearchField>
        </div>
        <div className="header__options">
          <div className="header__option">
            <span className="header__option-name">Categories</span>
            <select
              ref={categoryRef}
              className="header__option-value"
              name="categories"
              id="categories"
            >
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
            <span className="header__option-name">Sorting by</span>
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
      </form>
    </header>
  );
};
export default Header;
