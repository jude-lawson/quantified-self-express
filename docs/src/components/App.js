import React, { Component } from 'react';
import '../App.css';

import Header from './Header';
import SectionsDrawer from './SectionsDrawer';
import Main from './Main';

import Introduction from '../pages/Introduction';

class App extends Component {
  constructor() {
    super();

    this.state = {
      content: Introduction
    }
  }
  render() {
    return (
      <div className="App">
        <Header />
        <SectionsDrawer />
        <Main />
      </div>
    );
  }
}

export default App;
