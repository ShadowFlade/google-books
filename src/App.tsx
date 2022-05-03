import * as React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SearchResult, { Book, BookInfo } from './components/search-result/search-result';
import Loading from './components/Loading/Loading';
import DetailedPage from './components/detailed-page/detailed-page';
import Layout from './components/layout/layout';
import NoBooksYet from './components/no-books-yet/no-books-yet';
import { RootState } from './redux';
import { FindBooksProps } from './app';
import { setCustomAction } from './components/detailed-page/detailed';
import { addBooks } from './redux/reducer';
import './App.scss';
import '../nullstyle.css';
const App = () => {
  const results = useSelector((state: RootState) => {
    return state.books.books.map((item) => item);
  });
  const dispatch = useDispatch();
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
  const loadMore = async () => {
    const loadedBooks = addBooks(
      await findBooks({
        category: localStorage.getItem('category'),
        queryIndex: Number(localStorage.getItem('queryIndex')),
        query: localStorage.getItem('query'),
      })
    );
    dispatch(loadedBooks);
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
                loadMore={loadMore}
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
          element={pickedBook ? <DetailedPage pickedBook={pickedBook} /> : <DetailedPage />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default App;
export { FindBooksProps };
