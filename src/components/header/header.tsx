import { useRef, useState } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios, { AxiosResponse } from 'axios';
import SearchField from '../search-field/search-field';
import { BookInfo, Book } from '../search-result/search-result';
import { FindBooksProps } from '../../App';
import '../search-field/search-field.scss';
import './header.scss';

interface SubmitForm extends HTMLFormElement {
  searchQuery: HTMLInputElement;
}
const Header = ({
  results,
  setResults,
  setIsLoading,
  findBooks,
  queryIndex,
}: {
  results: Book[] | [];
  findBooks: (props: FindBooksProps) => Promise<Book[]>;
  setResults: React.Dispatch<React.SetStateAction<undefined | Book[]>>;
  queryIndex: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState('');
  const relevanceTree: (keyof Partial<BookInfo>)[] = [
    'title',
    'categories',
    'authors',
    'description',
  ];
  const inputFieldRef = useRef<HTMLInputElement | null>(null);
  const sortRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);

  const sortByRelevance = (arr: Book[]) => {
    const sort = (bookInfo: BookInfo): number => {
      let result: number;
      relevanceTree.forEach((relevantItem) => {
        const key = bookInfo[relevantItem];
        if ((Array.isArray(key) || typeof key === 'string') && key.includes(query)) {
          result = relevanceTree.length - relevanceTree.indexOf(relevantItem);
        }
      });
      return result!;
    };
    const intermediate = arr.slice(0);
    return intermediate.sort((a: Book, b: Book) => sort(a.volumeInfo) - sort(b.volumeInfo));
  };
  const sortByDate = (arr: Book[]) => {
    const intermediate = arr.slice(0);
    return intermediate.sort(
      (a: Book, b: Book) =>
        new Date(a.volumeInfo.publishedDate).getTime() -
        new Date(b.volumeInfo.publishedDate).getTime()
    );
  };
  const toggleSort = (value: string) => {
    if (results && sortRef.current) {
      if (value === 'relevance') {
        setResults((prev: Book[]) => sortByDate(prev));
      } else {
        setResults((prev: Book[]) => sortByDate(prev));
      }
    }
  };
  if (inputFieldRef.current) {
  }

  const onSubmit: React.FormEventHandler = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    let newResults = await findBooks({
      category: categoryRef.current ? categoryRef.current.value : '',
      query: inputFieldRef.current ? inputFieldRef.current.value : '',
      queryIndex,
    });
    if (sortRef.current) {
      newResults =
        sortRef.current.value === 'relevance'
          ? sortByRelevance(newResults)
          : sortByDate(newResults);
      setResults((prev) => prev?.concat(newResults));
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
          </div>
        </div>
      </form>
    </header>
  );
};
export default Header;
