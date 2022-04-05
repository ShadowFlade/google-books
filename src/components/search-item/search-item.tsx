import * as React from 'react';
import * as ReactDOM from 'react-dom';
const SearchItem = ({
  picSrc,
  category,
  bookTitle,
  author,
}: {
  picSrc: string;
  category: string;
  bookTitle: string;
  author: string;
}) => {
  return (
    <div className="search-item">
      <div className="search-item__pic">
        <img src={picSrc} alt="book cover" />
      </div>
      <div className="search-item__caetgory">{category}</div>
      <div className="search-category__book-title">{bookTitle}</div>
      <div className="search-item__author">{author}</div>
    </div>
  );
};
export default SearchItem;
