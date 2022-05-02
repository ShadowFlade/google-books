import { createSlice } from '@reduxjs/toolkit';
import { Book, BookInfo } from '../components/search-result/search-result';

const books = [] as BookInfo[];
const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books,
  },
  reducers: {
    addBook: (state, action) => {
      state.books.push(...action.payload);
    },
    deleteBook: (state, action) => {
      state.books.filter((item) => item.id !== action.payload.id);
    },
    // sortByRelevance: (state, sortByRelevance) => {
    //   sortByRelevance(state);
    // },
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
  const intermediate = arr.slice(0);
  return intermediate.sort((a: BookInfo, b: BookInfo) => sort(a) - sort(b));
}

function sortByDate(arr: BookInfo[]) {
  const intermediate = arr.slice(0);
  return intermediate.sort(
    (a: BookInfo, b: BookInfo) =>
      new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
  );
}

export const { addBook, deleteBook } = booksSlice.actions;
export { sortByRelevance, sortByDate };
export default booksSlice.reducer;
