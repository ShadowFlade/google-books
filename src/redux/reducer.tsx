import { createSlice } from '@reduxjs/toolkit';
import { Book, BookInfo } from '../components/search-result/search-result';

const books = [] as BookInfo[];
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books,
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addBooks: (state, action) => {
      state.books.push(...action.payload);
    },
    deleteBook: (state, action) => {
      state.books.filter((item) => item.id !== action.payload.id);
    },
    sortBooksByRelevance: (state, action) => {
      sortByRelevance(state.books, action.payload);
    },
    sortBooksByDate: (state, action?) => {
      sortByDate(state.books);
    },
  },
});

const relevanceTree: (keyof Partial<BookInfo>)[] = [
  'title',
  'categories',
  'authors',
  'description',
];

function sortByRelevance(arr: BookInfo[], query: string) {
  const sort = (bookInfo: BookInfo): number => {
    let result: number;
    relevanceTree.forEach((relevantItem) => {
      const key = bookInfo[relevantItem];
      if ((Array.isArray(key) || typeof key === 'string') && key.includes(query)) {
        result = relevanceTree.length - relevanceTree.indexOf(relevantItem);
      }
    });
    return result!;
  };
  arr.sort((a: BookInfo, b: BookInfo) => sort(a) - sort(b));
}

function sortByDate(arr: BookInfo[]) {
  arr.sort(
    (a: BookInfo, b: BookInfo) =>
      new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
  );
}

export const { addBooks, deleteBook, sortBooksByRelevance, sortBooksByDate, setBooks } =
  booksSlice.actions;
export default booksSlice.reducer;
