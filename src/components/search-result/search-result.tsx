import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import BookItem from '../book-item/book-item';
import bookCover from '../book-item/book-cover.jpg';
import './search-result.scss';
type Book = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: BookInfo;
};
type BookInfo = {
  categories: string[];
  title: string;
  authors: string[];
  imageLinks: { smallThumbnail: string; thumbNail: string };
  description: string;
  publishedDate: string;
};
const SearchResult = ({ results }: { results: Book[] }) => {
  const numberOfResults = results.length;
  return (
    <div className="search-result">
      <div className="search-result__inner">
        <h2 className="search-result__title">
          Found {numberOfResults} {numberOfResults > 1 ? 'results' : 'result'}
        </h2>
        <div className="search-result__content">
          {results.map((item: Book) => {
            const book: BookInfo = item.volumeInfo;
            console.log(book);

            return (
              <div className="search-result__item" key={nanoid()}>
                <BookItem
                  category={book.categories ? book.categories[0] : ''}
                  title={book.title}
                  author={book.authors ? book.authors[0] : ''}
                  picSrc={book.imageLinks.smallThumbnail}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
export { BookInfo, Book };
