import * as React from 'react';
import { Component } from 'react';
import './App.scss';
import '../nullstyle.css';
import Layout from './layout/layout';
interface IAppProps {
  title: string;
}
class App extends Component {
  render() {
    return <Layout></Layout>;
  }
}

export default App;
