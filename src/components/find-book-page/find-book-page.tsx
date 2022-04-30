import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Book, BookInfo } from '../search-result/search-result';

export interface IFindBookPageProps {
  results: BookInfo[];
}

export default function FindBookPage(props: IFindBookPageProps) {
  console.log('hmmm');
  const bookTitle = useLocation().pathname.match(/detailed\/(\w+)/g);
  const navigate = useNavigate();
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
  return <div>{getBookByURI(bookTitle ? bookTitle[1] : '', props.results)}</div>;
}
