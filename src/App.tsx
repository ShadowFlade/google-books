import * as React from 'react';
import { Component, useRef, useState } from 'react';
import Header from './components/header/header';
import SearchResult, { Book } from './components/search-result/search-result';
import Loading from './components/Loading/Loading';
import './App.scss';
import '../nullstyle.css';
import axios from 'axios';
type FindBooksProps = { query: string; category: string; queryIndex: number };
const App = () => {
  const [results, setResults] = useState([]);
  const [pickerBook, setPickedBook] = useState('book');
  const [isLoading, setIsLoading] = useState(false);
  const APIKey = process.env.API_KEY;
  const rootURI = 'https://www.googleapis.com/books/v1/volumes';
  const [queryIndex, setQueryIndex] = useState(0);

  const findBooks = async ({ query, category, queryIndex }: FindBooksProps): Promise<Book[]> => {
    const params = `q=${query}${
      category && category !== 'all' ? `&insubject:${category}` : ``
    }&key=${APIKey}&maxResults=30&startIndex=${queryIndex}`;

    let results: Book[] = await axios.get(`${rootURI}?${params}`).then(({ data }) => {
      setIsLoading(false);
      return data.items;
    });
    setQueryIndex((prev) => prev + 30);
    localStorage.setItem('query', query);
    localStorage.setItem('category', category);
    return results;
  };
  return (
    <div className="page">
      <Header
        findBooks={findBooks}
        results={results}
        setResults={setResults}
        setIsLoading={setIsLoading}
        queryIndex={queryIndex}
      ></Header>
      {results && results.length !== 0 ? (
        <SearchResult
          queryIndex={queryIndex}
          results={results}
          loadMore={findBooks}
          setResults={setResults}
        ></SearchResult>
      ) : isLoading ? (
        <Loading></Loading>
      ) : (
        ''
      )}
    </div>
  );
};

export default App;
export { FindBooksProps };
