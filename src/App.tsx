import * as React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchResult, { Book, BookInfo } from './components/search-result/search-result';
import Loading from './components/Loading/Loading';
import axios from 'axios';
import DetailedPage from './components/detailed-page/detailed-page';
import Layout from './components/layout/layout';
import NoBooksYet from './components/no-books-yet/no-books-yet';
import { Provider, useSelector } from 'react-redux';
import { RootState, store } from './redux';
import './App.scss';
import '../nullstyle.css';
import { FindBooksProps } from './app';
import { setCustomAction } from './components/detailed-page/detailed';
const App = () => {
  const results = useSelector((state: RootState) => state.books.books.map((item) => item));

  const [pickedBook, setPickedBook]: [undefined | BookInfo, setCustomAction<BookInfo>] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const APIKey = process.env.API_KEY;
  const rootURI = 'https://www.googleapis.com/books/v1/volumes';
  const [queryIndex, setQueryIndex] = useState(0);

  const findBooks = async (
    { query, category, queryIndex }: FindBooksProps = {
      query: localStorage.getItem('query'),
      category: localStorage.getItem('category'),
      queryIndex: 0,
    }
  ): Promise<BookInfo[]> => {
    const params = `q=${query}${
      category && category !== 'all' ? `&insubject:${category}` : ``
    }&key=${APIKey}&maxResults=30&startIndex=${queryIndex}`;

    let results: Book[] = await axios.get(`${rootURI}?${params}`).then(({ data }) => {
      setIsLoading(false);
      return data.items;
    });
    setQueryIndex((prev) => prev + 30);
    query ? localStorage.setItem('query', query) : false;
    queryIndex ? localStorage.setItem('queryIndex', String(queryIndex)) : false;
    category ? localStorage.setItem('category', category) : false;
    return results.map((item) => {
      item.volumeInfo.id = item.id;
      return item.volumeInfo;
    });
  };
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <Layout findBooks={findBooks} queryIndex={queryIndex} setIsLoading={setIsLoading} />
        }
      >
        <Route
          index
          element={
            results && results.length !== 0 ? (
              <SearchResult
                queryIndex={queryIndex}
                loadMore={findBooks}
                setPickedBook={setPickedBook}
              ></SearchResult>
            ) : isLoading ? (
              <Loading></Loading>
            ) : (
              <NoBooksYet />
            )
          }
        ></Route>
        <Route
          path={`detailed/:id`}
          element={pickedBook ? <DetailedPage /> : <DetailedPage findBooks={findBooks} />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;
export { FindBooksProps };
