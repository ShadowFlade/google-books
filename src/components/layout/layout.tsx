import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { FindBooksProps } from '../../App';
import Header from '../header/header';
import { Book, BookInfo } from '../search-result/search-result';

export interface ILayoutProps {
  queryIndex: number;
  findBooks: (props: FindBooksProps) => Promise<BookInfo[]>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export default function Layout({ findBooks, setIsLoading, queryIndex }: ILayoutProps) {
  return (
    <div className="page">
      <Header findBooks={findBooks} setIsLoading={setIsLoading} queryIndex={queryIndex}></Header>
      <Outlet />
    </div>
  );
}
