import * as React from 'react';
import { FindBooksProps } from '@/app';
import { BookInfo } from '../search-result/search-results';

export interface IDetailedPageProps {
  imageLinks: { thumbnail: string; smallThumbnail: string };
  title: string;
  categories: string[];
  authors: string[];
  description: string;
  results: BookInfo[];
  fetchBooks: (props?: FindBooksProps | undefined) => Promise<BookInfo[]>;
  pickedBook: BookInfo;
}
export type setCustomAction<T> = React.Dispatch<React.SetStateAction<T | undefined>>;
