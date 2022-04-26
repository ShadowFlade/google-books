import * as React from 'react';
import { Component, useState } from 'react';
import Header from './components/header/header';
import SearchResult from './components/search-result/search-result';
import './App.scss';
import '../nullstyle.css';
interface IAppProps {
  title: string;
}
const App = () => {
  let numberOfResults = 1;
  const [pickerBook, setPickedBook] = useState('book');
  return (
    <div className="page">
      <Header></Header>
      <SearchResult numberOfResults={numberOfResults}></SearchResult>
    </div>
  );
};

export default App;
