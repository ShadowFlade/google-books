import { FindBooksProps } from '../../app';

export type Book = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: BookInfo;
};
export type BookInfo = {
  categories: string[];
  title: string;
  authors: string[];
  imageLinks: { smallThumbnail: string; thumbNail: string };
  description: string;
  publishedDate: string;
  id: string;
};
export type SearchResultProps = {
  queryIndex: number;
  loadMore: (props: FindBooksProps) => Promise<BookInfo[]>;
  setPickedBook: React.Dispatch<React.SetStateAction<BookInfo | undefined>>;
};
