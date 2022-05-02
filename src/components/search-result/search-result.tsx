import * as React from 'react';
import { nanoid } from 'nanoid';
import BookItem from '../book-item/book-item';
import { Book, BookInfo, SearchResultProps } from './search-results';
import { RootState } from '../../redux/index';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { addBook } from '../../redux/reducer';
import './search-result.scss';

const SearchResult = ({ queryIndex, setPickedBook, loadMore }: SearchResultProps) => {
  const results = useSelector((state: RootState) => state.books.books);
  const dispatch = useDispatch();
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
          {results.map((item: BookInfo) => {
            return (
              <div className="search-result__item" onClick={() => onClick(item)} key={nanoid()}>
                <BookItem
                  category={item.categories ? item.categories : ''}
                  title={item.title}
                  authors={item.authors ? item.authors : ''}
                  picSrc={
                    item.imageLinks
                      ? item.imageLinks.thumbNail || item.imageLinks.smallThumbnail
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

              dispatch(addBook(newResults));
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
