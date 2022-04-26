import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BookItem from '../book-item/book-item';
import bookCover from '../book-item/book-cover.jpg';
import './search-result.scss';
type BookInfo = {
  categories: string[];
  title: string;
  authors: string[];
};
const SearchResult = ({ results }: { results: BookInfo[] }) => {
  //TODO insert Loading instead of null
  const numberOfResults = results.length;
  return (
    <div className="search-result">
      <div className="search-result__inner">
        <h2 className="search-result__title">
          Found {numberOfResults} {numberOfResults > 1 ? 'results' : 'result'}
        </h2>
        <div className="search-result__content">
          <div className="search-result__item">
            {results.map((item) => {
              return (
                <div className="search-result__item">
                  <BookItem
                    category={item.categories[0]}
                    title={item.title}
                    author={item.authors[0]}
                    picSrc={bookCover}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
