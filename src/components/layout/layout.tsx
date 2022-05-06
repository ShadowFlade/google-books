import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { FindBooksProps } from '../../App';
import Header from '../header/header';
import { BookInfo } from '../search-result/search-result';

export interface ILayoutProps {
  queryIndex: number;
  fetchBooks: (props: FindBooksProps) => Promise<BookInfo[]>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export default function Layout({ fetchBooks, setIsLoading, queryIndex }: ILayoutProps) {
  return (
    <div className="page">
      <Header fetchBooks={fetchBooks} setIsLoading={setIsLoading} queryIndex={queryIndex}></Header>
      <Outlet />
    </div>
  );
}
