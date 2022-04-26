import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './book-item.scss';
type BookItem = {
  picSrc: string;
  category: string;
  title: string;
  author: string;
};
const BookItem = ({ picSrc, category, title, author }: BookItem) => {
  return (
    <div className="book-item">
      <div className="book-item__inner">
        <div className="book-item__pic">
          <img src={picSrc || ''} alt="book cover" />
        </div>
        <div className="book-item__category">{category || ''}</div>
        <div className="book-item__title">{title || ''}</div>
        <div className="book-item__author">{author || ''}</div>
      </div>
    </div>
  );
};
export default BookItem;
