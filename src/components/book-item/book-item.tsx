import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import './book-item.scss';
type BookItemProps = {
  picSrc: string;
  category: string[] | '';
  title: string;
  authors: string[] | '';
};
const BookItem = ({ picSrc, category, title, authors }: BookItemProps) => {
  const URI = title.replace(/\s/g, '');
  return (
    <Link to={`/detailed/${URI}`} state={URI} className="book-item">
      <div className="book-item__inner">
        <div className="book-item__pic">
          <img src={picSrc || ''} alt="book cover" />
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
