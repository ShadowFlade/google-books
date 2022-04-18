import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BookItem from '../book-item/book-item';
import bookCover from '../book-item/book-cover.jpg';
import './search-result.scss';
const SearchResult = ({ numberOfResults }: { numberOfResults: number }) => {
  return (
    <div className="search-result">
      <div className="search-result__inner">
        <h2 className="search-result__title">
          Found {numberOfResults} {numberOfResults > 1 ? 'results' : 'result'}
        </h2>
        <div className="search-result__content">
          <div className="search-result__item">
            <BookItem
              category="Computers"
              bookTitle="Node.js разработка серверных веб-прилоржений на JavsScript"
              author="Дэвид Хэррон"
              picSrc={bookCover}
            />
          </div>
          <div className="search-result__item">
            <BookItem
              category="Computers"
              bookTitle="Node.js разработка серверных веб-прилоржений на JavsScript"
              author="Дэвид Хэррон"
              picSrc={bookCover}
            />
          </div>
          <div className="search-result__item">
            <BookItem
              category="Computers"
              bookTitle="Node.js разработка серверных веб-прилоржений на JavsScript"
              author="Дэвид Хэррон"
              picSrc={bookCover}
            />
          </div>
          <div className="search-result__item">
            <BookItem
              category="Computers"
              bookTitle="Node.js разработка серверных веб-прилоржений на JavsScript"
              author="Дэвид Хэррон"
              picSrc={bookCover}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
