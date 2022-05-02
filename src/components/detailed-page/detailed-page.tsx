import * as React from 'react';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FindBooksProps } from '../../App';
import { Book, BookInfo } from '../search-result/search-result';
import './detailed-page.scss';
export interface IDetailedPageProps {
  imageLinks: { thumbNail: string; smallThumbnail: string };
  title: string;
  categories: string[];
  authors: string[];
  description: string;
  results: BookInfo[];
  findBooks: (props?: FindBooksProps | undefined) => Promise<BookInfo[]>;
  setResults: React.Dispatch<React.SetStateAction<Book[] | undefined>>;
}

export default function DetailedPage(props: Partial<IDetailedPageProps>) {
  const params = useParams();
  let bookTitle: string | undefined | null | RegExpMatchArray =
    useLocation().pathname.match(/detailed\/(.+)/);
  bookTitle = bookTitle ? bookTitle[1] : '';

  const [book, setBook]: [
    BookInfo | undefined,
    React.Dispatch<React.SetStateAction<BookInfo | undefined>>
  ] = useState();

  React.useEffect(() => {
    (async () => {
      await findTheBook();
    })();
  }, []);

  async function findTheBook() {
    let returnBooks: BookInfo[] | undefined | void;
    const find = (books: BookInfo[]) => {
      return books.find((item) => {
        const itemTitleFormatted = item.title.replace(/\s/g, '');
        return (
          (typeof bookTitle === 'string' && itemTitleFormatted === bookTitle.replace(/\s/g, '')) ||
          itemTitleFormatted === bookTitle
        );
      });
    };
    if (props && props.results && props.results.length === 0 && props.findBooks) {
      returnBooks = await props?.findBooks().then((res) => {
        const theBook = find(res);
        setBook(theBook);
      });
    } else if (props.results) {
      setBook(find(props.results));
    }
  }

  return (
    <div className="detailed-page">
      <div className="detailed-page__inner">
        <div className="detailed-page__thumbNail">
          <img
            src={`${
              book?.imageLinks ? book.imageLinks.thumbNail || book.imageLinks.smallThumbnail : ''
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
