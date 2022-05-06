import * as React from 'react';
import { useState, useEffect } from 'react';
import { BookInfo } from '../search-result/search-result';
import { BookInfoLite } from '../search-result/search-results';
import { IDetailedPageProps, setCustomAction } from './detailed';
import './detailed-page.scss';

export default function DetailedPage(props: Partial<IDetailedPageProps>) {
  const [book, setBook]: [
    BookInfo | BookInfoLite | undefined,
    setCustomAction<BookInfo | BookInfoLite>
  ] = useState();

  useEffect(() => {
    (async () => {
      await findTheBook();
    })();
  }, []);

  async function findTheBook() {
    if (props.pickedBook) {
      setBook(props.pickedBook);
    } else {
      const theBook: BookInfoLite = {
        categories: localStorage.getItem('selectedBookCategories')?.split(', ') || [],
        authors: localStorage.getItem('selectedBookAuthors')?.split(', ') || [],
        title: localStorage.getItem('selectedBookTitle') || '',
        imageLinks: {
          thumbnail: localStorage.getItem('selectedBookThumbnail') || '',
          smallThumbnail: localStorage.getItem('selectedBookSmallThumbnail') || '',
        },
        description: localStorage.getItem('selectedBookDescription') || '',
      };

      setBook(theBook);
    }
  }

  return (
    <div className="detailed-page">
      <div className="detailed-page__inner">
        <div className="detailed-page__thumbNail">
          <img
            src={`${
              book?.imageLinks ? book.imageLinks.thumbnail || book.imageLinks.smallThumbnail : ''
            }`}
            alt=""
          />
        </div>
        <div className="detailed-page__info">
          {' '}
          <span className="detailed-page__categories">
            {book?.categories ? book.categories.join(', ') : ''}
          </span>
          <h3 className="detailed-page__title">{book?.title ? book.title : ''}</h3>
          <span className="detailed-page__authors">
            {book?.authors ? book.authors.join(', ') : ''}
          </span>
          <div className="detailed-page__description">
            <p>{book?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
