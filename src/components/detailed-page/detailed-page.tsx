import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Book, BookInfo } from '../search-result/search-result';
import './detailed-page.scss';
export interface IDetailedPageProps {
  imageLinks: { thumbNail: string; smallThumbnail: string };
  title: string;
  categories: string[];
  authors: string[];
  description: string;
  results: Book[];
}

export default function DetailedPage(props: Partial<IDetailedPageProps>) {
  const params = useParams();
  console.log('🚀 ~ file: detailed-page.tsx ~ line 16 ~ DetailedPage ~ params', params);
  console.log(props.results);
  const theBook = props.results
    ? props.results
        .map((item) => item.volumeInfo)
        .find((item) => item.title.replace(/\s/g, '') === params.id!.replace(/\s/g, ''))
    : undefined;
  return (
    <div className="detailed-page">
      <div className="detailed-page__inner">
        <div className="detailed-page__thumbNail">
          <img
            src={`${
              theBook?.imageLinks
                ? theBook.imageLinks.thumbNail || theBook.imageLinks.smallThumbnail
                : ''
            }`}
            alt=""
          />
        </div>
        <div className="detailed-page__info">
          {' '}
          <div className="detailed-page__categories">
            {theBook?.categories ? theBook.categories.join(', ') : ''}
          </div>
          <div className="detailed-page__title">{theBook?.title ? theBook.title : ''}</div>
          <div className="detailed-page__authors">
            {theBook?.authors ? theBook.authors.join(', ') : ''}
          </div>
          <div className="detailed-page__description">
            <p>{theBook?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
