import * as React from 'react';
import { Component, useState } from 'react';
import Header from './components/header/header';
import SearchResult from './components/search-result/search-result';
import Loading from './components/Loading/Loading';
import './App.scss';
import '../nullstyle.css';

const App = () => {
  const [results, setResults] = useState();
  const [pickerBook, setPickedBook] = useState('book');
  return (
    <div className="page">
      <Header></Header>
      {results ? <SearchResult results={results}></SearchResult> : <Loading></Loading>}
    </div>
  );
};

export default App;
