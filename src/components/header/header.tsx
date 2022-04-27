import { useRef, useState } from 'react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import axios, { AxiosResponse } from 'axios';
import SearchField from '../search-field/search-field';
import { BookInfo, Book } from '../search-result/search-result';
import '../search-field/search-field.scss';
import './header.scss';

interface SubmitForm extends HTMLFormElement {
  searchQuery: HTMLInputElement;
}
const Header = ({
  results,
  setResults,
  setIsLoading,
}: {
  results: Book[] | undefined;
  setResults: React.Dispatch<React.SetStateAction<undefined | Book[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [query, setQuery] = useState('');
  const relevanceTree: (keyof Partial<BookInfo>)[] = [
    'title',
    'categories',
    'authors',
    'description',
  ];
  const sortByRelevance = (arr: Book[]) => {
    const sort = (bookInfo: BookInfo): number => {
      let result: number;
      relevanceTree.forEach((relevantItem) => {
        const key = bookInfo[relevantItem];
        console.log(key, query);
        if ((Array.isArray(key) || typeof key === 'string') && key.includes(query)) {
          console.log('includes');
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
    // console.log('START', results);

    if (results && sortRef.current) {
      if (value === 'relevance') {
        setResults((prev: Book[]) => sortByDate(prev));
      } else {
        setResults((prev: Book[]) => sortByDate(prev));
      }
    }
    // console.log('END', results);
  };
  const ref = useRef<HTMLInputElement | null>(null);
  const sortRef = useRef<HTMLSelectElement | null>(null);
  const categoryRef = useRef<HTMLSelectElement | null>(null);
  const rootURI = 'https://www.googleapis.com/books/v1/volumes';
  const APIKey = process.env.API_KEY;
  const onSubmit: React.FormEventHandler = async (e: React.FormEvent) => {
    setIsLoading(true);

    e.preventDefault();
    let params;
    let query: string;
    if (ref.current) {
      query = ref.current.value;
      params = `q=${query}${
        categoryRef.current && categoryRef.current.value !== 'all'
          ? `&insubject:${categoryRef.current.value}&maxResults=30`
          : '&maxResults=30'
      }&key=${APIKey}`;
    }
    let results = await axios.get(`${rootURI}?${params}`).then(({ data }) => {
      setIsLoading(false);
      return data.items;
    });
    console.log('🚀 ~ file: header.tsx ~ line 83 ~ results ~ results', results);

    if (sortRef.current) {
      results =
        sortRef.current.value === 'relevance' ? sortByRelevance(results) : sortByDate(results);
      setResults(results);
    }
  };
  return (
    <header className="header">
      <form name="search" className="header__content" onSubmit={onSubmit}>
        <h1 className="header__title">Search for books</h1>
        <div className="header__search">
          <SearchField onSubmit={onSubmit} setQuery={setQuery} ref={ref}></SearchField>
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
