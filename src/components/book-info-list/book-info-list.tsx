import * as React from 'react';
import { nanoid } from 'nanoid';
import { BookInfo } from '../search-result/search-results';
import BookItem from '../book-item/book-item';

export interface IBookInfoListProps {
  results: BookInfo[];
  selectBook: (book: BookInfo) => void;
}

export default function BookInfoList({ results, selectBook }: IBookInfoListProps) {
  return (
    <>
      {results.map((item: BookInfo) => {
        return (
          <div className="search-result__item" onClick={() => selectBook(item)} key={nanoid()}>
            <BookItem
              category={item.categories ? item.categories : ''}
              title={item.title}
              authors={item.authors ? item.authors : ''}
              picSrc={
                item.imageLinks ? item.imageLinks.thumbnail || item.imageLinks.smallThumbnail : ''
              }
            />
          </div>
        );
      })}
    </>
  );
}
