import { setCustomAction } from '../detailed-page/detailed';

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
  imageLinks: { smallThumbnail: string; thumbnail: string };
  description: string;
  publishedDate: string;
  id: string;
};
export type BookInfoLite = {
  categories: string[];
  title: string;
  authors: string[];
  imageLinks: { smallThumbnail: string; thumbnail: string };
  description: string;
};
export type SearchResultProps = {
  queryIndex: number;
  loadMore: () => void;
  setPickedBook: setCustomAction<BookInfo>;
};
