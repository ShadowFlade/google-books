import { FindBooksProps } from '@/app';
import * as React from 'react';
import { Book, BookInfo } from '../search-result/search-results';

export interface IDetailedPageProps {
  imageLinks: { thumbNail: string; smallThumbnail: string };
  title: string;
  categories: string[];
  authors: string[];
  description: string;
  results: BookInfo[];
  findBooks: (props?: FindBooksProps | undefined) => Promise<BookInfo[]>;
  setResults: React.Dispatch<React.SetStateAction<Book[] | undefined>>;
}
export type setCustomAction<T> = React.Dispatch<React.SetStateAction<T | undefined>>;
