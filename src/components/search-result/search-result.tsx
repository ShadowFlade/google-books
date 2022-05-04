import * as React from 'react';
import { Book, BookInfo, SearchResultProps } from './search-results';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '../../redux/index';
import BookInfoList from '../book-info-list/book-info-list';
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
          <BookInfoList selectBook={selectBook} results={results} />
        </div>
        <div className="search-result__load-more">
          <button onClick={loadMore} className="search-result__load-button">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
export { BookInfo, Book };
