import { AnyAction, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { Book } from './components/search-result/search-result';

export type BookReducer =
  | Reducer<{
      books: {
        books: Book[];
      };
    }>
  | ReducersMapObject<
      {
        books: {
          books: Book[];
        };
      },
      AnyAction
    >;
export type FindBooksProps = {
  query: string | null;
  category: string | null;
  queryIndex: number | null;
};
