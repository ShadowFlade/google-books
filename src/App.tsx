import * as React from 'react';
import { Component, useRef, useState } from 'react';
import {
  Router,
  Routes,
  Route,
  useHref,
  useLocation,
  useParams,
  useNavigate,
} from 'react-router-dom';
import Header from './components/header/header';
import SearchResult, { Book, BookInfo } from './components/search-result/search-result';
import Loading from './components/Loading/Loading';
import './App.scss';
import '../nullstyle.css';
import axios from 'axios';
import DetailedPage from './components/detailed-page/detailed-page';
type FindBooksProps = { query: string; category: string; queryIndex: number };
const App = () => {
  const bookTitle = useLocation().pathname.match(/detailed\/(\w+)/g);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const getBookByURI = (URI: string, bookList: BookInfo[]) => {
    let result = {};
    bookList.forEach((item) => {
      const formattedTitle = item.title.replace(/\s/g, '');
      if (formattedTitle === URI) {
        result = item;
      }
    });
    return result;
  };

  const [pickedBook, setPickedBook]: [
    undefined | BookInfo,
    React.Dispatch<React.SetStateAction<BookInfo | undefined>>
  ] = useState();
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
    localStorage.setItem('queryIndex', String(queryIndex));
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
      {/* {bookTitle ? <DetailedPage {...getBookByURI(bookTitle[1], results)} /> : ''} */}
      <Routes>
        <Route
          path={'/'}
          element={
            results && results.length !== 0 ? (
              <SearchResult
                queryIndex={queryIndex}
                results={results}
                loadMore={findBooks}
                setResults={setResults}
                setPickedBook={setPickedBook}
              ></SearchResult>
            ) : isLoading ? (
              <Loading></Loading>
            ) : (
              ''
            )
          }
        ></Route>

        <Route
          path={`/detailed/${pickedBook ? pickedBook.title.replace(/\s/g, '') : 'false'}`}
          element={pickedBook ? <DetailedPage {...pickedBook} /> : ''}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
export { FindBooksProps };
