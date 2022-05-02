import * as React from 'react';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addBooks, sortBooksByRelevance, sortBooksByDate } from '../../redux/reducer';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import SearchField from '../search-field/search-field';
import { BookInfo, Book } from '../search-result/search-result';
import { FindBooksProps } from '../../App';
import { RootState } from '../../redux/index';
import '../search-field/search-field.scss';
import './header.scss';

interface SubmitForm extends HTMLFormElement {
  searchQuery: HTMLInputElement;
}
const Header = ({
  findBooks,
  setIsLoading,
  queryIndex,
}: {
  findBooks: (props: FindBooksProps) => Promise<BookInfo[]>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  queryIndex: number;
}) => {
  const results = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const location = useLocation();
  const URI = location.pathname;
  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const sortRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);

  const toggleSort = (value: string) => {
    if (results && sortRef.current) {
      if (value === 'relevance') {
        dispatch(sortBooksByRelevance(query)); //TODO convert to reducer addBooks
      } else {
        dispatch(sortBooksByDate({})); //TODO convert to reducer addBooks
      }
    }
  };
  const onSubmit: React.FormEventHandler = async (e: React.FormEvent) => {
    query.length > 1 && URI !== '/' ? navigate('/') : false;
    setIsLoading(true);
    e.preventDefault();
    let newResults = await findBooks({
      category: categoryRef.current ? categoryRef.current.value : '',
      query: inputFieldRef.current ? inputFieldRef.current.value : '',
      queryIndex,
    });
    dispatch(addBooks(newResults));
    if (sortRef.current) {
      sortRef.current.value === 'relevance'
        ? dispatch(sortBooksByRelevance(query))
        : dispatch(sortBooksByDate({}));
    }
  };
  return (
    <header className="header">
      <form name="search" className="header__content" onSubmit={onSubmit}>
        <h1 className="header__title">Search for books</h1>
        <div className="header__search">
          <SearchField onSubmit={onSubmit} setQuery={setQuery} ref={inputFieldRef}></SearchField>
        </div>
        <div className="header__options">
          <div className="header__option">
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
            <span className="header__option-name">Categories</span>
          </div>
          <div className="header__option">
            <select
              ref={sortRef}
              onChange={(e) => toggleSort(e.target.value)}
              className="header__option-value"
              name="sort"
              id="sort"
            >
              <option value="relevance" className="header__sort">
                relevance
              </option>
              <option value="date" className="header__sort">
                newest
              </option>
            </select>
            <span className="header__option-name">Sorting by</span>
          </div>
        </div>
      </form>
    </header>
  );
};
export default Header;
