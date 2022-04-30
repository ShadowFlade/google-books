import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { FindBooksProps } from '../../App';
import Header from '../header/header';
import { Book, BookInfo } from '../search-result/search-result';

export interface ILayoutProps {
  queryIndex: number;
  results: Book[];
  findBooks: (props: FindBooksProps) => Promise<Book[]>;
  setResults: React.Dispatch<React.SetStateAction<Book[] | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export default function Layout({
  findBooks,
  results,
  setResults,
  setIsLoading,
  queryIndex,
}: ILayoutProps) {
  return (
    <div className="page">
      <Header
        findBooks={findBooks}
        results={results}
        setResults={setResults}
        setIsLoading={setIsLoading}
        queryIndex={queryIndex}
      ></Header>
      <Outlet />
    </div>
  );
}
