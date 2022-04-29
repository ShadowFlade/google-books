import * as React from 'react';
import './detailed-page.scss';
export interface IDetailedPageProps {
  imageLinks: { thumbNail: string; smallThumbnail: string };
  title: string;
  categories: string[];
  authors: string[];
  description: string;
}

export default function DetailedPage(props: Partial<IDetailedPageProps>) {
  console.log(props, 'PROPS');
  return (
    <div className="detailed-page">
      <div className="detailed-page__inner">
        <div className="detailed-page__thumbNail">
          <img
            src={`${
              props.imageLinks ? props.imageLinks.thumbNail || props.imageLinks.smallThumbnail : ''
            }`}
            alt=""
          />
        </div>
        <div className="detailed-page__info">
          {' '}
          <div className="detailed-page__categories">
            {props.categories ? props.categories.join(', ') : ''}
          </div>
          <div className="detailed-page__title">{props.title ? props.title : ''}</div>
          <div className="detailed-page__authors">
            {props.authors ? props.authors.join(', ') : ''}
          </div>
          <div className="detailed-page__description">
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
