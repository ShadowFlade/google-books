import * as React from 'react';
import { Link } from 'react-router-dom';
import { BookItemProps } from './bookItem';
import './book-item.scss';

const BookItem = ({ picSrc, category, title, authors }: BookItemProps) => {
  return (
    <Link to={`/detailed/${title}`} className="book-item">
      <div className="book-item__inner">
        <div className="book-item__pic">
          {picSrc ? (
            <img src={picSrc || ''} alt="book cover" loading="lazy" decoding="async" />
          ) : (
            'This book does not have book cover yet'
          )}
        </div>
        <div className="book-item__info">
          <span className="book-item__category">{category[0]}</span>
          <h3 className="book-item__title">{title}</h3>
          <span className="book-item__author">
            {Array.isArray(authors) ? authors.join(', ') : ''}
          </span>
        </div>
      </div>
    </Link>
  );
};
export default BookItem;
