import * as React from 'react';
import { nanoid } from 'nanoid';
import { Book, BookInfo, SearchResultProps } from './search-results';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { RootState } from '../../redux/index';
import BookItem from '../book-item/book-item';
import './search-result.scss';

const SearchResult = ({ setPickedBook, loadMore }: SearchResultProps) => {
  const results = useSelector((state: RootState) => state.books.books);
  const numberOfResults = results.length;
  const selectBook = (book: BookInfo) => {
    localStorage.setItem('selectedBookCategories', book.categories.join(', '));
    localStorage.setItem('selectedBookAuthors', book.authors.join(', '));
    localStorage.setItem('selectedBookTitle', book.title);
    localStorage.setItem('selectedBookSmallThumbnail', book.imageLinks.smallThumbnail);
    localStorage.setItem('selectedBookThumbnail', book.imageLinks.thumbnail);
    localStorage.setItem('selectedBookDescription', book.description);
    setPickedBook(book);
  };
  return (
    <div className="search-result">
      <div className="search-result__inner">
        <h2 className="search-result__title">
          Found {numberOfResults} {numberOfResults > 1 ? 'results' : 'result'}
        </h2>
        <div className="search-result__content">
          {results.map((item: BookInfo) => {
            console.log(item);
            return (
              <div className="search-result__item" onClick={() => selectBook(item)} key={nanoid()}>
                <BookItem
                  category={item.categories ? item.categories : ''}
                  title={item.title}
                  authors={item.authors ? item.authors : ''}
                  picSrc={
                    item.imageLinks
                      ? item.imageLinks.thumbnail || item.imageLinks.smallThumbnail
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
              loadMore();
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
