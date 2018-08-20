import React, { Component } from 'react';
import '../App.css';

import Header from './Header';
import SectionsDrawer from './SectionsDrawer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SectionsDrawer />
      </div>
    );
  }
}

export default App;
