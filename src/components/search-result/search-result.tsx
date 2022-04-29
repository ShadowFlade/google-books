import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import BookItem from '../book-item/book-item';
import bookCover from '../book-item/book-cover.jpg';
import './search-result.scss';
import { FindBooksProps } from '../../App';
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
type SearchResultProps = {
  results: Book[];
  queryIndex: number;
  loadMore: (props: FindBooksProps) => Promise<Book[]>;
  setResults: React.Dispatch<React.SetStateAction<Book[] | []>>;
  setPickedBook: React.Dispatch<React.SetStateAction<BookInfo | undefined>>;
};
const SearchResult = ({
  results,
  queryIndex,
  setResults,
  setPickedBook,
  loadMore,
}: SearchResultProps) => {
  const numberOfResults = results.length;
  const onClick = (book: BookInfo) => {
    setPickedBook(book);
  };
  return (
    <div className="search-result">
      <div className="search-result__inner">
        <h2 className="search-result__title">
          Found {numberOfResults} {numberOfResults > 1 ? 'results' : 'result'}
        </h2>
        <div className="search-result__content">
          {results.map((item: Book) => {
            const book: BookInfo = item.volumeInfo;
            return (
              <div className="search-result__item" onClick={() => onClick(book)} key={nanoid()}>
                <BookItem
                  category={book.categories ? book.categories : ''}
                  title={book.title}
                  authors={book.authors ? book.authors : ''}
                  picSrc={
                    book.imageLinks
                      ? book.imageLinks.thumbNail || book.imageLinks.smallThumbnail
                      : ''
                  }
                />
              </div>
            );
          })}
        </div>
        <div className="search-result__load-more">
          <button
            onClick={async () => {
              const newResults = await loadMore({
                category: localStorage.getItem('category')!,
                query: localStorage.getItem('query')!,
                queryIndex,
              });

              setResults((prev) => [...prev, ...newResults]);
            }}
            className="search-result__load-button"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
export { BookInfo, Book };
